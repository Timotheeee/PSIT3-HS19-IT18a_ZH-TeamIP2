var jwt = require('jsonwebtoken');
var fs = require('fs');

export class LoginController {
  private readonly username:string = "";
  private readonly password:string = "";
  private readonly privateKey = "";


  constructor() {
    var content = fs.readFileSync('.env',"utf8").split("\n");
    this.username = content[1];
    this.password = content[2];
    this.privateKey = content[0];
  }

  public auth(req: any, res:any) {
    let token = this.checkLoginData(req);

   // login succesful if the method checkLoginData sends a token back, else the method
   // checkLoginData returns an empty string
    if(token) {

      res.status(200).json({ success: true, "token": token });
    } else {
      res.status(400).json({success: false, "token": ''});
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
