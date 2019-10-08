import {Dao} from "./Dao"




describe("Dao", function() {
  var dao:any; 

  beforeEach(function() {
    dao = new Dao();
  });

  it('should be able to read data from the DB', async function() {
    const result = await dao.getGraphAsync();
    expect(result.length>0).toBeTruthy();
  });
  
});
