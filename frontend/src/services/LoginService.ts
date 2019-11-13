import axios from 'axios';
import {AxiosController} from './AxiosController'

export class LoginService {
  private readonly url: string = '/login';
  private readonly axiosController: AxiosController;

  constructor() {
    this.axiosController = new AxiosController();
  }

  public async post(userData: any): Promise<String> {
     const result = await this.axiosController.post(this.url, userData);
     const token: string = result.data.token;
     return token;
  }

  public async checkLoggedIn(): Promise<boolean> {
    // if the token is still valid, the response will send code 200 back and thus we can return true
    const response = this.axiosController.post(this.url, {});
    return true;
  }

  public isTokenSet(): boolean {
    return axios.defaults.headers.common['token'] ? true : false;
  }

  public logout() {
    axios.defaults.headers.common['token'] = '';
  }

  public verifyLoginData(name: string, password: string): Promise<boolean> {
    return new Promise((resolve,reject) => {
      this.axiosController.post(this.url, {name: name, password: password})
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

}
