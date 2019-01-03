"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class FetchSubscriber extends rxjs_1.Subscriber {
    constructor(observer) {
        super(observer);
        this.observer = observer;
        this.fetch = this.fetch.bind(this);
        this._responseValidator = this._responseValidator.bind(this);
        this.controller = new AbortController();
    }
    fetch(url, options) {
        fetch(url, Object.assign({}, options, { signal: this.controller.signal }))
            .then((response) => this._responseValidator(response))
            .then((jsonResponse) => this.observer.next(jsonResponse))
            .catch((err) => this.observer.error(err));
    }
    unsubscribe() {
        super.unsubscribe();
        this.controller.abort();
    }
    _responseValidator(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response.ok) {
                return yield response.json();
            }
            throw new Error(response.text());
        });
    }
}
exports.default = (url, options) => {
    return new rxjs_1.Observable((observer) => {
        return new FetchSubscriber(observer).fetch(url, options);
    });
};
