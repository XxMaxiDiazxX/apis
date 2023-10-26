// se definen las variables necesarias
let express = require('express');
let mysql = require('mysql');
let app = express();


app.use(express.json());

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

app.post('/api/articulos', (req,res)=>{
    let data = {id:req.body.id, nombre:req.body.nombre, apellido:req.body.apellido, telefono:req.body.telefono};
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

// app.put('/api/articulos', (req,res)=>{
//     let data = {id:req.body.id};
//     let sql = "UPDATE articulos SET? WHERE id =?";
//     conexion.query(sql, data, function(error,results){
//         if(error){
//             throw error;
//         }else{
//             res.send(results);
//         }
//     });
// });

app.put('/api/articulos/:id', (req,res)=>{
    let elque = {nombre:req.body.nombre};
    let sql = "UPDATE articulos SET ? WHERE id =?";
    conexion.query(sql, [elque,req.params.id], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

app.delete('/api/articulos/:id', (req,res)=>{
    let sql = "DELETE FROM articulos WHERE id =?";
    conexion.query(sql, [req.params.id], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});