const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./application/config/db.config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const corsOptions = {
    origin: 'http://localhost:8000'
};

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SejutaCita Test Case",
            version: "1.0.0",
            description: "Technical test written by Ulil Albab"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ],
    },
    apis: ["./application/routes/*.js"]
}

const specs = swaggerJsDoc(options)
const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = require('./application/models');
const Role = db.role;

const initial = () => {
    Role.estimatedDocumentCount((err,count) => {
        if(!err && count === 0) {
            new Role({
                name: 'user'
            }).save( err => {
                if (err) {
                    console.log('error: ', err);
                }

                console.log('Berhasil menambahkan role user ke dalam koleksi');
            })

            new Role({
                name: 'admin'
            }).save( err => {
                if (err) {
                    console.log('error: ' , err);
                }
                console.log('Berhasil menambahkan role admin ke dalam koleksi')
            })
        }
    })
}

db.mongoose
    .connect(`mongodb+srv://m001-student:SecurePassword2021@cluster0.aotrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Koneksi ke database berhasil!');
        initial();
    })
    .catch(err => {
        console.log('Koneksi ke database gagal: ' , err);
        process.exit();
    })

app.get('/', (req,res) => {
    res.json({message: 'SejutaCita technical test.'})
})

//Authentication and Authorization Routes
require('./application/routes/auth.routes')(app)
require('./application/routes/user.routes')(app)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`SejutaCita's user data server is running on port ${PORT}`);
});