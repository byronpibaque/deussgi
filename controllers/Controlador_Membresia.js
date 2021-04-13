import models from '../models';
export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Modelo_Membresia.create(req.body);
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
            models.Modelo_Membresia.findOne({_id:req.query._id})
            .populate([
                {path:'codigoCargo', model:'cargo'},
                {path:'codigoCongregacion', model:'congregacion'}
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
            models.Modelo_Membresia.find(/*{$and:[]}*/)
            .populate([
                {path:'codigoCargo', model:'cargo'},
                {path:'codigoCongregacion', model:'congregacion'}
            ]).sort({'nombres':1})
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
    listxcongregacion: async (req,res,next) => {
        try {
            models.Modelo_Membresia.find({$and:[{codigoCongregacion:req.query.codigoCongregacion}]})
            .populate([
                {path:'codigoCargo', model:'cargo'},
                {path:'codigoCongregacion', model:'congregacion'}
            ]).sort({'nombres':1})
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
            const reg = await models.Modelo_Membresia.findByIdAndUpdate({_id:req.body._id},
                {
                stt:req.body.stt,
                nombres:req.body.nombres,
                cedula:req.body.cedula,
                direccion:req.body.direccion,
                ciudad:req.body.ciudad,
                provincia:req.body.provincia,
                parroquia:req.body.parroquia,
                telefono:req.body.telefono,
                correo:req.body.correo,
                sexo:req.body.sexo,
                codigoCargo: req.body.codigoCargo,
                codigoCongregacion: req.body.codigoCongregacion},
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
            const reg = await models.Modelo_Membresia.findByIdAndDelete({_id:req.query._id});
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
            const reg = await models.Modelo_Membresia.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
            const reg = await models.Modelo_Membresia.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar desactivar el Congregacion.'
            });
            next(e);
        }
    }
}
