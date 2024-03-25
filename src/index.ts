import express from "express";
import dotenv from "dotenv";
import sequelize from "./sequelize";
import User from "./models/User.model";
import Movie from "./models/Movie.model";
import Review from "./models/Review.model";

dotenv.config();

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password });
    res.status(201).send({ message: 'User registered successfully', userId: newUser.id });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send({ message: 'Email already in use.' });
    }
    res.status(500).send({ message: 'Failed to register user.' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).send('Invalid login credentials');
    }
    res.send('Login successful');
  } catch (error) {
    res.status(400).send(error);
  }
});
const port = 3000;

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conection established successfully.");
  })
  .then(() => {
    sequelize.addModels([User, Movie, Review]);
    sequelize.sync({ force: true }).then(() => {
      console.log("Database & tables created and synced!");
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
  })
  .catch((err) => {
    console.error("Could not connect to the database:", err);
  });
