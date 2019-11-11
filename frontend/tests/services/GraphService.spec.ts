import {GraphService} from './../../src/services/GraphService';
import mockAxios from "axios";


get: jest.fn(() => Promise.resolve({ data: {} }));

describe("graphService", () => {

  test ("getGraphIterator should return an object of graphIterator", () => {

    // setup
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: ["cat.jpg"] }
    })
  );
  })

})
