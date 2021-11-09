const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3001'
};

const app = express();

app.use(cors(corsOptions));

app.get('/', (req,res) => {
    res.json({message: 'Welcome to SejutaCita!'})
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`SejutaCita's user data server is running on port ${PORT}`);
});