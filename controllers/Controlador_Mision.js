import models from '../models';

async function aumentarCartera(idCartera,idCongregacion,TotalC){

    let {total}=await models.Modelo_Cartera.findOne({$and:[{_id:idCartera},{codigoCongregacion:idCongregacion}]});
    let aumento = parseFloat(total)+parseFloat(TotalC)
    const reg=await models.Modelo_Cartera.findByIdAndUpdate({_id:idCartera},{total:aumento});

}
async function disminuirCartera(idCartera,idCongregacion,TotalC){

    let {total}=await models.Modelo_Cartera.findOne({$and:[{_id:idCartera},{codigoCongregacion:idCongregacion}]});
    let aumento = parseFloat(total)-parseFloat(TotalC)
    const reg=await models.Modelo_Cartera.findByIdAndUpdate({_id:idCartera},{total:aumento});

}


export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Modelo_Mision.create(req.body);
           
            let codigoCongregacion = req.body.codigoCongregacion
            let valor=req.body.valor
            let total=parseFloat(valor)
        
      

          
                let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"MISIONES"},{codigoCongregacion:codigoCongregacion}]});
                aumentarCartera(_id,codigoCongregacion,total);
      


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
            const reg=await models.Modelo_Mision.findOne({_id:req.query._id})
            .populate([
                {path:'codigoUsuario', model:'usuario'},
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
                message:'Ocurrió un error al buscar el registro de Rol.'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Modelo_Mision.find(/*{$and:[]}*/)
            .populate([
                {path:'codigoUsuario', model:'usuario'},
                {path:'codigoCongregacion', model:'congregacion'}
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
    listxcongregacion: async (req,res,next) => {
        try {
            let valor=req.query.codigoCongregacion;
            const reg=await models.Modelo_Mision.find({$and:[{codigoCongregacion:valor}]})
            .populate([
                {path:'codigoUsuario', model:'usuario'},
                {path:'codigoCongregacion', model:'congregacion'}
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
        try {         
            const reg = await models.Modelo_Mision.findByIdAndUpdate({_id:req.body._id},
                {descripcion:req.body.descripcion});
                    
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al actualizar el Rol.'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Mision.findByIdAndDelete({_id:req.query._id});
            let codigoCongregacion = reg.codigoCongregacion
            let valor=reg.valor
           
            let total=parseFloat(valor)
           
                let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"MISIONES"},{codigoCongregacion:codigoCongregacion}]});
                disminuirCartera(_id,codigoCongregacion,total);
            
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar eliminar el Rol.'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Modelo_Mision.findByIdAndUpdate({_id:req.body._id},{estado:1});
            let codigoCongregacion = reg.codigoCongregacion
            let valor=reg.valor
            
            let total=parseFloat(valor)

                let {_id}=await models.Modelo_Cartera.findOne({$and:[{nombre:"MISIONES"},{codigoCongregacion:codigoCongregacion}]});
                aumentarCartera(_id,codigoCongregacion,total);
            
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
            const reg = await models.Modelo_Mision.findByIdAndUpdate({_id:req.body._id},{estado:0});
            let codigoCongregacion = reg.codigoCongregacion
            let valor=reg.valor
            
            let total=
            parseFloat(valor)
         
                disminuirCartera("idMisiones",codigoCongregacion,total);
            
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar desactivar el Rol.'
            });
            next(e);
        }
    }, grafico12Meses:async(req,res,next) =>{//GRAFICO DE 12 MESES DE MISIONES
        try {
           
          
                const reg=await models.Modelo_Mision.aggregate(
                    [{$match:{$and:[{estado:1}]}},
                        {
                            $group:{
                                _id: {
                                    mes:{$month:"$createdAt"},
                                    year:{$year: "$createdAt"},
                                    codigo: "$codigoCongregacion",
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
