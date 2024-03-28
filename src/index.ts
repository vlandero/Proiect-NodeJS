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
import { deleteMovie } from "./routes/delete-movie";
import { deleteReview } from "./routes/delete-review";
import { updateMovie } from "./routes/update-movie";
import { updateReview } from "./routes/update-review";
import { updateReviewSchema } from "./models/zod/update-review-schema";
import multer from "multer";
import { addMoviePicture } from "./routes/add-movie-picture";
import { getMoviePicture } from "./routes/get-movie-picture";
import { updateMovieSchema } from "./models/zod/update-movie-schema";

dotenv.config();

const app = express();

const upload = multer({ dest: __dirname + '/uploads' });

app.use(express.json());

app.post('/user/register', validateSchema(registerSchema), register);

app.post('/user/login', validateSchema(loginSchema), login);

app.delete('/user/delete', verifyToken, deleteUser);

app.post('/movie/add', verifyToken, isAdmin, validateSchema(movieSchema), addMovie);

app.post('/movie/update/:id', verifyToken, isAdmin, validateSchema(updateMovieSchema), updateMovie);

app.post('/movie/add-picture/:id', verifyToken, isAdmin, upload.single('coverImage'), addMoviePicture);

app.get('/movie/picture/:id', getMoviePicture);

app.get('/movies', getMovies);

app.get('/movie/:id', getMovie);

app.delete('/movie/:id', verifyToken, isAdmin, deleteMovie);

app.post('/review/add', verifyToken, validateSchema(reviewSchema), addReview);

app.post('/review/update/:id', verifyToken, validateSchema(updateReviewSchema), updateReview);

app.delete('/review/:id', verifyToken, isAdmin, deleteReview);

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
