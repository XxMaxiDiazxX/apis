
let express = require('express');
let mysql = require('mysql');
let app = express();

//se ponen los datos de la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prueba"
})

// esta funcion nos sirve para verificar si esta la conexion con el servidor
conexion.connect(function(error){
    if (error){ 
        throw error;
    }else{
        console.log("Conexión exitosa");
    }
});

//nos lanza un texto si el servidor esta bien
app.listen('3000',function(){
    console.log('servidor OK');
})

// funcion para hacer prueba en postman en la ruta de inicio
app.get('/',function(req,res){
    res.send('ruta INICIO')
})

//
app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});
