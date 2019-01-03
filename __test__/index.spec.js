"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const responseHelper = ({ isSuccess, shouldResolve, data }) => {
    const globalAny = global;
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
            }
            else {
                reject(new Error(JSON.stringify(data)));
            }
        });
    });
};
describe("Fetch success scenario", () => {
    const data = { _id: "ndjsdkkklk777889", name: "newName" };
    beforeAll(() => responseHelper({ isSuccess: true, shouldResolve: true, data }));
    it("fetch resoloves promise", (done) => {
        const observervable = index_1.default("https://localhost", {});
        observervable.subscribe((next) => {
            expect(next).toEqual(data);
            done();
        });
    });
});
describe("Fetch failure response scenario", () => {
    const data = { message: "Access denied", status: 401 };
    beforeAll(() => responseHelper({ isSuccess: false, shouldResolve: true, data }));
    it("fetch resoloves promise with a 401 response", (done) => {
        const observervable = index_1.default("https://localhost", {});
        observervable.subscribe((next) => next, (error) => {
            expect(JSON.parse(error.message)).toEqual(data);
            done();
        });
    });
});
describe("Fetch failure scenario", () => {
    const data = { message: "ENONET FAILURE" };
    beforeAll(() => responseHelper({ isSuccess: false, shouldResolve: false, data }));
    it("fetch rejects promise", (done) => {
        const observervable = index_1.default("https://localhost", {});
        observervable.subscribe((next) => next, (error) => {
            expect(JSON.parse(error.message)).toEqual(data);
            done();
        });
    });
});
