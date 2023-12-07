const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()
const dba = require('./db_access.js')

const bodyParser = require('body-parser')
db = dba.connect()
// serves pub folder
app.use(express.static('pub'))
app.get('/trash',(req,res)=>{
    dba.trash(db)
})

app.get('/events',(req,res)=>{
    dba.readAll(db,res)
    
    
})

app.post('/events',upload.array(),(req,res,next)=>{
    new_item = {...req.body}
    new_item.id = ""+parseInt(Math.random()*1000)
    dba.add(db,new_item)
    res.redirect(301, '../events')
})

app.get('/events/:id',(req,res)=>{
    let id = req.params.id
    dba.readAll(db,res,id)
    })

app.listen(3000)