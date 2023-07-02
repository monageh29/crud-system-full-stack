const mysql = require("mysql2")
const express = require("express");
var cors = require("cors")
const app = express()
const port=5001;
const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'first'
})

app.use(cors())
app.use(express.json())
app.get("/Products",(req,res,next)=>{

  connection.execute("SELECT * FROM PRODUCTS",(err,data)=>{
        if(err){
            return res.json({message:"Query err",err})     
             }
     
     return res.json({message:"Done",data})
    })
   

    })

    // add
app.post('/Products',(req,res,next)=>{
    const {name,category,price,description	}=req.body
  
    const query =`insert into Products(name,category,price,description) values('${name}','${category}',${price},'${description}')`

  
     connection.execute(query,(err,result,fields)=>{
      if(err){
       
        return res.json({message:"Query err",err})    
        }
        
          return res.json({message:"Done",result})
        
    
     
        })
      })
          // update
  app.put('/Products',(req,res,next)=>{
    const {id}=req.body
    const{name,price}=req.body;
    const query =`update Products set name='${name}',price='${price}' where id=${id}`
    connection.execute(query,(err,result,fields)=>{
      if(err){
     
        return res.json({message:"Query err",err})    
        }
      res.json({message:'Done',result})
    })
    })
    //   delete
  app.delete('/Products',(req,res,next)=>{
    const {id}=req.body
    const query =`delete from Products where id=${id}`
    connection.execute(query,(err,result,fields)=>{
      if(err){
     
        return res.json({message:"Query err",err})    
        }
      res.json({message:'Done',result})
    })
    })
    // search
    app.get('/Products/search',(req,res,next)=>{
   
        const {SearchKey}=req.query;
        // console.log(req.query)
        const query =`SELECT * FROM Products WHERE name like'${SearchKey}%' `
     
        connection.execute(query,(err,result,fields)=>{
          if(err){
         
            return res.json({message:"Query err",err})    
            }
          res.json({message:'Done',result})
        })
      
        })
    app.listen(port,()=>{
        console.log(`server is run on port ....${port}`)
    })