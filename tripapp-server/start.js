require('dotenv').config();
const app = require('./server');
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'))

app.listen(3000, () => {
    console.log("TripApp started")
})