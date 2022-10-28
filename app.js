const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const bodyParser = require('body-parser');

app.use(express.json());

app.use(cors(), (req, res, next) => {
    next()
})


app.use('/auth', authRoutes); // BASE_URL+/auth
app.use('/server', serverRoutes); // BASE_URL+/server  (e.g localhost:3000/server)
app.use('/packages', packagesRoutes);


app.listen(3000, () => {
    console.log("Server running at 3000");
});

