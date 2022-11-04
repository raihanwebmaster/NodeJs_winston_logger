import mongoose from "mongoose";
export const url = "mongodb://localhost:27017/parcel";
const options = {};
const log = (msg) => console.log(msg);
export const connectWithDB = () => {
    mongoose.connect(url, options, (err, db) => {
      if (err) {
        console.log(err);
      } else log("database conneting establilsh");
    });
  };

  // export default connectWithDB;