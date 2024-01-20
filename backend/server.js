const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path:'./config/dev.env'});


app.use(cors({
  origin: '*'
}));

app.use((req, res, next) => {
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = require("./models");
db.sequelize.sync();
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Drop and Resync with { force: false }");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// apis 
// include application routes
require("./routes/user.routes")(app);
require('./routes/auth.routes')(app);






// welcome api
app.get('/api/',(req,res)=>{

  res.status(200).send("Welcome to admin panel")
})
app.use(express.static(path.join(__dirname, "template")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'template/index.html'));
});

const PORT = process.env.PORT || 4000
const DEVELOPMENT = process.env.NODE_ENV



var server =app.listen(PORT,'localhost',()=>{
  var host = server.address().address;
  var port = server.address().port;
    console.log(`Serve is running in ${DEVELOPMENT} mode on ${PORT} port`);
    console.log("host:", host , ", port:", port)
})
