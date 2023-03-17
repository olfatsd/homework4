const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("mongoose");

db.connect('mongodb+srv://olfatsd:Ali306%4097@cluster0.iznufjz.mongodb.net/SVBurger', () => {
    console.log('db on!!!')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('pages'));


const schemaClient = db.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const clientsList = db.model('clients', schemaClient);

app.post('/registeration', (req, res) => {
    let temp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password1
    }
    const addUserToDB = async () => {
        await clientsList.insertMany(temp);
        res.sendFile(__dirname + '/pages/sginIn.html')
    }
    addUserToDB();
})

app.post('/signIn', (req, res) => {
    const findClientByEmail = async () => {
        let result = await clientsList.findOne({ email: req.body.email });
        res.json(result);
    }
    findClientByEmail();
});

app.listen(3000, () => {
    console.log("server works on port 3000!!")
});