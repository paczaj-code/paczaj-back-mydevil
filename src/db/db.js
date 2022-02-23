const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const uri = "mongodb+srv://Marcin:Ralf1996@myprojects.nw14p.mongodb.net/paczaj_blog_test?retryWrites=true&w=majority";
const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then(client => {
      console.log("connected!!!!!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getBd = () => {
  if (_db) {
    return _db;
  }

  throw new Error("No database found");
};

exports.mongoConnect = mongoConnect;

exports.getBd = getBd;
