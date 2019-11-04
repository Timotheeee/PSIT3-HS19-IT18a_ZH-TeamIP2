import axios from 'axios';

export class GraphService {
  readonly url: string = '/api';
  constructor() {

  }

  postGraphToServer(graph: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: this.url,
        data: {
          graph: graph
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    })

  }
}
