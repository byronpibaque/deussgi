import models from '../models';

async function crearCarteras(idCongregacion){
        let ingresos={
            "nombre": "INGRESOS",
            "descripcion": "TOTAL DE INGRESOS",
            "total": 0,
            "codigoCongregacion": idCongregacion
        }
        let egresos={
            "nombre": "EGRESOS",
            "descripcion": "TOTAL DE EGRESOS",
            "total": 0,
            "codigoCongregacion": idCongregacion
        }
        let misiones={
            "nombre": "MISIONES",
            "descripcion": "TOTAL DE INGRESOS PARA MISIONES",
            "total": 0,
            "codigoCongregacion": idCongregacion
        }
        let diezmos={
            "nombre": "DIEZMOS",
            "descripcion": "TOTAL DE INGRESOS POR DIEZMOS",
            "total": 0,
            "codigoCongregacion": idCongregacion
        }
    const reg1 = await models.Modelo_Cartera.create(egresos);
    const reg2 = await models.Modelo_Cartera.create(ingresos);
    const reg3 = await models.Modelo_Cartera.create(misiones);
    const reg4 = await models.Modelo_Cartera.create(diezmos);

}

async function eliminarCarteras(idCongregacion) {

    const resultado1=await models.Modelo_Cartera.findOne({$and:[{nombre:"INGRESOS"},{codigoCongregacion:idCongregacion}]});
    const reg1= await models.Modelo_Cartera.findByIdAndDelete({_id:resultado._id});
    const resultado2=await models.Modelo_Cartera.findOne({$and:[{nombre:"MISIONES"},{codigoCongregacion:idCongregacion}]});
    const reg2 = await models.Modelo_Cartera.findByIdAndDelete({_id:resultado._id});
    const resultado3=await models.Modelo_Cartera.findOne({$and:[{nombre:"EGRESOS"},{codigoCongregacion:idCongregacion}]});
    const reg3 = await models.Modelo_Cartera.findByIdAndDelete({_id:resultado._id});
    const resultado4=await models.Modelo_Cartera.findOne({$and:[{nombre:"DIEZMOS"},{codigoCongregacion:idCongregacion}]});
    const reg4 = await models.Modelo_Cartera.findByIdAndDelete({_id:resultado._id});
}


export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Modelo_Congregacion.create(req.body);
            crearCarteras(reg._id);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error al intentar agregar Congregacion.'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            models.Modelo_Congregacion.findOne({_id:req.query._id})
            .populate([
                {path:'codigoMiembro', model:'membresia'}
            ]).exec(function (err,Resultado) {
                    if(err)  
                    return res.status(500).send({
                        message:'Ocurrió un error: '+err
                        });
                    if(Resultado){
                     res.status(200).send(Resultado);    
                    }
                }) 
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al buscar el registro de Congregacion.'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            models.Modelo_Congregacion.find(/*{$and:[]}*/)
            .populate([
                {path:'codigoMiembro', model:'membresia'},
                {path:'codigoMadre', model:'congregacion'}
            ]).sort({'createdAt':-1})
            .exec(function (err,Resultado) {
                    if(err)  
                    return res.status(500).send({
                        message:'Ocurrió un error: '+err
                        });
                    if(Resultado){
                     res.status(200).send(Resultado);    
                    }
                }) 
           
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar los Congregacions.'
            });
            next(e);
        }
    },
    listmadre: async (req,res,next) => {
        try {
            models.Modelo_Congregacion.find({tipocongregacion:'MADRE'})
            .populate([
                {path:'codigoMiembro', model:'membresia'}
            ]).sort({'createdAt':-1})
            .exec(function (err,Resultado) {
                    if(err)  
                    return res.status(500).send({
                        message:'Ocurrió un error: '+err
                        });
                    if(Resultado){
                     res.status(200).send(Resultado);    
                    }
                }) 
           
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar los Congregacions.'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {         
            const reg = await models.Modelo_Congregacion.findByIdAndUpdate({_id:req.body._id},
                {descripcion:req.body.descripcion,
                tipocongregacion:req.body.tipocongregacion,
                abreviatura:req.body.abreviatura,
                direccion:req.body.direccion,
                parroquia:req.body.parroquia,
                ciudad:req.body.ciudad,
                provincia:req.body.provincia,
                codigoMiembro:req.body.codigoMiembro,
                codigoMadre:req.body.codigoMadre}
                
                )
                    
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al actualizar el Congregacion.'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Congregacion.findByIdAndDelete({_id:req.query._id});
            eliminarCarteras(reg._id);
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar eliminar el Congregacion.'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Congregacion.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar activar el Congregacion.'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Modelo_Congregacion.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar desactivar el Congregacion.'
            });
            next(e);
        }
    }
}
