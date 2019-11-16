var jwt = require('jsonwebtoken');
var fs = require('fs');

export class LoginController {
  private readonly username:string = fs.readFileSync('.env',"utf8").split("\n")[1];
  private readonly password:string = fs.readFileSync('.env',"utf8").split("\n")[2];
  private readonly privateKey = fs.readFileSync('.env',"utf8").split("\n")[0];


  constructor() {

  }

  public auth(req: any, res:any) {
    let token = new LoginController().checkLoginData(req);

   // login succesful if the method checkLoginData sends a token back, else the method
   // checkLoginData returns an empty string
    if(token) {
      res.status(200).json({"token": token});
    } else {
      res.status(400).json({"token": ''});
    }
  }

  private checkLoginData(req:any): string{
    if(!req.header('token')) {

      // sign and send token back if correct login data
      let token = '';

      if(req.body.password===this.password&&req.body.name===this.username) {
        token = this.sign(req.body.name);
      }
      return token;
    } else {
      // token is already set so just verify if token is still valid
      let correctToken = this.verify(req.header('token'));
      if(correctToken) {
        return req.header('token');
      }
      return '';
    }
  }

  private sign(username: string): string {
    return jwt.sign({
      data: {
        username: username,
      }
    }, this.privateKey, { expiresIn: '1h' });
  }

  private verify(signedToken: string): boolean {
    try {
      jwt.verify(signedToken, this.privateKey);
    } catch(err) {
      return false;
    }
    return true;
  }

}
