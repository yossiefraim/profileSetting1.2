const config = require('./config.js').events,
      consts = require('./consts'),
      express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection;
var songsSchema = require('./songSchema');
var songs = conn.model('songs',songsSchema);

//handle db connection errors
conn.on('error',
  (err) => {
    console.log(`connection error: ${err}`);
});

exports.getData = (()=>{
        //promise that handle the coonction issue
        let query = new Promise((resolve,reject)=>{
          //use findOne because there is only one match to profile_id
          songs.find({}).exec(function(err,result){
              if (!err){
                //result return null but not error
                if(result==null){
                  reject('error:profile_id no match');
                }else{

                  resolve(result);
                }
              }
              else{
                reject('error:query error');
              }
          });

        });
        return query.then((fromReslove)=>{
          console.log(fromReslove);
          return fromReslove;
        }).catch((fromReject)=>{
          return fromReject;
        });
});
// exports.getUserProfileSetting = ((profile_id)=>{
//         //promise that handle the coonction issue
//         let query = new Promise((resolve,reject)=>{
//           //use findOne because there is only one match to profile_id
//           profile.findOne({id:{$eq:profile_id}}).exec(function(err,result){
//               if (!err){
//                 //result return null but not error
//                 if(result==null){
//                   reject('error:profile_id no match');
//                 }else{
//                   resolve(result);
//                 }
//               }
//               else{
//                 reject('error:query error');
//               }
//           });

//         });
//         return query.then((fromReslove)=>{
//           return fromReslove;
//         }).catch((fromReject)=>{
//           return fromReject;
//         });
//         mongoose.disconnect();
// });

// exports.getUserProfileByParams = ((age,payment)=>{
//         //promise that handle the coonction issue
//         let query = new Promise((resolve,reject)=>{
//           //checking parmeters content
//           if(age&&payment)
//           {
//             resolve(profile.find({age:{$lt:age},'payment.type':{$eq:payment}}));
//           }
//           //handle if parmeter content wrong
//           else{
//             if(!age)
//               reject('Error with age Parmeter');
//            if(!payment)
//               reject('Error with payment Parmeter');
//           }
//         });
//         return query.then((fromReslove)=>{
//           return fromReslove;
//         }).catch((fromReject)=>{
//           return fromReject;
//         });  
//         mongoose.disconnect();          
// });