const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const usersDatabase = Array.from({ length: 20 }, (_, i) => ({
    firstname: `Ім'я_${i + 1}`,
    lastname: `Прізвище_${i + 1}`,
    score: Math.floor(Math.random() * 100) + 1
}));

app.get('/api/users', (req, res) => {
    const { sortBy, order } = req.query;
    let result = [...usersDatabase];

    if (sortBy && order) {
        result.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        result = result.slice(0, 10); 
    } else {
        result = result.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    setTimeout(() => {
        res.json(result);
    }, 1000);
});

app.get('/api/new-users', (req, res) => {
    res.json(usersDatabase.slice(0, 5));
});

app.get('/api/weather', (req, res) => {
    const randomTemp = Math.floor(Math.random() * 31);
    res.json({ city: 'Kyiv', temperature: randomTemp });
});

app.get('/api/gallery', (req, res) => {
    const galleryPath = path.join(__dirname, 'public', 'gallery');
    if (!fs.existsSync(galleryPath)) {
        return res.json([]);
    }
    const files = fs.readdirSync(galleryPath).filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
    res.json(files);
});

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});