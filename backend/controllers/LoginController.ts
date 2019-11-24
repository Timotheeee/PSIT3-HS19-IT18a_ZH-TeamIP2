import { Request, Response } from "express";

var jwt = require('jsonwebtoken');
var fs = require('fs');

export class LoginController {
  private username: string;
  private password: string;
  private privateKey: string;


  constructor() {
    var content: string[] = fs.readFileSync('.env',"utf8").split("\n");

    console.log(content);

    this.privateKey = content[0];
    this.username = content[1];
    this.password = content[2];

  }

  public auth(request: Request, response: Response) {
    let token = this.checkLoginData(request);

   // login succesful if the method checkLoginData sends a token back, else the method
   // checkLoginData returns an empty string
    if(token) {

      response.status(200).json({ success: true, "token": token });
    } else {
      response.status(200).json({success: false, "token": ''});
    }
  }

  private checkLoginData(request: Request): string{
    console.log("checklogindata: " + request.body.tok)
    if(!request.body.tok) {

      // sign and send token back if correct login data
      let token = '';


      if(request.body.password===this.password && request.body.name===this.username) {
        token = this.sign(request.body.name);
      }

      return token;
    } else {
      // token is already set so just verify if token is still valid
      let correctToken = this.verify(request.body.tok);
      if(correctToken) {
        return request.body.tok;
      }
      if(request.body.password===this.password&&request.body.name===this.username) {
        return this.sign(request.body.name);
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
      console.log("verifying: " + signedToken);
      jwt.verify(signedToken, this.privateKey);
    } catch(err) {
      return false;
    }
    return true;
  }

}
