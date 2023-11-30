const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()

const bodyParser = require('body-parser')

// serves pub folder
app.use(express.static('pub'))

const data = {events:[]}

app.get('/events',(req,res)=>{
    console.log(data.events)
    res.send(`<h2>Current Events:</h2>
    <table><tr><th>ID</th><th>Event Title</th></tr>
    ${data.events.map(x=>`<tr><td>${x['id']}</td><td>${x['eventName']}</td><tr>`).join('')}</table>
    <form method="post" enctype="multipart/form-data">
        <p>Event<input type="text" name="eventName">
        <p>Date<input type="text" name="eventDate">
        <p>Location<input type="text" name="eventLocation">
        <p><input type=submit value=Update>
    </form>`)
})

app.post('/events',upload.array(),(req,res,next)=>{
    new_item = {...req.body}
    new_item.id = ""+parseInt(Math.random()*1000)
    data.events.push(new_item)
    res.redirect(301, '../events')
})

app.get('/events/:id',(req,res)=>{
    let id = req.params.id
    let result = data.events.filter(x=>x.id==id)
    if (result.length > 0) {
    res.send(`<h2>Current Event:</h2>
    ${JSON.stringify(result[0])}
    <a href="../events">Back</a>`)}
    else {
    res.send(`<h2>Event Not Found</h2>
    <a href="../events">Back</a>`)} 
    })

app.listen(3000)