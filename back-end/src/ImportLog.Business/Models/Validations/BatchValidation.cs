﻿using FluentValidation;

namespace ImportLog.Business.Models.Validations
{
    public class BatchValidation : AbstractValidator<Batch>
    {
        public BatchValidation()
        {
            RuleFor(c => c.FileName)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");
        }
    }
}