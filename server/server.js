const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const api =require('./routes/api')
//const pers = require('./routes/person')
const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true }));

app.use(cors())
app.use('/api',api);
//app.use('/person',pers);

app.get('/',(req,res)=>{
    res.send('Sent from LocalHost')
})



app.listen(PORT, () => console.log(`App listening on PORT  ${PORT}!`))