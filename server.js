const express = require('express');
const app = express();
app.use(express.json());
// const MongoClient = require('mongodb').MongoClient;
const bycrypt = require('bcrypt');

// let db;

// MongoClient.connect(`mongodb+srv://kidjustinchoi:kidjustin0524@cluster0.s2yc1kc.mongodb.net/user?retryWrites=true&w=majority`, (error, result) => {
//     if (error) return console.log(error);
//     db = result.db('user');
//     app.listen(3001, () => {
//         console.log('Server is running on port 3001');
//     })
// });

const users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(req.body.password, 10);
        // console.log(salt);
        // console.log(hashedPassword);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bycrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})
