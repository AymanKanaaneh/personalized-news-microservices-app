class ValidationException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationException';
    }
}
  
class NetworkException extends Error {
    constructor(message) {
      super(message);
      this.name = 'NetworkException';
    }
}
  
class TimeoutException extends Error {
    constructor(message) {
      super(message);
      this.name = 'TimeoutException';
    }
}
  
class ContentGenerationException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ContentGenerationException';
    }
}
  
class NewsSendingException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NewsSendingException';
    }
}

module.exports = { ValidationException, NetworkException, TimeoutException, ContentGenerationException, NewsSendingException};