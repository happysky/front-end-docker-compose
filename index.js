const path = require('path');
const express = require('express')
const serveIndex = require('serve-index');
const ejs = require('ejs');
const morgan = require("./morgan")
const logger = require("./logger");

const app = express()
const port = 3000

// setup access logger
app.use(morgan.accessLog);
// setup error logger
app.use(morgan.errorLog);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
ejs.delimiter = '?';
ejs.openDelimiter = '<';
ejs.closeDelimiter = '>';
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.get("/", require('./controllers/home'))


app.listen(port, () => {
    logger.info("Example app listening on port " + port);
})

process.on('uncaughtException', function(err) {
    logger.error(`uncaughtException：${JSON.stringify(err)}`);
});

process.on('unhandledRejection', function(err, promise) {
    logger.error(`unhandledRejection：${err.message, promise}`);
});