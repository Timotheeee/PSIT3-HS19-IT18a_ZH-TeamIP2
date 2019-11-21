import { AxiosController } from './AxiosController'

export class LoginService {
  private readonly url: string = '/login';
  private readonly axiosController: AxiosController;

  constructor() {
    this.axiosController = new AxiosController();
  }


  public logout() {
    console.log("logout");
    localStorage.token = "";
  }

  public async verifyLoginData(name: string, password: string): Promise<boolean> {
    const result = await this.axiosController.post(this.url, { name: name, password: password });

    let correctLogin: boolean = false;
    if (result.token && result.token != "") {
      correctLogin = true;
      localStorage.token = result.token;

    }
    return correctLogin;
  }

  public async checkIfTokenStillValid(): Promise<boolean> {
    console.log("checkIfTokenStillValid ");

    let tok = localStorage.token;
    const result = await this.axiosController.post(this.url, { tok: tok });
    console.log(result);

    return result.success;
  }

}
