const EventEmitter = require('node:events');
const Logger = require('./logger');

const emitter = new EventEmitter();

// Registering listener
emitter.on('personTalked', (values) => {
  console.log(values);
  console.log(this);
});

// Registerin listener (ES6)
emitter.on('personTalked', function (eventArgs) {
  console.log(eventArgs);
  console.log(this);
});

// Raising event
emitter.emit('personTalked', 'Hello John');
emitter.emit('personTalked', {
  sentences: ['Hello John', 'How are you?'],
});

const logger = new Logger();

logger.on('messageLogged', (eventArgs) => {
  console.log('log method called: ', eventArgs);
});

logger.log('Hello World!');


// learn other methods