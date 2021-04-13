import models from '../models';
export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Modelo_Cartera.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error al intentar agregar Cargo.'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Modelo_Cartera.findOne({_id:req.query._id})
            .populate([
                {path:'codigoCongregacion', model:'congregacion'}
            ])
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe.'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al buscar el registro de Cargo.'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Modelo_Cartera.find(/*{$and:[]}*/)
            .populate([
                {path:'codigoCongregacion', model:'congregacion'}
            ])
            .sort({'nombre':1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar los Cargos.'
            });
            next(e);
        }
    },
    listxcongregacion: async (req,res,next) => {
        try {
            let valor=req.query.codigoCongregacion;
            let nombre = req.query.nombre
            const reg=await models.Modelo_Cartera.find({$and:[{codigoCongregacion:valor},{nombre:nombre}]})
            .populate([
                {path:'codigoUsuario', model:'usuario'},
                {path:'codigoCongregacion', model:'congregacion'}
            ])
            .sort({'nombre':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar los Roles.'
            });
            next(e);
        }
    },
    listxcode: async (req,res,next) => {
        try {
            let valor=req.query.codigoCongregacion;
            let nombre = req.query.nombre
            const reg=await models.Modelo_Cartera.find({$and:[{codigoCongregacion:valor}]})
            .populate([
                {path:'codigoUsuario', model:'usuario'},
                {path:'codigoCongregacion', model:'congregacion'}
            ])
            .sort({'nombre':1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar los Roles.'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {         
            const reg = await models.Modelo_Cartera.findByIdAndUpdate({_id:req.body._id},
                {nombre:req.body.nombre,
                descripcion:req.body.descripcion,
                total:req.body.total,
                codigoCongregacion:req.body.codigoCongregacion})
                
                    
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al actualizar el Cargo.'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Cartera.findByIdAndDelete({_id:req.query._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar eliminar el Cargo.'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Cartera.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar activar el Cargo.'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Modelo_Cartera.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar desactivar el Cargo.'
            });
            next(e);
        }
    }
}
