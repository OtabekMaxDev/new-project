const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();
const PORT = 3000;

let news = [];

if (fs.existsSync('news.json')) {
    news = JSON.parse(fs.readFileSync('news.json'));
}

app.get('/news', (req, res) => {
    res.json(news);
});

app.listen(PORT, () => {
    console.log(`Server ishlayapti: http://localhost:${PORT}/news`);
    startTerminalInput();
});

function startTerminalInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = () => {
        rl.question("Sarlavha: ", (title) => {
            if (!title) return ask();

            rl.question("Matn: ", (text) => {
                news.push({
                    title,
                    text,
                    time: new Date().toLocaleString()
                });

                fs.writeFileSync('news.json', JSON.stringify(news, null, 2));
                console.log("saqlandi!\n");
                ask();
            });
        });
    };

    ask();
}
