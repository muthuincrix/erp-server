 var mongoose = require('mongoose')

let connection = null;
let db 

module.exports = async function ({url,poolSize}) {
  if (
    connection === null ||
    (connection.connection.readyState !== 1 &&
      connection.connection.readyState !== 2)
    // readystate 1 === connected, 2 === connecting, I don't want to start new connection if it's already connecting.
  ) {
    mongoose = require("mongoose");
    console.log("[MONGOOSE] Creating New Connection");

    mongoose.connection.on("open", () => {
        console.log("Connected with poolSize " + poolSize);
   //   log("[ MONGOOSE] Connected with poolSize " + poolsize);
    });

    try {
  mongoose.connect(url, {
        serverSelectionTimeoutMS:10000,
        connectTimeoutMS: 10000,
        maxPoolSize: poolSize,
      }).then(res => {
        db = res        
      })

    } catch (err) {
      console.log("Mongoose connection error", err);
    }
    connection = mongoose; //save it to the cache variable
  
    return 
  } else {
    return;
  }
};

function afterwards(){

    //do stuff
console.log('calling 2');
   // db.disconnect();
}


  
