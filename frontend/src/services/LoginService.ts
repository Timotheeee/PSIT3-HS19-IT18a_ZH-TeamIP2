import axios from 'axios';
import {AxiosController} from './AxiosController'

export class LoginService {
  private readonly url: string = '/login';
  private readonly axiosController: AxiosController;

  constructor() {
    this.axiosController = new AxiosController();
  }

  private async post(userData: any): Promise<String> {
     const result = await this.axiosController.post(this.url, userData);
     const token: string = result.data.token;
     return token;
  }

  public async checkLoggedIn(): Promise<boolean> {
    const token = await this.post({});

    // if the token is still valid, then the token is set, else the token is the empty string
    return token != '';
  }

  public isTokenSet(): boolean {
    return axios.defaults.headers.common['token'] ? true : false;
  }

  public logout() {
    axios.defaults.headers.common['token'] = '';
  }

  public async verifyLoginData(name: string, password: string): Promise<boolean> {
    const result = await this.axiosController.post(this.url, {name: name, password: password});

    let correctLogin: boolean = false;
    if(result.data.token) {
      correctLogin = true;
      axios.defaults.headers.common['token'] = result.data.token;
    }
    return correctLogin;
  }

}
