import axios from 'axios';

export class AxiosController {

  get(url: string, custResponseType: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        responseType : 'text' // TODO: ryan/lars figure this out
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  post(url: string, dataToPost: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: dataToPost
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  public isHeaderSet(header: string): boolean {
    return axios.defaults.headers.common[header] ? true : false;
  }

  public setHeader(header: string, value:string) {
    axios.defaults.headers.common[header] = value;
  }
}
