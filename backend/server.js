// Création des constante
const http = require('http');
const app = require('./app');

// Appel de la fonction app et paramétrage du port
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);