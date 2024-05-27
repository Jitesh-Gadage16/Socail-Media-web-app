require('dotenv').config()
require("./config/database").connect()
const passport = require('passport')
const express = require('express');
const app = express();
const port = 3001; // You can use any available port
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const teamRoutes = require('./routes/teamRoutes');
const postRoutes = require('./routes/postRoutes');
const expressLayouts = require('express-ejs-layouts');
// const fileUpload = require('express-fileupload');

const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));



require('./config/passport')(passport)
// app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(express.json()) // discuss this later       
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
  res.render('index');
});



app.use("/api/v1/", authRoutes);
app.use("/api/v1/", profileRoutes);
app.use("/api/v1/", teamRoutes);
app.use("/api/v1/", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
