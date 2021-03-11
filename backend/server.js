// const bodyParser = require('body-parser');
// const session = require('express-session')
// const cookieParser = require('cookie-parser');
const express = require('express')
const cors = require('cors') 


const app = express()
const port = process.env.PORT || 3000;

// Configuration
// app.use(cookieParser());
// app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.json())
app.use(cors());
// app.use(session({
//     secret: 'some-secret-string',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))


// Routing
const toyRoutes = require('./api/toy.controller')
app.use('/api/toy', toyRoutes)


app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})