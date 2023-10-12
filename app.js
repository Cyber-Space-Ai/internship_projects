var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://salima:n2Dv34yFApQNYmOx@cluster0.d8bcbdk.mongodb.net/your-database-name?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configuration de Multer pour gérer le téléversement du fichier PDF
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }).single('pdf');

// Définition du schéma MongoDB pour les documents
var documentSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    phone: String,
    niveau: String,
    genre: String,
    durer: String,
    service: String,
    age: String,
    pdf: Buffer,
});

var Document = mongoose.model('Document', documentSchema);

app.post('/sign_up', function(req, res){
    upload(req, res, function(err){
        if (err instanceof multer.MulterError) {
            // Gérer les erreurs de Multer
            console.log(err);
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // Gérer les autres erreurs
            console.log(err);
            return res.status(500).json({ error: err.message });
        }

        var name = req.body.name;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var phone = req.body.phone;
        var niveau = req.body.niveau;
        var genre = req.body.genre;
        var durer = req.body.durer;
        var service = req.body.service;
        var age = req.body.age;
        var pdfFile = req.file.buffer;

        var newDocument = new Document({
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            niveau: niveau,
            genre: genre,
            durer: durer,
            service: service,
            age: age,
            pdf: pdfFile,
        });

        newDocument.save()
            .then(function(document) {
                console.log("Record inserted successfully");
                // Afficher une alerte personnalisée
                var alertMessage = "Registration has been completed successfully. In the event that you are accepted or rejected as an intern, we will send you an email.";
                res.send('<script>alert("' + alertMessage + '");</script>');
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            });
    });
});

app.get('/', function(req, res){
    res.set({
        
    });
    
});

app.listen(3000, function(){
    console.log("Server listening at port 3000");
});
