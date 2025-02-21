
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({origin:"http://localhost:3000"}))


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1221",
    database:"student"
})

db.connect((err)=>{
    if(err){
        console.log("ERROR CONNECTING",err)    
    }
    else{
        console.log("CONNECTED");
        
    }
})


app.get("/api/students", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching students", error: err });
      }
      res.status(200).json(result); // Send the students' data back as JSON
    });
  });
  


app.post("/api/student", (req, res) => {
    const { name, age, email } = req.body;

    db.query("INSERT INTO user(name, age, email) VALUES(?, ?, ?)", [name, age, email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        res.status(201).json({ message: "Insert Successful" });
    });
});


app.put("/api/student/:id", (req,res)=>{

    const {name,age,email} =req.body

    db.query("UPDATE user SET name =?,age =?,email =? WHERE id =?", [name,age,email,req.params.id], (err,result)=>{

        res.status(200).json({message:"Updated SUCESSFULL"})
    })

})

app.delete("/api/student/:id", (req,res)=>{

    db.query("DELETE FROM user WHERE id =?", [req.params.id], (err,result)=>{

        res.status(200).json({message:"DELETED SUCESSFULL"})
    })
})


app.listen(5000,()=>{

    console.log("Connected to 5000 Server");
    
})