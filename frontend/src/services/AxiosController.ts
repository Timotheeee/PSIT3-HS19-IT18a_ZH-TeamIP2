import axios from 'axios';
/**
 * Class for transfering data between front- & backend with the axios-framework.
 */
export class AxiosController {

  /**
   * Makes a get request with the axios-framework
   * @param {string} url - The url for the get request.
   * @param url
   * @returns A promise with the requested data.
   */
  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  /**
   * Makes a post request with the axios-framework.
   * @param {string} url - The url for the post request.
   * @param {string} dataToPost - The data object which will be sent to the server
   * @returns A promise if the post request was successfull.
   */
  post(url: string, dataToPost: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: dataToPost
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  /**
   * Checks if a header is set in all requests.
   * @param header - The to be checked header.
   */
  public isHeaderSet(header: string): boolean {
    return axios.defaults.headers.common[header] ? true : false;
  }

  /**
   * Set a header in all requests.
   * @param header - Key.
   * @param value - Value.
   */
  public setHeader(header: string, value:string) {
    axios.defaults.headers.common[header] = value;
  }
}
