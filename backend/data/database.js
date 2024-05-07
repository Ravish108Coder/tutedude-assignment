import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () => {
  mongoose
    .connect(
      process.env.MONGO_URI,
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   family: 4, // This option specifies the IP address family to use (IPv4)
      // },
      {
        dbName: "tutedude",
      }
    )
    .then((c) =>
      console.log(
        `Database Connected with ${c.connection.host} and ${c.connection.name}`
      )
    )
    .catch((e) => console.log(e));
};
