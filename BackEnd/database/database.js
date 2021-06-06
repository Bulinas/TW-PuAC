var MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const URL = "mongodb://localhost:27017/";

class Database {
  constructor() {
    this.client = new MongoClient(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  init = async () => {
    await this.client.connect();
    this.db = this.client.db("PuAC");
  };

  getAll = async (collection) => {
    return await this.db.collection(collection).find({}).toArray();
  };

  getAllByFilter = async (collection, filter) => {
    return await this.db.collection(collection).find(filter).toArray();
  };

  getById = async (collection, id) => {
    return await this.db.collection(collection).findOne({ _id: ObjectID(id) });
  };

  getByFilter = async (collection, filter) => {
    return await this.db.collection(collection).findOne(filter);
  };

  insert = async (collection, obj) => {
    let insertedObj = await this.db.collection(collection).insertOne(obj);
    obj._id = insertedObj.insertedId;
    return obj;
  };
}

module.exports = Database;
