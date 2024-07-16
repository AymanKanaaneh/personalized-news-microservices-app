class ValidationException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationException';
      Error.captureStackTrace(this, this.constructor);
    }
}
  
class NetworkException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkException';
        Error.captureStackTrace(this, this.constructor);
    }
}
  
class TimeoutException extends Error {
    constructor(message) {
        super(message);
        this.name = 'TimeoutException';
        Error.captureStackTrace(this, this.constructor);
    }
}
  
class DatabaseException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseException';
        Error.captureStackTrace(this, this.constructor);
    }
}

class QueueException extends Error {
    constructor(message) {
      super(message);
      this.name = 'QueueException';
      Error.captureStackTrace(this, this.constructor);
    }
  }

module.exports = { ValidationException, NetworkException, TimeoutException, DatabaseException, QueueException };