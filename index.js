import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

let value;

app.get('/',(req,res)=>{
    res.render('index.ejs',{result:value});
})

app.get('/secret',(req,res)=>{
    console.log(req.body);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})