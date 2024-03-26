import express from "express";
import dotenv from "dotenv";
import sequelize from "./utils/sequelize";
import User from "./models/db/User.model";
import Movie from "./models/db/Movie.model";
import Review from "./models/db/Review.model";
import { login } from "./routes/login";
import { register } from "./routes/register";
import { deleteUser } from "./routes/delete-user";
import { verifyToken } from "./utils/verify-token";

dotenv.config();

const app = express();
app.use(express.json());

app.post('/user/register', register);

app.post('/user/login', login);

app.delete('/user/delete', verifyToken, deleteUser);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const port = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Conection established successfully.");
  })
  .then(() => {
    sequelize.addModels([User, Movie, Review]);
    sequelize.sync().then(() => {
      console.log("Database & tables created and synced!");
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
  })
  .catch((err) => {
    console.error("Could not connect to the database:", err);
  });
