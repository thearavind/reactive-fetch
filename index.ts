import { Observable, Observer, Subscriber } from "rxjs";

class FetchSubscriber<T> extends Subscriber<T> {
  private observer: Observer<T>;
  private controller: AbortController;
  constructor(observer: Observer<T>) {
    super(observer);
    this.observer = observer;
    this.fetch = this.fetch.bind(this);
    this._responseValidator = this._responseValidator.bind(this);
    this.controller = new AbortController();

  }

  public fetch(url: string, options: RequestInit): void {
    fetch(url, { ...options, signal: this.controller.signal })
      .then((response: Response) => this._responseValidator(response))
      .then((jsonResponse: T) => this.observer.next(jsonResponse))
      .catch((err: T | Error) => this.observer.error(err));
  }

  public unsubscribe(): void {
    super.unsubscribe();
    this.controller.abort();
  }

  private async _responseValidator(response: any): Promise<T> {
    if (response.ok) {
      return await response.json();
    }

    throw new Error(response.text());
  }
}

export default <T>(url: string, options: any): Observable<T> => {
  return new Observable((observer: Observer<T>) => {
    return new FetchSubscriber(observer).fetch(url, options);
  });
};
