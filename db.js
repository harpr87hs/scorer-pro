// getting-started.js
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
main().catch((err) => console.log(err));

async function main() {
  console.log("Mongo DB Connecting");
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Mongo DB Connected");
}
