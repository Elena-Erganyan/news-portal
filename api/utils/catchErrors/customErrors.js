class DB404Error extends Error {
  constructor (name, description = "Not found") {
    super(name, description);
    this.code = 404
  }
}

class BadReqError extends Error {
  constructor (name, description = "Data no valid") {
    super(name, description);
    this.code = 400
  }
}

class UnauthorizedError extends Error {
  constructor (name, description = "Not permitted") {
    super(name, description);
    this.code = 401
  }
}

module.exports = {
  DB404Error,
  BadReqError,
  UnauthorizedError
}
