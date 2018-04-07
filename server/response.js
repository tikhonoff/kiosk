export default class Response {
  constructor(arg, message = '') {
    this.bOk = false;
    this.data = null;
    this.message = '';

    this.setMessage(message);

    if (arg instanceof Error) {
      this.setError(arg);
    } else {
      this.setData(arg);
    }
  }

  setError(err) {
    this.bOk = false;
    this.message = err.message;
    return this;
  }

  setData(data) {
    this.bOk = true;
    this.data = data;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  toObject() {
    return {
      bOk: this.bOk,
      data: this.data,
      message: this.message,
    };
  }
}
