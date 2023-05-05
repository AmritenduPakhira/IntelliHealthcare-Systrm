var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
const base = `${__dirname}/index.html`
const mqtt =`${__dirname}/mqtt`;
//

app.use(express.static(__dirname));

app.use(express.static(`__dirname/index`));


app.get('/', (req, res) => {
    res.sendFile(`${base}`);
    
  });

app.get('/amrit.html', (req, res) => {
    res.sendFile(__dirname + '/amrit.html');
});

app.get('/ankit', (req, res) => {
    res.sendFile(`${mqtt}/mqtt.html`);
    console.log(base);
  });

app.get('/contact.html', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.get('/gallery.html', (req, res) =>{
    res.sendFile(__dirname + '/gallery.html')
})

app.get('/database.html' , (req, res) =>{
    res.sendFile(__dirname + '/database.html')
})
app.get('/Team.html' , (req, res) =>{
    res.sendFile(__dirname + '/Team.html')
})
app.get('/from.html' , (req, res) =>{
    res.sendFile(__dirname + '/from.html')
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
