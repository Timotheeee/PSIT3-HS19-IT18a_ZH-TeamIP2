import axios from 'axios';


export class LoginService {
  private readonly url: string = '/login';

  constructor() {

  }

  public checkLoggedIn(): boolean {
    return axios.defaults.headers.common['token'] ? true : false;
  }

  public logout() {
    axios.defaults.headers.common['token'] = '';
  }

  verifyLoginData(name: string,password: string): Promise<boolean> {
    if(!axios.defaults.headers.common['token']) {
      return new Promise((resolve,reject) => {
        let promise  = axios({
          method: "post", url: this.url,
          data: {
            name:name,
            password: password
          }
        })
        promise.then(result => {
          let correctLogin = false;


          if(result.data.token) {
            correctLogin = true;
            axios.defaults.headers.common['token'] = result.data.token;
          }
          resolve(correctLogin);
        })

        promise.catch(error => {
          reject(error);
        })
      })
    } else {
      return new Promise((resolve,reject) => {
        let promise  = axios({
          method: "post", url: this.url,
          data: {
            name:name,
            password: password,
          }
        },)
        promise.then(result => {
          let correctLogin = false;

          if(result.data.token) {
            correctLogin = true;
          } else {
            axios.defaults.headers.common['token'] = '';
          }

          resolve(correctLogin);
        })

        promise.catch(error => {
          reject(error);
        })
      })

    }


  }

}
