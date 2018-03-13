var path = require('path');

module.exports = {
    "appenders": {
      "access": {
        "type": "dateFile",
        "filename": "log/access/access.log",
        "pattern": "-yyyy-MM-dd",
        "category": "http"
      },
      "app": {
        "type": "file",
        "filename": "log/app/app.log",
        "alwaysIncludePattern":true,
        "maxLogSize": 10485760,
        "numBackups": 3
      },
      "errorFile": {
        "type": "dateFile",
        "filename": "log/errors/errors.log",
        "alwaysIncludePattern":true,
        "pattern": "-yyyy-MM-dd-hh.log"  //后缀，每小时创建一个新的日志文件
      },
      "errors": {
        "type": "logLevelFilter",
        "level": "ERROR",
        "alwaysIncludePattern":true,
        "appender": "errorFile"
      }
    },
    "categories": {
      "default": { "appenders": [ "app", "errors" ], "level": "DEBUG" },
      "http": { "appenders": [ "access"], "level": "DEBUG" }
    }
  }
