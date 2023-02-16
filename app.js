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
  fs.readdir('./data', (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      res.status(500).send('Error reading directory');
      return;
    }

    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    const data = jsonFiles.map(file => {
      const filePath = path.join("data", file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });

    res.render('index', {title: "index", files: data });
  });
});

app.get('/journal', (req, res) => {
  res.render('journal-create', { title: 'create-journal'});
});

app.post('/journal', (req, res) => {
  saveJournalEntry(req, res);
  res.redirect('/')
});

function saveJournalEntry(req, res) {
  console.log(req.body)
  const jsonObject = req.body;
  const {title, text} = jsonObject
  file_name = `./data/${title}.json`
  obj = JSON.stringify({title, text, date: new Date()})
  console.log(file_name, obj)
  fs.writeFileSync(file_name, obj);
  res.send({ message: 'Data saved successfully' });
}

app.get('/view/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = __dirname + '/data/' + filename + '.json';
  
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.status(404).send({ message: 'File not found' });
    } else {
      console.log("BRUH")
      res.render('view', { title: 'view', ...JSON.parse(content)});
    }
  });
});

app.post('/api/save', (req, res) => {
  saveJournalEntry(req, res);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
