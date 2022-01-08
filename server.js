require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.json({ msg: "Hello Peter" })
// })

// Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log(`Connected to mongodb.`);
  }
);

const port = process.env.PORT || 3245;

app.listen(port, () =>
  console.log(`slidesface.com Backend Running on port http://localhost:${port}`)
);
