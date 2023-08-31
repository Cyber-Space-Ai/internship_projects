const express = require('express');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

// MongoDB Atlas connection details
const mongoURL = 'mongodb+srv://salima:n2Dv34yFApQNYmOx@cluster0.d8bcbdk.mongodb.net/?retryWrites=true&w=majority';

// Database and collection names
const dbName = 'internship';
const collectionName = 'document';

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Route handler for form submission
app.post('/insert', (req, res) => {
  // Extract form data
  const { nom, prenom, email, telephone, niveau, genre, durer, service, age } = req.body;

  // Create a new document object
  const document = {
    nom,
    prenom,
    email,
    telephone,
    niveau,
    genre,
    durer,
    service,
    age: parseInt(age),
  };

  // Connect to MongoDB Atlas
  mongodb.MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    // Select the database
    const db = client.db(dbName);

    // Insert the document into the collection
    db.collection(collectionName).insertOne(document, (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      // Close the MongoDB connection
      client.close();

      // Redirect the user or send a success message
      res.send('Form submitted successfully!');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
