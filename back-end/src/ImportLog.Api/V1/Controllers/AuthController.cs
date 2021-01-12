using ImportLog.Api.Controllers;
using ImportLog.Api.Extensions;
using ImportLog.Api.ViewModels;
using ImportLog.Business.Intefaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ImportLog.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}")]
    public class AuthController : MainController
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AppSettings _appSettings;
        private readonly ILogger _logger;

        public AuthController(INotifier notifier, 
                              SignInManager<IdentityUser> signInManager, 
                              UserManager<IdentityUser> userManager, 
                              IOptions<AppSettings> appSettings,
                              IUser user, ILogger<AuthController> logger) : base(notifier, user)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        [HttpPost("new-account")]
        public async Task<ActionResult> Registrar(RegisterUserViewModel registerUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            IdentityUser user = new IdentityUser
            {
                UserName = registerUser.Email,
                Email = registerUser.Email,
                EmailConfirmed = true
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerUser.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return CustomResponse(await GenerateJwt(user.Email));
            }
            foreach (IdentityError error in result.Errors)
            {
                NotifyError(error.Description);
            }

            return CustomResponse(registerUser);
        }
    
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginUserViewModel loginUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, false, true);

            if (result.Succeeded)
            {
                _logger.LogInformation("Usuario "+ loginUser.Email +" logado com sucesso");
                return CustomResponse(await GenerateJwt(loginUser.Email));
            }
            if (result.IsLockedOut)
            {
                NotifyError("Usuário temporariamente bloqueado por tentativas inválidas");
                return CustomResponse(loginUser);
            }

            NotifyError("Usuário ou Senha incorretos");
            return CustomResponse(loginUser);
        }

        private async Task<LoginResponseViewModel> GenerateJwt(string email)
        {
            IdentityUser user = await _userManager.FindByEmailAsync(email);
            IList<Claim> claims = await _userManager.GetClaimsAsync(user);
            IList<string> userRoles = await _userManager.GetRolesAsync(user);

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));
            foreach (string userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            ClaimsIdentity identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            SecurityToken token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.Audience,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiresIn),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            string encodedToken = tokenHandler.WriteToken(token);

            LoginResponseViewModel response = new LoginResponseViewModel
            {
                AccessToken = encodedToken,
                ExpiresIn = TimeSpan.FromHours(_appSettings.ExpiresIn).TotalSeconds,
                UserToken = new UserTokenViewModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    Claims = claims.Select(c=> new ClaimViewModel{ Type = c.Type, Value = c.Value})
                }
            };

            return response;
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}