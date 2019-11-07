import {DBController} from "../controllers/DBController"




describe("Dao", function() {
  var dao:any;

  beforeEach(function() {
    dao = new DBController();
  });

  it('should be able to read data from the DB', async function() {
    const result = await dao.getGraphAsync();
    expect(result.length>0).toBeTruthy();
  });

});
