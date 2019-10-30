import axios from 'axios';


export class LoginService {
  readonly url: string = '/password';

  constructor() {

  }

  checkPassword(password: string): Promise<boolean> {
    return new Promise((resolve,reject) => {
      let promise  = axios({
        method: "post", url: this.url,
        data: {
          password: password
        }
      })
      promise.then(result => {
        var loggedIn = result.data.response;
        resolve(loggedIn);
      })

      promise.catch(error => {
        reject(error);
      })
    })
  }

}
