const EventEmitter = require('node:events');

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    this.emit('messageLogged', { userId: 42 });
  }
}

module.exports = Logger;
