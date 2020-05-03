console.log('server running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const certenabled = true;

app.enable('trust proxy');

app.use (function (req, res, next) {
        if (req.secure) {
                next();
        } else {
                res.redirect('https://' + req.headers.host + req.url);
        }
});

app.use(express.static('public'));

var httpServer;
var httpsServer;

let db;

const url =  'mongodb://localhost:27017/countdb';
if(certenabled){
/// CERT
const fs = require('fs');
const http = require('http');
const https = require('https');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/killcorona.icu/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/killcorona.icu/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/killcorona.icu/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

httpServer = http.createServer(app);
httpsServer = https.createServer(credentials, app);
}
/// CERT

function getReg(){
  var temp = Math.floor(Math.random() * Math.floor(13)) + 1;
  switch(temp){
    case 1: return "India";
    case 2: return "Australia";
    case 3: return "United States";
    case 4: return "Germany";
    case 5: return "United States";
    case 6: return "India";
    case 7: return "Pakistan";
    case 8: return "United Kingdom";
    case 9: return "China";
    case 10: return "India";
    case 11: return "Canada";
    case 12: return "India";
    case 13: return "Malaysia";
    case 14: return "United States";
    case 15: return "Sri Lanka";
  }
}

MongoClient.connect(url, (err, database) => {
    if(err) {
      return console.log(err);
    }
    db = database;
  if(certenabled){
    httpServer.listen(80, () => {
      console.log('HTTP Server running on port 80');
    });
    
    httpsServer.listen(443, () => {
      console.log('HTTPS Server running on port 443');
    }); }
    else {
    app.listen(80, () => {
      console.log('listening on 80');
    });
    }
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.post('/killed', (req, res) => {

    db.collection('kills').updateOne({},{ $inc: {gt:1}}, (err, result) => {
        if (err) {
          return console.log(err);
        }
       // console.log('kill added to db');
        
      });
    var reg = getReg();
  //  console.log(reg);
    db.collection('reg').updateOne({"name": reg},{ $inc: {"val":1}},{ upsert : true }, (err, result) => {
        if (err) {
          return console.log(err);
        }
     //   console.log('reg added to db');
        
      });
    
      // var table;
      // var avg = 1;
      // db.collection('kills').findOne({}, function(err,result){
      //     if(err) return console.log(err);
      //     avg = result.gt/result.tusers;
      //     db.collection('clicks').updateOne({},{ $set: {av:avg}}, (err, result) => {
      //         if (err) {
      //           return console.log(err);
      //         }
      //         console.log('average updated in db');
              
      //       });
      // });

      res.sendStatus(201);
    
  });

 
// app.post('/clicked', (req, res) => {
//     const click = {clickTime: new Date()};

//     db.collection('clicks').updateOne({},{ $inc: {gt:1}}, (err, result) => {
//         if (err) {
//           return console.log(err);
//         }
//         console.log('click added to db');
        
//       });
//     // var reg = getReg();
//     // console.log(reg);
//     // db.collection('reg').updateOne({"name": reg},{ $inc: {"val":1}},{ upsert : true }, (err, result) => {
//     //     if (err) {
//     //       return console.log(err);
//     //     }
//     //     console.log('reg added to db');
        
//     //   });
    
//       var table;
//       var avg = 1;
//       db.collection('clicks').findOne({}, function(err,result){
//           if(err) return console.log(err);
//           avg = result.gt/result.tusers;
//           db.collection('clicks').updateOne({},{ $set: {av:avg}}, (err, result) => {
//               if (err) {
//                 return console.log(err);
//               }
//               console.log('average updated in db');
              
//             });
//       });

//       res.sendStatus(201);
    
//   });

  app.post('/addUser', (req, res) => {
    db.collection('kills').updateOne({},{ $inc: {tusers:1}}, (err, result) => {
      if (err) {
        return console.log(err);
      }
   //   console.log('user added to db');
    });

    // var table;
    // var avg = 1;
    // db.collection('kills').findOne({}, function(err,result){
    //     if(err) return console.log(err);
    //     avg = result.gt/result.tusers;
    //     db.collection('kills').updateOne({},{ $set: {av:avg}}, (err, result) => {
    //         if (err) {
    //           return console.log(err);
    //         }
    //         console.log('average updated in db');
            
    //       });
    // });

     var addr = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    // console.log(addr);
     var ipaddr = String(addr);
     var obj = {ip: ipaddr};
     db.collection('addr').insertOne(obj, (err, result) => {
        if (err) {
          return console.log(err);
        }
      //  console.log('addr added to db');
        
      });

    res.sendStatus(201);
    
  });

  app.post('/maxlvl', (req, res) => {
    db.collection('kills').updateOne({},{ $inc: {maxlvl:1}}, (err, result) => {
      if (err) {
        return console.log(err);
      }

    });
    res.sendStatus(201);
    
  });

  app.get('/kills', (req, res) => {

    db.collection('kills').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

  app.get('/reg', (req, res) => {

    db.collection('reg').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });