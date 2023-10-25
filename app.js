let express = require('express');
let mysql = require('mysql');
let app = express();

let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prueba"
})

conexion.connect(function(error){
    if (error){ 
        throw error;
    }else{
        console.log("Conexión exitosa");
    }
});
app.listen('3000',function(){
    console.log('servidor OK');
})

app.get('/',function(req,res){
    res.send('ruta INICIO')
})

app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});
