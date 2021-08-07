const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/css', express.static(__dirname + 'static/css'))

app.set('views', './')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
})
