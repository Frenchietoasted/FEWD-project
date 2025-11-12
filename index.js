import express from 'express';
const app = express()
const port = 3000
app.use(express.static("public"))
app.set('view engine', 'ejs');

// Without middleware
app.get('/', function (req, res) {

    // Rendering home.ejs page
    res.render('index', { name: 'John Doe' });
})

app.get('/calendar.ejs', function (req, res) {

    // Rendering home.ejs page
    res.render('calendar', { name: 'John Me' });
})

app.get('/timer.ejs', function (req, res) {

    // Rendering home.ejs page
    res.render('timer', { name: 'John Doe' });
})

app.get('/checklist.ejs', function (req, res) {

    // Rendering home.ejs page
    res.render('checklist', { name: 'John Doe' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

