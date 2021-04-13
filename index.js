import express from 'express';

import morgan from 'morgan';

import cors from 'cors';

import path from 'path';

import mongoose from 'mongoose';

import router from './routes';

//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;
// const dbUrl = 'mongodb://localhost:27017/dbSistemas';
const dbUrl = 'mongodb+srv://byron:Byron9009@sistemaventas-crznc.mongodb.net/ADE_DB?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true,useUnifiedTopology: true})
.then(mongoose => console.log('Conexión establecida con el clúster de base de datos en MongoDB.'))
.catch(err => console.log(err));


const app=express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

if (process.env.NODE_ENV === "production"){

    app.use('/api',router);
    app.set('port',process.env.PORT || 777);

    app.listen(
        app.get('port'),()=>{
            console.log('Servidor de NojdeJS levantado en el puerto: ' + app.get('port'));
        });
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "public", "index.html"));
    });
}else{
    app.use('/api',router);
    app.set('port',process.env.PORT || 777);

    app.listen(
        app.get('port'),()=>{
            console.log('Servidor de NojdeJS levantado en el puerto: ' + app.get('port'));
        });
}
