import ProgressBar from 'progress';
import https from 'https';

 
// var bar = new ProgressBar(':bar', { total: 10 });

// var timer = setInterval(function () {
// //   bar.tick();
//   if (bar.complete) {
//     console.log('\ncomplete\n');
//     clearInterval(timer);
//   }
// }, 100);

// var bar = new ProgressBar(':current: :token1 :token2', { total: 3 })
// bar.tick({
//   'token1': "Hello",
//   'token2': "World!\n"
// })
// bar.tick(2, {
//   'token1': "Goodbye",
//   'token2': "World!"
// })
 
var req = https.request({
  host: 'download.github.com',
  port: 443,
  path: '/visionmedia-node-jscoverage-0d4608a.zip'
});
 
req.on('response', function(res){
  var len = parseInt(res.headers['content-length'], 10);
 
  console.log();
  var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: len
  });
 
  res.on('data', function (chunk) {
    bar.tick(chunk.length);
  });
 
  res.on('end', function () {
    console.log('\n');
  });
});
 
req.end();