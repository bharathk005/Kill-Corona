console.log('server running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.static('public'));

let db;

const url =  'mongodb://localhost:27017/countdb';

function getReg(){
  var temp = Math.floor(Math.random() * Math.floor(13)) + 1;
  switch(temp){
    case 1: return "India";
    case 2: return "Austrlia";
    case 3: return "United States";
    case 4: return "Germany";
    case 5: return "Malaysia";
    case 6: return "Sri Lanka";
    case 7: return "Pakistan";
    case 8: return "United Kingdom";
    case 9: return "China";
    case 10: return "New Zeland";
    case 11: return "Canada";
    case 12: return "Mexico";
    case 13: return "Brazil";
  }
}

MongoClient.connect(url, (err, database) => {
    if(err) {
      return console.log(err);
    }
    db = database;
    app.listen(8080, () => {
      console.log('listening on 8080');
    });
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.post('/killed', (req, res) => {

    db.collection('kills').updateOne({},{ $inc: {gt:1}}, (err, result) => {
        if (err) {
          return console.log(err);
        }
        console.log('kill added to db');
        
      });
    var reg = getReg();
    console.log(reg);
    db.collection('reg').updateOne({"name": reg},{ $inc: {"val":1}},{ upsert : true }, (err, result) => {
        if (err) {
          return console.log(err);
        }
        console.log('reg added to db');
        
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
      console.log('user added to db');
    });

    var table;
    var avg = 1;
    db.collection('kills').findOne({}, function(err,result){
        if(err) return console.log(err);
        avg = result.gt/result.tusers;
        db.collection('kills').updateOne({},{ $set: {av:avg}}, (err, result) => {
            if (err) {
              return console.log(err);
            }
            console.log('average updated in db');
            
          });
    });

    //  var addr = req.headers['x-forwarded-for'] || 
    //  req.connection.remoteAddress || 
    //  req.socket.remoteAddress ||
    //  (req.connection.socket ? req.connection.socket.remoteAddress : null);

    //  db.collection('addr').save(addr, (err, result) => {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     console.log('click added to db');
    //     res.sendStatus(201);
    //   });

    res.sendStatus(201);
    
  });

  // app.get('/clicks', (req, res) => {

  //   db.collection('clicks').find().toArray((err, result) => {
  //     if (err) return console.log(err);
  //     res.send(result);
  //   });
  // });

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