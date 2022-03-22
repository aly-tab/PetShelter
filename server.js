const express = require('express');
const app = express();
require('./server/config/mongoose.config');
const cors = require('cors');
app.use(cors({credentials: true, origin: process.env.REACT_URI}));

const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./server/routes/shelter.routes')(app);
require('./server/routes/login.routes')(app);
require('./server/routes/user.routes')(app);

const port = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})