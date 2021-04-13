import models from '../models';


async function disminuirCartera(idCartera,idCongregacion,TotalE){//disminuir cartera de ingresos
   
    let {total,_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"INGRESOS"},{codigoCongregacion:idCongregacion}]});//INGRESOS
    const diezmos=await models.Modelo_Cartera.findOne({$and:[{nombre:"DIEZMOS"},{codigoCongregacion:idCongregacion}]});//DIEZMOS
    const resultado=await models.Modelo_Cartera.findOne({$and:[{_id:idCartera},{codigoCongregacion:idCongregacion}]});//EGRESOS
    const Log = await models.Modelos_logs.findOne({codigoCongregacion:idCongregacion})//LOGS
     
     let totalD = diezmos.total
     let _idD=diezmos._id
     let totalAcumulado=parseFloat(total)+parseFloat(totalD)

     if(parseFloat(total)>=parseFloat(TotalE))
     {//SI EL TOTAL DE INGRESOS ES MAYOR AL TOTAL A EGRESAR
        let totalCarteraEgresos = resultado.total
        let carterita = parseFloat(totalCarteraEgresos)+parseFloat(TotalE)
        let resta = parseFloat(total)-parseFloat(TotalE)
        const reg=await models.Modelo_Cartera.findByIdAndUpdate({_id:_id},{total:resta});
        const rege = await models.Modelos_logs.findByIdAndUpdate({_id:Log._id},{valorI:TotalE,valorD:0,cartera:'INGRESOS',codigoCartera:_id});
        const reg2=await models.Modelo_Cartera.findByIdAndUpdate({_id:idCartera},{total:carterita});
     }
     else if(parseFloat(totalD)>=parseFloat(TotalE))
     {//SI NO SE CUMPLE LA PRIMER CONDICION, EL TOTAL DE DIEZMOS DEBE SER MAYOR AL TOTAL A EGRESAR
        let totalCarteraEgresos = resultado.total
        let carterita = parseFloat(totalCarteraEgresos)+parseFloat(TotalE)
        let resta = parseFloat(totalD)-parseFloat(TotalE)
        const reg=await models.Modelo_Cartera.findByIdAndUpdate({_id:_idD},{total:resta});
        const rege = await models.Modelos_logs.findByIdAndUpdate({_id:Log._id},{valorD:TotalE,valorI:0,cartera:'DIEZMOS',codigoCartera:_idD});
        const reg2=await models.Modelo_Cartera.findByIdAndUpdate({_id:idCartera},{total:carterita});
     }else if(parseFloat(TotalE)<=parseFloat(totalAcumulado)){
        let totalCarteraEgresos = resultado.total
         let resta1=parseFloat(TotalE)-parseFloat(total)
         let resta2=parseFloat(totalD)-parseFloat(resta1)
         let carterita = parseFloat(totalCarteraEgresos)+parseFloat(TotalE)
         const reg=await models.Modelo_Cartera.findByIdAndUpdate({_id:_id},{total:0});
         const reg1=await models.Modelo_Cartera.findByIdAndUpdate({_id:_idD},{total:resta2});
         const rege = await models.Modelos_logs.findByIdAndUpdate({_id:Log._id},{valorD:resta1,valorI:total,cartera:'AMBOS',codigoCartera:null});
         const reg2=await models.Modelo_Cartera.findByIdAndUpdate({_id:idCartera},{total:carterita});
     }


    

}

async function aumentarCartera(idCartera,idCongregacion,TotalE){
   
    
    const resultado=await models.Modelo_Cartera.findOne({$and:[{_id:idCartera},{codigoCongregacion:idCongregacion}]});
    const logi = await models.Modelos_logs.findOne({codigoCongregacion:idCongregacion})
 
    
   
  
        
        if(logi.codigoCongregacion.equals(idCongregacion)){
            if(logi.valorI && logi.valorD){//si ambos contienen valor
                let diezmos=await models.Modelo_Cartera.findOne({$and:[{nombre:"DIEZMOS"},{codigoCongregacion:idCongregacion}]});
                let ingresos=await models.Modelo_Cartera.findOne({$and:[{nombre:"INGRESOS"},{codigoCongregacion:idCongregacion}]});
              
                let totalCarteraEgresos = resultado.total//TOTAL EGRESADO
                let carterita = parseFloat(totalCarteraEgresos)-(parseFloat(logi.valorI)+parseFloat(logi.valorD))//VALOR A ACTUALIZAR EN CARTERA EGRESOS

                let resta1 = parseFloat(diezmos.total)+parseFloat(logi.valorD)
                let resta2 = parseFloat(ingresos.total)+parseFloat(logi.valorI)

                const rege = await models.Modelos_logs.findByIdAndUpdate({_id:logi._id},{valorI:0,valorD:0,cartera:"",codigoCartera:null});//log
                const reg = await models.Modelo_Cartera.findByIdAndUpdate({_id:ingresos._id},{total:resta1});//aumentar a la cartera de ingresos
                const reg1 = await models.Modelo_Cartera.findByIdAndUpdate({_id:diezmos._id},{total:resta2});//aumentar a la cartera de diezmos
                const reg2 = await models.Modelo_Cartera.findByIdAndUpdate({_id:idCartera},{total:carterita});//egresos
            }
            
    
        }
       

    

}



export default {
        add: async (req,res,next) =>{
            try {
                const reg = await models.Modelo_Egreso.create(req.body);
                let codigoCongregacion = req.body.codigoCongregacion
                let valor=req.body.valor
                const existe = await models.Modelos_logs.findOne({codigoCongregacion:codigoCongregacion});

                if(existe==null){
                    const reg2 = await models.Modelos_logs.create({
                        valorI:0,
                        valorD:0,
                        cartera:null,
                        codigoCongregacion:codigoCongregacion,
                        codigoCartera: null
                    });
                }




                let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"EGRESOS"},{codigoCongregacion:codigoCongregacion}]});

                disminuirCartera(_id,codigoCongregacion,valor)



                res.status(200).json(reg);
            } catch (e){
                res.status(500).send({
                    message:'Ocurrió un error al intentar agregar Rol.'
                });
                next(e);
            }
        },
        query: async (req,res,next) => {
            try {
                const reg=await models.Modelo_Egreso.findOne({_id:req.query._id})
                .populate([
                    {path:'codigoUsuario', model:'usuario'},
                    {path:'codigoCongregacion', model:'congregacion'},
                    {path:'codigoMembresia', model:'membresia'}
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
                    message:'Ocurrió un error al buscar el registro de Rol.'
                });
                next(e);
            }
        },
        listxcongregacion: async (req,res,next) => {
            try {
                let valor=req.query.codigoCongregacion;
                const reg=await models.Modelo_Egreso.find({$and:[{codigoCongregacion:valor}]})
                .populate([
                    {path:'codigoUsuario', model:'usuario'},
                    {path:'codigoCongregacion', model:'congregacion'},
                    {path:'codigoMembresia', model:'membresia'}
                ])
                .sort({'createdAt':-1});
                res.status(200).json(reg);
            } catch(e){
                res.status(500).send({
                    message:'Ocurrió un error al intentar listar los Roles.'
                });
                next(e);
            }
        },
        list: async (req,res,next) => {
            try {
                let valor=req.query.valor;
                const reg=await models.Modelo_Egreso.find(/*{$and:[]}*/)
                .populate([
                    {path:'codigoUsuario', model:'usuario'},
                    {path:'codigoCongregacion', model:'congregacion'},
                    {path:'codigoMembresia', model:'membresia'}
                ])
                .sort({'createdAt':-1});
                res.status(200).json(reg);
            } catch(e){
                res.status(500).send({
                    message:'Ocurrió un error al intentar listar los Roles.'
                });
                next(e);
            }
        },
        update: async (req,res,next) => {
            // try {
            //     const reg = await models.Modelo_Egreso.findByIdAndUpdate({_id:req.body._id},
            //         {descripcion:req.body.descripcion});

            //     res.status(200).json(reg);
            // } catch(e){
            //     res.status(500).send({
            //         message:'Ocurrió un error al actualizar el Rol.'
            //     });
            //     next(e);
            // }
        },
        remove: async (req,res,next) => {
            // try {
            //     const reg = await models.Modelo_Egreso.findByIdAndDelete({_id:req.query._id});
            //     let codigoCongregacion = req.body.codigoCongregacion
            //     let valor=req.body.valor


            //     let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"EGRESOS"},{codigoCongregacion:codigoCongregacion}]});

            //     aumentarCartera(_id,codigoCongregacion,valor)


            //     res.status(200).json(reg);
            // } catch(e){
            //     res.status(500).send({
            //         message:'Ocurrió un error al intentar eliminar el Rol.'
            //     });
            //     next(e);
            // }
        },
        activate: async (req,res,next) => {
            try {

                const reg = await models.Modelo_Egreso.findByIdAndUpdate({_id:req.body._id},{estado:1});
                let codigoCongregacion = reg.codigoCongregacion
                let valor=reg.valor


                let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"EGRESOS"},{codigoCongregacion:codigoCongregacion}]});

                disminuirCartera(_id,codigoCongregacion,valor)


                res.status(200).json(reg);
            } catch(e){
                res.status(500).send({
                    message:'Ocurrió un error al intentar activar el Rol.'
                });
                next(e);
            }
        },
        deactivate:async (req,res,next) => {
            try {
                const reg = await models.Modelo_Egreso.findByIdAndUpdate({_id:req.body._id},{estado:0});
                let codigoCongregacion = reg.codigoCongregacion
                let valor=reg.valor


                 let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"EGRESOS"},{codigoCongregacion:codigoCongregacion}]});

                 aumentarCartera(_id,codigoCongregacion,valor)


                res.status(200).json(reg);
            } catch(e){
                res.status(500).send({
                    message:'Ocurrió un error al intentar desactivar el Rol.'
                });
                next(e);
            }
        },
        grafico12Meses:async(req,res,next) =>{
            try {


                    const reg=await models.Modelo_Egreso.aggregate(
                        [{$match:{$and:[{estado:1}]}},
                            {
                                $group:{
                                    _id:{
                                        mes:{$month:"$createdAt"},
                                        year:{$year: "$createdAt"},
                                        codigo:"$codigoCongregacion"
                                    },
                                    total:{$sum:"$valor"},
                                    numero:{$sum:1}
                                }
                            },
                            {
                                $sort:{
                                    "_id.year":-1,"_id.mes":-1
                                }
                            }
                        ]
                    ).limit(12);
                    res.status(200).json(reg);


            } catch(e){
                    res.status(500).send({
                        message:'Ocurrió un error'
                    });
                    next(e);
             }
        },
}
