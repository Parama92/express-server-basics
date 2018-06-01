const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) { console.log('Unable to save log in file: ', err) }
    })
    next()
})

// app.use((req,res,next)=> {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase()
})
app.get('/', function(req, res){
    //res.send('<h1>Hello Express</h1>')
    // res.send({
    //     name: 'Parama',
    //     likes:[
    //         'TV', 'Coding'
    //     ]
    // })
    res.render('home.hbs',{
        welcomeMessage : 'Welcome to your website!',
        pageTitle : 'Home Page'
    })
})
app.get('/about', function(req, res){
    res.render('about.hbs',{
        pageTitle : 'About Page'
    })
})
app.get('/bad', function(req, res){
    res.send({
        errorMessage: 'Bad request sent!'
    })
})
app.listen(port, () => {
    console.log(`Server has been started in port: ${port}!`)
})