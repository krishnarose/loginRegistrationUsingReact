import  Express  from "express";

const app = Express();

app.get('/',(req, res)=>{
    res.send('This is server message')
})

const PORT = 7000;

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})