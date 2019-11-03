export class Username {
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  getUsername() : string {
    if (this.username == ''){
      this.username = 'John Doe'
    }else{
      return this.username;
    }
  }

}
