export class LocalStorageUtils {
  setLoggedUser(response: any) {
    localStorage.setItem('importlog.isLoggedin', 'true');
    let dateNow: Date = new Date();
    dateNow.setSeconds(dateNow.getSeconds() + response.expiresIn);
    localStorage.setItem('importlog.expiresIn', dateNow.toString());
    localStorage.setItem('importlog.token', response.accessToken);
  }

  logOff() {
    localStorage.removeItem('importlog.isLoggedin');
    localStorage.removeItem('importlog.expiresIn');
    localStorage.removeItem('importlog.token');
  }

  isLogged() {
    if (localStorage.getItem('importlog.isLoggedin')) {
      let dateNow: Date = new Date();
      let expiresIn = localStorage.getItem('importlog.expiresIn');
      return (expiresIn && new Date(expiresIn) >= dateNow);
    } else {
      return false;
    }
  }

  getUserToken() {
    return localStorage.getItem('importlog.token');
  }
}