/**
 * Created by falappat on 12/24/16.
 */
var express = require('express');

app = express();

app.use(express.static(__dirname));
console.log('__dirname=',__dirname);
app.listen(3001);