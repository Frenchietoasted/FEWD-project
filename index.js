import express from 'express';
const app = express()
const port = 3000
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    // Rendering home.ejs page
    res.render('index');
})

app.get('/calendar', function (req, res) {

    // Rendering home.ejs page
    res.render('calendar');
})

app.get('/timer', function (req, res) {

    // Rendering timer.ejs page
    res.render('timer');
})

app.get('/checklist', function (req, res) {

    // Rendering home.ejs page
    res.render('checklist');
})

app.get('/easter_egg', function (req, res) {

    // Rendering easter_egg.ejs page
    res.render('easter_egg', { name: 'John Doe' });
})

app.listen(port, () => {
    console.log(`Websites being hosted on http://localhost:${port}`)
})


