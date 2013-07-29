var fs = require('fs');

var configPath = __dirname + '/config.json';

var defaultConfig = {
  installed: false
}

// if the config.json file exists, read it. Otherwise make the config.json file
// with defaultConfig as the file's contents
var read = function(){
  if (!fs.existsSync(configPath)){
    module.exports.save(defaultConfig);
    return defaultConfig;
  } else {
    return JSON.parse(fs.readFileSync(configPath));
  }
};

module.exports = {

  // update the config file
  save: function(){
    fs.writeFileSync(configPath, JSON.stringify(this.config, null, '  '));
    module.exports.config = this.config;
  },

  init: function(){
    module.exports.config = read();
    if (!this.config.installed){
      console.log('This is probably the first time running. Please make an admin account by going to http://localhost:' + (process.env.PORT || 3000) + '\n');
      
    }
  }

}
