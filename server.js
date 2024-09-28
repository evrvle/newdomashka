const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const dataFilePath = 'users.json';

function readUsers() {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
}

app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

app.post('/users', (req, res) => {
    const users = readUsers();
    const newUser = { id: users.length ? Math.max(users.map(user => user.id)) + 1 : 1, ...req.body };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const users = readUsers();
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    
    if (index !== -1) {
        const updatedUser = { ...users[index], ...req.body };
        users[index] = updatedUser;
        writeUsers(users);
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:id', (req, res) => {
    const users = readUsers();          
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0]; // Get the deleted user object
        writeUsers(users);
        res.json(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
}); 

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});