const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
var bodyParser = require('body-parser')
const passport = require('passport');


//Inicializaciones 
const app = express();
const DB = require('./database');
require('./config/passport');

DB();

//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'Layouts'), //partes que se pueden reutilizar
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Middlewares acciones ejecutadas antes que lleguen al servidor
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretApp',
    resave: true,
    saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Global Variables


//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/employees'));
app.use(require('./routes/clients'));
app.use(require('./routes/'));

//Archivos Estáticos
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Inicio de Servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});