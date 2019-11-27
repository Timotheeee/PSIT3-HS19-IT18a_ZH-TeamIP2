import {LoginController} from "../controllers/LoginController"
var fs = require('fs');



describe("LoginControllerSpec", function() {
  var cont:any;
  var validtok = "";

  beforeEach(function() {
    cont = new LoginController();
  });

  it('checkLoginData without token', function() {
    console.log("checkLoginData without token");
    var content: string[] = fs.readFileSync('.env',"utf8").split("\n");

    let username = content[1];
    let password = content[2];
    validtok = cont.checkLoginData({tok:"",name:username,password:password});


    expect(validtok != "").toBeTruthy();
  });

  it('checkLoginData with token', function() {
    console.log("checkLoginData with token");
    //the order of the tests is randomized so this is needed in case the other test didn't run
    if(!validtok){
      var content: string[] = fs.readFileSync('.env',"utf8").split("\n");

      let username = content[1];
      let password = content[2];
      validtok = cont.checkLoginData({tok:"",name:username,password:password});

    }

    //the test checks if this line works
    let tok = cont.checkLoginData({tok:validtok,name:"",password:""});


    expect(tok != "").toBeTruthy();
  });

});
