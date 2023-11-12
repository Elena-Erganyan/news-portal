class DB404Error extends Error {
  constructor (name, description = "Не найдено") {
    super(name, description);
    this.code = 404
  }
}

class BadReqError extends Error {
  constructor (name, description = "Данные не корректны") {
    super(name, description);
    this.code = 400
  }
}

class UnauthorizedError extends Error {
  constructor (name, description = "Доступ запрещён") {
    super(name, description);
    this.code = 401
  }
}

module.exports = {
  DB404Error,
  BadReqError,
  UnauthorizedError
}
