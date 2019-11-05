const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password : 'Meow1982!',
    database: 'boatrental'

})

db.connect()
//  boats คือ url ที่เราต้องการใหัลิ้งไปหา  http://localhost:3001/boats
app.get('/boats', (req,res) =>{
    let query = " SELECT * FROM boats"
    db.query(query, (err, results) =>{
        res.json(results)
    })

}) 
app.get('/addboat', (req,res)=>{
    let query = `INSERT INTO boats(bid,bname,color)
    values (${req.query.bid},\"${req.query.bname}\",\"${req.query.color}\")`
    // http://localhost:3001/addboat?bid=109&bname=hello&color=green == > add to database
    db.query(query, (err, results) =>{
        if(err) { 
            console.log(err)
            console.log("Something wrong! ")
        } else {
            res.send("Success")
                 
        }
    })
})


//http://localhost:3001/deleteboatbyid?delete=109 ทำการลบข้อมูลที่เราเพิ่มเข้าไป 
app.get('/deleteboatbyid',(req,res)=>{
    let query = `DELETE FROM boats WHERE bid = ${req.query.delete}`
    db.query(query,(err,results)=>{
      if(err){
        console.log(err)
      }else{
        res.send(`delete boat id: ${req.query.delete} already.`)
      }
    })
  
  })

  app.get('/update',(req, res) => {
    let query = `UPDATE boats SET bname = '${req.query.bname}', color='${req.query.color}'
                WHERE bid='${req.query.bid}'`;
    db.query(query, (error,results) => {
        if(error) {
            console.log('Something wrong!')
        } else {
            res.send(`update boat id: ${req.query.bid} already.`);
        }
    });
 })

// ==============================================================================================     

//  sailors คือ url ที่เราต้องการใหัลิ้งไปหา  http://localhost:3001/sailors
app.get('/sailors', (req,res) =>{
    let query = " SELECT * FROM sailors"
    db.query(query, (err, results) =>{
        res.json(results)
    })

}) 
app.get('/addsailors', (req,res)=>{
    let query = `INSERT INTO sailors(sid,sname,rating,age)
    values (${req.query.sid},\"${req.query.sname}\",\"${req.query.rating}\",\"${req.query.age}\")`
    // http://localhost:3001/addsoilors?sid=25&sname=titanic&rating=24&age=100      == > add to addsoilors
    db.query(query, (err, results) =>{
        if(err) { 
            console.log(err)
            console.log("Something wrong! ")
        } else {
            res.send("Success")
                 
        }
    })
})

//http://localhost:3001/deletesailors?delete=25 ทำการลบข้อมูลที่เราเพิ่มเข้าไป 
app.get('/deletesailors',(req,res)=>{
    let query = `DELETE FROM sailors WHERE sid = ${req.query.delete}`
    db.query(query,(err,results)=>{
      if(err){
        console.log(err)
      }else{
        res.send(`delete sailors id: ${req.query.delete} already.`)
      }
    })
  
  })

  //http://localhost:3001/updatesailors
    app.get('/updatesailors',(req, res) => {
    let query = `UPDATE sailors SET sname = '${req.query.sname}', rating='${req.query.rating}'
                WHERE sid='${req.query.sid}'`;
    db.query(query, (error,results) => {
        if(error) {
            console.log('Something wrong!')
        } else {
            res.send(`update sailors id: ${req.query.sid} already.`);
        }
    });
 })
       
// ==============================================================================================    
//  boats คือ url ที่เราต้องการใหัลิ้งไปหา  http://localhost:3001/reserves
app.get('/reserves', (req,res) =>{
    let query = " SELECT * FROM reserves"
    db.query(query, (err, results) =>{
        res.json(results)
    })

}) 
app.get('/addreserves', (req,res)=>{
    let query = `INSERT INTO reserves(sid,bid,day)
    values (${req.query.sid},${req.query.bid},\"${req.query.day}\")`
    // http://localhost:3001/addreserves?sid=29&bid=135&day=2010-10-15  == > add to database
    db.query(query, (err, results) =>{
        if(err) { 
            console.log(err)
            console.log("Something wrong! ")
        } else {
            res.send("Success")
                 
        }
    })
})

//http://localhost:3001/deleteboatbyid?delete=109 ทำการลบข้อมูลที่เราเพิ่มเข้าไป 
app.get('/deletereserves',(req,res)=>{
    let query = `DELETE FROM reserves WHERE sid = ${req.query.delete} AND bid = ${req.query.delete}`
    db.query(query,(err,results)=>{
      if(err){
        console.log(err)
      }else{
        res.send(`delete reserves id: ${req.query.delete} already.`)
      }
    })
  
  })
//http://localhost:3001/updatereserves
  app.get('/updatereserves',(req, res) => {
    let query = `UPDATE reserves SET day='${req.query.day}'
                WHERE sid='${req.query.sid}' AND bid = '${req.query.bid}'`;
    db.query(query, (error,results) => {
        if(error) {
            console.log('Something wrong!')
        } else {
            res.send(`update reserves id: ${req.query.bid} already.`);
        }
    });
 })


// ==============================================================================================    

app.listen(3001,() =>{
    console.log('Start server at port 3001')
})


