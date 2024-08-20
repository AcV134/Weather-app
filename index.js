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

app.post('/search',async (req,res)=>{
    try{
        const result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${req.body.latitude}&longitude=${req.body.longitude}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,apparent_temperature,weather_code&daily=weather_code,,temperature_2m_max&timezone=auto#`);
        let value = result.data;
        // res.send({ result: value, location: req.body.location });
        res.render('index.ejs',{ result: value, location: req.body.location });
    }catch(error){
        console.error(error);
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})