const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = 3000;

let data = [];

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  fs.readdir(path.join(__dirname, 'data'), (err, files) => {
    if (err) {
      res.render('index', { files: [] });
    } else {
      res.render('index', { files });
    }
  });
});

app.get('/journal', (req, res) => {
  res.sendFile(__dirname + '/journal.html');
});

app.get('/view/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = __dirname + '/data/' + filename;
  
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.status(404).send({ message: 'File not found' });
    } else {
      res.send(content);
    }
  });
});

app.post('/api/save', (req, res) => {
  const jsonObject = req.body;
  console.log(jsonObject)
  title = `./data/${jsonObject['title']}.txt`
  text = jsonObject['text']
  fs.writeFileSync(title, text);
  res.send({ message: 'Data saved successfully' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
