import axios from 'axios';


export class PathService {
  private readonly url: string = '/userPath'

  constructor() {

  }

  postPath(path: [Number]) : Promise<any> {
    return new Promise((resolve, reject) => {
      let promise = axios({
        method: "post",
        url: this. url,
        data: {
            userPath: path
        }
      })

      promise.then(result => {
        resolve(result.data.result);
      })

      promise.catch(error => {
        reject(error);
      })


    })
  }


}
