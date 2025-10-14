const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const mentorRoutes = require("./routes/mentorRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const viewRoutes = require("./routes/viewRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 


app.engine('hbs', exphbs.engine({
    extname: 'hbs',  
    layoutsDir: path.join(__dirname, 'views'), 
    defaultLayout: false,
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.use("/thrive/mentors", mentorRoutes);
app.use("/thrive/trainees", traineeRoutes);
app.use("/thrive/sessions", sessionRoutes);
app.use("/", viewRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

