import fetch from "../index";

const responseHelper = (isSuccess: boolean, shouldResole: boolean, data: any) => {
  const globalAny: any = global;
  globalAny.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      if (shouldResole) {
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
        reject({
          ok: false,
          json() {
            return data;
          },
        });
      }
    });
  });
};

describe("Fetch success scenario", () => {
  const data = {_id: "ndjsdkkklk777889"};
  beforeAll(() => responseHelper(true, true, data));
  it("fetch resoloves promise", () => {
    const a = fetch("https://localhost", {});
    a.subscribe(
      (x: any) => expect(x.toBe(data)),
    );
  });
});

describe("Fetch failure scenario", () => {
  const data = {message: "Access denied", status: 401};
  beforeAll(() => responseHelper(false, true, data));
  it("fetch resoloves promise with a 401 response", () => {
    const a = fetch("https://localhost", {});
    a.subscribe(
      (x: any) => x,
      (y: any) => expect(JSON.parse(y.message).toBe(data)),
    );
  });
});
