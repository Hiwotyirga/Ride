// src/utils/exceptions.js

class HttpException extends Error {
  constructor(status, message) {
    super(message);
    this.status = status || 500;
  }
}

class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

module.exports = {
  HttpException,
  NotFoundException,
  BadRequestException,
};
