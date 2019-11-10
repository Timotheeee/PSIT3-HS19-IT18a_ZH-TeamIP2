var jwt = require('jsonwebtoken');
var fs = require('fs');

export class LoginController {
  private readonly username:string = "psit";
  private readonly password:string = "psit";
  private readonly privateKey = fs.readFileSync('secret.key');


  constructor() {

  }

  public login(req:any): string{

    if(req.header.token) {
      // check token
      let correctToken = this.verify(req.body.token);
      if(correctToken) {
        return req.body.token;
      }

      return '';
    } else {
      // sign and send token back
      if(req.body.password===this.password&&req.body.name===this.username) {
        let token = this.sign(req.body.username, req.body.password);
        return token;
      }
      return '';
    }


  }

  private sign(username: string, password: string): string {
    return jwt.sign({
      data: {
        username: username,
        password: password
      }
    }, this.privateKey, { expiresIn: '1h' });
  }

  private verify(signedToken: string): boolean {
    try {
      jwt.verify(signedToken, this.privateKey);
      return true;
    } catch(err) {
      return false;
    }
  }

}
