const app = require ('express')();
const consign = require('consign')
const db = require('./config/db')
const enums = require('./enums/index.js')

app.db = db;
app.enums = enums;

consign()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api/validations.js')
.then('./api')
.then('./config/routes.js')
.into(app)

app.listen(3000, () => {
    console.log('Backend Executando...')
})