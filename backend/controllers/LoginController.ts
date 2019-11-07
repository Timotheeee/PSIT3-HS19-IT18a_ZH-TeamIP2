export class LoginController {
  private static username:string = "psit";
  private static password:string = "psit";
  public static login(req:any){
    return req.body.password===this.password&&req.body.name===this.username;
  }
}
