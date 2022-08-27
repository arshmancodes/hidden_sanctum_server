const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');

app.use(express.json());

app.use(cors(), (req, res, next) => {
    next()
})

mongoose.connect('mongodb://localhost/local', () => {
    console.log("Connected to database");
});

app.use(express.json({ limit: '1000mb' }));

app.use('/auth', authRoutes);
app.use('/server', serverRoutes);

app.listen(3000, () => {
    console.log("Server running at 3000");
});