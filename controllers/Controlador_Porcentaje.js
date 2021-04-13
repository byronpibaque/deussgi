import models from '../models';
const mongoose = require("mongoose");

async function verificarDinero(codigoCongregacion,tresporciento,diezporciento,idRegistro,codigoCongregacionR){


    let Cingresos=await models.Modelo_Cartera.findOne({$and:[{nombre:"INGRESOS"},{codigoCongregacion:codigoCongregacion}]});//INGRESOS
    let Cdiezmos=await models.Modelo_Cartera.findOne({$and:[{nombre:"DIEZMOS"},{codigoCongregacion:codigoCongregacion}]});//DIEZMOS
    let Cporcentaje = await models.Modelo_Cartera.findOne({$and:[{nombre:"PORCENTAJE"},{codigoCongregacion:codigoCongregacionR}]});

    if(parseFloat(Cdiezmos.total)>=parseFloat(tresporciento) && parseFloat(Cingresos.total)>=parseFloat(diezporciento) ){//50 - 35
      
        const reg = await models.Modelo_porcentaje.findByIdAndUpdate({_id:idRegistro},{estado:1}).then(async(result) => {
            
            
                   if(result){
                    let valores = result.valores
                    let tres,diez=0.0
                    valores.map(function (x) {
                        tres=x.tresporciento
                        diez=x.diezporciento
                    })
               
                    let TotalcarteraD = Cdiezmos.total
                    let TotalcarteraI = Cingresos.total
                    let TotalcarteraP = Cporcentaje.total
                    let resultadoCD = parseFloat(TotalcarteraD)-parseFloat(tres)
                    let resultadoCI = parseFloat(TotalcarteraI)-parseFloat(diez)
                    let resultadoCP = parseFloat(TotalcarteraP)+parseFloat(tres)
                   const regCD = await models.Modelo_Cartera.findByIdAndUpdate({_id:Cdiezmos._id},{total:resultadoCD}).then(async (result) => {
                      
                        const refCI = await models.Modelo_Cartera.findByIdAndUpdate({_id:Cingresos._id},{total:resultadoCI}).then(async (result) => {
                            const regCP = await models.Modelo_Cartera.findByIdAndUpdate({_id:Cporcentaje._id},{total:resultadoCP}).then(async(result) => {
                                return true
                            }).catch((err) => {
                                console.log('Hubo un error al actualizar Cartera Porcentaje'+err);
                                return false
                            });
                           
                            
                        }).catch((err) => {
                            console.log('Hubo un error al actualizar Cartera Ingresos'+err);
                            return false
                       
                        });
                     
                       
                   }).catch((err) => {
                       console.log('Hubo un error al actualizar Cartera Diezmos'+err);
                       return false
                       
                   });
                
            }else{
                console.log('Hubo un error al activar el registro de porcentaje '+err);
               return false
            }
            
        }).catch((err) => {
            return false
           console.log(err); 
        });
      

        
    }else if(parseFloat(Cdiezmos.total)>=parseFloat(tresporciento) && parseFloat(Cingresos.total)<=parseFloat(diezporciento)){//50 - 5000
        return false
    }else if(parseFloat(Cdiezmos.total)>=parseFloat(tresporciento) && parseFloat(Cingresos.total)>=parseFloat(diezporciento)){//1000 - 35
       return false
    }else{
       return false
    }

}

async function devolverSaldo(codigoCongregacion,tresporciento,diezporciento,idRegistro,codigoCongregacionR) {
    
    let Cingresos=await models.Modelo_Cartera.findOne({$and:[{nombre:"INGRESOS"},{codigoCongregacion:codigoCongregacion}]});//INGRESOS
    let Cdiezmos=await models.Modelo_Cartera.findOne({$and:[{nombre:"DIEZMOS"},{codigoCongregacion:codigoCongregacion}]});//DIEZMOS
    let Cporcentaje=await models.Modelo_Cartera.findOne({$and:[{nombre:"PORCENTAJE"},{codigoCongregacion:codigoCongregacionR}]});//PORCENTAJE
    
    const reg = await models.Modelo_porcentaje.findByIdAndUpdate({_id:idRegistro},{estado:0}).then(async(result) => {
        let TotalcarteraD = Cdiezmos.total
        let TotalcarteraI = Cingresos.total
        let TotalcarteraP = Cporcentaje.total
        let resultadoCD = parseFloat(TotalcarteraD)+parseFloat(tresporciento)
        let resultadoCI = parseFloat(TotalcarteraI)+parseFloat(diezporciento)
        let resultadoCP = parseFloat(TotalcarteraP)-parseFloat(tresporciento)
        const regCD = await  models.Modelo_Cartera.findByIdAndUpdate({_id:Cdiezmos._id},{total:resultadoCD}).then(async(result) => {
            const regCI = await models.Modelo_Cartera.findByIdAndUpdate({_id:Cingresos._id},{total:resultadoCI}).then(async(result) => {
                const regCP = await models.Modelo_Cartera.findByIdAndUpdate({_id:Cporcentaje._id},{total:resultadoCP}).then(async(result) => {
                    return true
                }).catch((err) => {
                    console.log('Hubo problemas al devolver el valor de Cartera Porcentaje');
                    return false
                });
              
            }).catch((err) => {
                console.log('Hubo problemas al devolver el valor de Cartera ingreso');
                return false
            });
        }).catch((err) => {
            console.log('Hubo problemas al devolver el valor de Cartera diezmos');
            return false
            
        });
      
        
    }).catch((err) => {
        console.log('Hubo un error al desactivar el registro de porcentaje '+err);
        return false
    });
      
           
                           
   
}
function paddy(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
}

export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Modelo_porcentaje.create(req.body);
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
            const reg=await models.Modelo_porcentaje.findOne({_id:req.query._id});
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
            let codigoCongregacionR=req.query.codigoCongregacionR;
            const reg=await models.Modelo_porcentaje
                .find({$and:[{codigoCongregacionR:codigoCongregacionR}]})
            .populate([{ path: "codigoUsuario", model: "usuario" },
                {path:'codigoCongregacionR', model:'congregacion'},
                {path:'codigoCongregacionE', model:'congregacion'}])
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar los Cargos.'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {         
            const reg = await models.Modelo_porcentaje.findByIdAndUpdate({_id:req.body._id},
                {descripcion:req.body.descripcion,
                abreviatura:req.body.abreviatura});
                    
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
            const reg = await models.Modelo_porcentaje.findByIdAndDelete({_id:req.query._id});
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
            let registro=req.body.registro
            let tres=0
            let diez=0
            const verifexiste = await models.Modelo_Cartera.findOne({$and:[{codigoCongregacion:registro.codigoCongregacionR._id},{nombre:'PORCENTAJE'}]})
            if(verifexiste==null){
                const crear = await models.Modelo_Cartera.create(
                    {
                        nombre:"PORCENTAJE",
                        descripcion:"CARTERA DE TRES PORCIENTO",
                        total:0,
                        codigoCongregacion: registro.codigoCongregacionR._id,
                    }
                )
            }
      
            for (let i = 0; i < registro.valores.length; i++) {
                const element = registro.valores[i]
                tres=element.tresporciento
                diez=element.diezporciento
            }
            verificarDinero(registro.codigoCongregacionE._id,tres,diez,req.body._id,registro.codigoCongregacionR._id)
                .then(resp=>{
                   
                  
                    res.status(200).json(resp);
                
                   
                   
                }).catch((err) => {
                    res.status(500).send({
                        message:'Hubo un error'
                    });
                    console.log(err);
                });

        } catch(e){
            console.log("Error en activar.. "+e);
            res.status(500).send({
                message:'Ocurrió un error al intentar activar.'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            let registro=req.body.registro
            let tres=0
            let diez=0
            for (let i = 0; i < registro.valores.length; i++) {
                const element = registro.valores[i]
                tres=element.tresporciento
                diez=element.diezporciento
            }
            
            devolverSaldo(registro.codigoCongregacionE._id,tres,diez,req.body._id,registro.codigoCongregacionR._id)
            .then((result) => {
               
                    res.status(200).json(result);
             
                
            }).catch((err) => {
                console.log("Error en desactivar.. "+err);
                res.status(500).send({
                    message:'Hubo un error'
                })
            });

            
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar desactivar el Cargo.'
            });
            next(e);
        }
    },
    contarRegistros : async (req,res,next)=> {
        try {
            const reg = await models.Modelo_porcentaje.countDocuments({codigoCongregacionE:req.query.codigoCongregacionE}
            ,function (err,count) {
                if (err){
                    console.log(err)
                }else{
                    let contadorEntero =parseInt(count)+ 1
                    res.status(200).json(paddy(parseInt(contadorEntero),9))
                }
            })

        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    grafico12Meses3: async (req, res, next) => {
        //GRAFICO DE 12 MESES DE INGRESOS por diezmos
        try {
          const reg = await models.Modelo_porcentaje.aggregate([
            { $match: { $and: [{ estado: 1 },{codigoCongregacionE:new mongoose.Types.ObjectId(req.query.codigoCongregacion)}] } },
            { $unwind: "$valores" },
            {
              $group: {
                _id: {
                  mes:{$month:"$createdAt"},
                  year:{$year: "$createdAt"},
                  codigo: "$codigoCongregacionE",
                },
                total: { $sum: "$valores.tresporciento" },
              },
            },
            {
              $sort: {
                "_id.year": -1,
                "_id.mes": -1,
              },
            },
          ]).limit(12);
    
          let suma = 0;
          let arry = {};
          let arr = []

         
    
          res.status(200).json(reg);
        } catch (e) {
          res.status(500).send({
            message: "Ocurrió un error",
          });
          next(e);
        }
      },
}
