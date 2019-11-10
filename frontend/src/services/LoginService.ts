import axios from 'axios';


export class LoginService {
  private readonly url: string = '/login';

  constructor() {

  }

  public checkLoggedIn(): Promise<boolean> {
    // check if token is still valid
    return new Promise((resolve,reject) => {
      this.post({})
    .then(result => {
      // token still verified
      resolve(true);
    })
    .catch(error => {
      reject(error)
    })
    });
  }

  public isTokenSet(): boolean {
    return axios.defaults.headers.common['token'] ? true : false;
  }

  public logout() {
    axios.defaults.headers.common['token'] = '';
  }

  public verifyLoginData(name: string, password: string): Promise<boolean> {
    return new Promise((resolve,reject) => {
      this.post({name: name, password: password})
      .then(result => {
        let correctLogin = false;

        // login was succesful, set token in header
        if(result.data.token) {
          correctLogin = true;
          axios.defaults.headers.common['token'] = result.data.token;
        }
        resolve(correctLogin);
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  post(data: any): Promise<any> {
    return axios({
      method: "post", url: this.url,
      data: data
    })
  }

}
