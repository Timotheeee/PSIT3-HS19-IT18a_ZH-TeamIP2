import axios from 'axios';


export class LoginService {
  private readonly url: string = '/login';

  constructor() {

  }

  verifyLoginData(name: string,password: string): Promise<boolean> {
    return new Promise((resolve,reject) => {
      let promise  = axios({
        method: "post", url: this.url,
        data: {
          name:name,
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
