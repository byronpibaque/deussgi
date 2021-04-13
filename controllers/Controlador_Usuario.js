import models from '../models';
// import bcryptjs from 'bcryptjs';
import token from '../services/token'

export default {
    add: async (req,res,next) =>{
        try {
            // req.body.clave=await bcryptjs.hash(req.body.clave,10);
            const reg = await models.Modelo_Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error al intentar agregar Usuario.'
            });
            next(e);
        }
    }, 
    query: async (req,res,next) => {
        try {
            models.Modelo_Usuario.findOne({_id:req.query._id})
            .populate([
                {path:'codigoRol', model:'rol',select:'descripcion'}, 
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
                message:'Ocurrió un error al buscar el registro de Usuario.'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            models.Modelo_Usuario.find(/*{$and:[]}*/)
            .populate([
                {path:'codigoRol', model:'rol',select:'descripcion'},
                {path:'codigoCongregacion', model:'congregacion'}
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
                message:'Ocurrió un error al intentar listar los Usuario.'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {         
            const reg = await models.Modelo_Usuario.findByIdAndUpdate({_id:req.body._id},
                {nombres:req.body.nombres,
                cedula:req.body.cedula,
                direccion:req.body.direccion,
                telefono:req.body.telefono,
                correo:req.body.correo,
                usuario:req.body.usuario,
                clave:req.body.clave,
                sexo:req.body.sexo,
                codigoRol: req.body.codigoRol,
                codigoCongregacion: req.body.codigoCongregacion},
                
                )
                    
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al actualizar el Usuario.'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Usuario.findByIdAndDelete({_id:req.query._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar eliminar el Usuario.'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar activar el Usuario.'
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
                message:'Ocurrió un error al intentar desactivar el Usuario.'
            });
            next(e);
        }
    },
    login:async(req,res,next)=>{
        try {
        
            let user = await models.Modelo_Usuario
            .findOne({$or:[{correo:req.body.correo},{usuario:req.body.correo}]});
            if (user) {
                
                
                // let match = await bcryptjs.compare(req.body.clave, user.clave);
                if (req.body.clave==user.clave){
                let tokenReturn = await token
                .encode(user._id,user.nombres,user.codigoRol,user.correo,user.codigoCongregacion);
                res.status(200).json({user,tokenReturn});
                
                }else{
                    res.status(404).send({
                        message:'Clave incorrecta, Verifique.'
                    });
                }
                
            }else{
                res.status(403).send({
                    message:'No existe el usuario, Registrate.'
                });
            }
            

        } catch (e) {
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
