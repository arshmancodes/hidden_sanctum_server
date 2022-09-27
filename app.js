const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');
const bodyParser = require('body-parser');

app.use(express.json());

app.use(cors(), (req, res, next) => {
    next()
})


app.use('/auth', authRoutes);
app.use('/server', serverRoutes);

app.listen(3000, () => {
    console.log("Server running at 3000");
});

