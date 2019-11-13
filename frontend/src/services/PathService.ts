import axios from 'axios';
import { AxiosController } from './AxiosController';


export class PathService {
  private readonly url: string = '/userPath'
  private readonly axiosController: AxiosController;

  constructor() {
    this.axiosController = new AxiosController();
  }

  public async post(path: Number[]) : Promise<string> {
    const result = await this.axiosController.post(this.url, {userPath: path})
    return result.data.message;
  }


}
