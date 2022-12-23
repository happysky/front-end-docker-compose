const fs = require('fs')
const path = require('path');
const FileStreamRotator = require('file-stream-rotator')
const morgan = require('morgan')
const moment = require('moment')
const logDirectory = path.join(__dirname, '.log')
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// 自定义token
morgan.token('localDate',function getDate(req) {    
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
})
   
// 自定义format，其中包含自定义的token
morgan.format('dev', ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');

morgan.format('combined', ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
  

const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
const errorLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'error-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

const accessLog = morgan(morganFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400;
    },
    stream: accessLogStream
})

const errorLog = morgan(morganFormat, {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
    stream: errorLogStream
})

module.exports = {
    accessLog,
    errorLog
}