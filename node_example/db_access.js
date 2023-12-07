const sqlite3 = require('sqlite3').verbose();

function connect() {
    const db = new sqlite3.Database('./db/database.sqlite', 
    function (err) { 
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQLite database');
    });
    return db
}

function trash(db) {
    db.run('DROP TABLE IF EXISTS Events',function (err) {
        if (err) { console.error(err) }
        else { console.log("Dropping Events Table")
        init(db);
    }
    })
    
}

function init(db) {
    db.run('CREATE TABLE IF NOT EXISTS Events(id INTEGER PRIMARY KEY AUTOINCREMENT,created TEXT DEFAULT CURRENT_TIMESTAMP, eventName TEXT, eventDate TEXT, eventLocation TEXT);',function (err) {
        if (err) { console.error(err) }
        else { console.log("Create Events Table")}
    })
}

function add(db,body) {
    let {id,eventName,eventDate,eventLocation} = body||"no message sent"
    db.run('INSERT INTO Events (id,eventName,eventDate,eventLocation) VALUES (?,?,?,?)',[id,eventName,eventDate,eventLocation],function (err) {
        if (err) { console.error(err) }
        else { console.log("Adding Event")}
    })
}

function readAll(db,res,id="") {
    data = []
   
    db.all('SELECT * FROM Events',function (err,rows){
        if (err) { console.error(err) }
        else {
            data = rows
            if (id=="") {
            res.send(`<h2>Current Events:</h2>
    <table><tr><th>ID</th><th>Event Title</th></tr>
    ${data.map(x=>`<tr><td>${x['id']}</td><td>${x['eventName']}</td></tr>`).join('')}</table>
    <form method="post" enctype="multipart/form-data">
        <p>Event<input type="text" name="eventName">
        <p>Date<input type="text" name="eventDate">
        <p>Location<input type="text" name="eventLocation">
        <p><input type=submit value=Update>
    </form>`)} else {
            result = data.filter(x=>x['id']==id)
            if (result.length > 0) {
            res.send(`<h2>Current Event:</h2>
            ${JSON.stringify(result[0])}
            <a href="../events">Back</a>`)}
            else {
            res.send(`<h2>Event Not Found</h2>
            <a href="../events">Back</a>`)} 
    }
        }
    })
   
//    return data.map(x=>`<tr><td>${x['id']}</td><td>${x['eventName']}</td><tr>`).join('')
}

module.exports = {connect,trash,add,readAll}