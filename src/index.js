const express = require('express')
const router = require('./routers/route.js')
const path = require('path')
const public = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./db/mongoose.js')
const cookieParser = require('cookie-parser')
const locrouter = require('./routers/markByLoc.js')
const crouter = require('./routers/class.js')
const otprouter = require('./routers/otp.js')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(public))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);


const PORT = process.env.PORT || 3000

app.use(router)
app.use(locrouter)
app.use(crouter)
app.use(otprouter)

app.listen(PORT,()=>{
    console.log('Server is listening at '+PORT)
})