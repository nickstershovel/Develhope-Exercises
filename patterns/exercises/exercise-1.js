class Logger {
    output(value) {
      console.log(value);
    }
  }
  
  const instance = new Logger();
  
  module.exports = instance;
  