import fetch from "../index";

const responseHelper = ({isSuccess, shouldResolve, data}: {isSuccess: boolean, shouldResolve: boolean, data: any}) => {
  const globalAny: any = global;
  globalAny.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({
          ok: isSuccess,
          json() {
            return data;
          },
          text() {
            return JSON.stringify(data);
          },
        });
      } else {
        reject(new Error(JSON.stringify(data)));
      }
    });
  });
};

describe("Fetch success scenario", () => {
  const data = {_id: "ndjsdkkklk777889", name: "newName"};
  beforeAll(() => responseHelper({isSuccess: true, shouldResolve: true, data}));
  it("fetch resoloves promise", (done) => {
    const observervable = fetch("https://localhost", {});
    observervable.subscribe(
      (next: any) => {
        expect(next).toEqual(data);
        done();
      },
    );
  });
});

describe("Fetch failure response scenario", () => {
  const data = {message: "Access denied", status: 401};
  beforeAll(() => responseHelper({isSuccess: false, shouldResolve: true, data}));
  it("fetch resoloves promise with a 401 response", (done) => {
    const observervable = fetch("https://localhost", {});
    observervable.subscribe(
      (next: any) => next,
      (error: any) => {
        expect(JSON.parse(error.message)).toEqual(data);
        done();
      },
    );
  });
});

describe("Fetch failure scenario", () => {
  const data = {message: "ENONET FAILURE"};
  beforeAll(() => responseHelper({isSuccess: false, shouldResolve: false, data}));
  it("fetch rejects promise", (done) => {
    const observervable = fetch("https://localhost", {});
    observervable.subscribe(
      (next: any) => next,
      (error: any) => {
        expect(JSON.parse(error.message)).toEqual(data);
        done();
      },
    );
  });
});
