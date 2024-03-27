import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./utils/sequelize";
import { User } from "./models/db/User.model";
import { Movie } from "./models/db/Movie.model";
import { Review } from "./models/db/Review.model";
import { login } from "./routes/login";
import { register } from "./routes/register";
import { deleteUser } from "./routes/delete-user";
import { validateSchema } from "./middleware/validate-schema";
import { registerSchema } from "./models/zod/register-schema";
import { loginSchema } from "./models/zod/login-schema";
import { verifyToken } from "./middleware/verify-token";
import { isAdmin } from "./middleware/is-admin";
import { addMovie } from "./routes/add-movie";
import { movieSchema } from "./models/zod/add-movie-schema";
import { addReview } from "./routes/add-review";
import { reviewSchema } from "./models/zod/add-review-schema";
import { getMovies } from "./routes/get-movies";
import { getMovie } from "./routes/get-movie";

dotenv.config();

const app = express();

app.use(express.json());

app.post('/user/register', validateSchema(registerSchema), register);

app.post('/user/login', validateSchema(loginSchema), login);

app.delete('/user/delete', verifyToken, deleteUser);

app.post('/movie/add', verifyToken, isAdmin, validateSchema(movieSchema), addMovie);

app.get('/movies', getMovies);

app.get('/movie/:id', getMovie);

app.post('/review/add', verifyToken, validateSchema(reviewSchema), addReview)

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
