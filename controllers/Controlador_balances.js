import models from '../models';
const mongoose = require("mongoose");
import moment, { now } from "moment";


export default{
    balancexfecha: async (req,res,next) => {
        try {
            let codigoCongregacion=req.query.codigoCongregacion;
            let start = req.query.fechainicio
            let end = req.query.fechafin

            const resultadoIngresos=await models.Modelo_Ingreso
            .find({
                $and: [
                    {estado:1},
                    { codigoCongregacion: codigoCongregacion },
                    { createdAt: { $gte: start, $lte: end } },
                    ],
                })
                .populate([
                { path: "codigoUsuario", model: "usuario", select: "nombres" },
                { path: "codigoCongregacion", model: "congregacion",select: "abreviatura"},
                ])
                .sort({ createdAt: -1 });


            const resultadoEgresos=await models.Modelo_Egreso
            .find({
                $and: [
                    {estado:1},
                    { codigoCongregacion: codigoCongregacion },
                    { createdAt: { $gte: start, $lte: end } },
                ],
                })
                .populate([
                    { path: "codigoUsuario", model: "usuario", select: "nombres" },
                    { path: "codigoCongregacion", model: "congregacion",select: "abreviatura"},
                ])
                .sort({ createdAt: -1 });
                   
                      let congregacion = ""
                      let array=[]
                      let datos=[]
                      let datosE=[]
                      let sumaDiez=0.0
                      let total=0.0
                      let egreso=0.0
                      let totalingresos=0.0
                      let totalegresos=0.0

                      resultadoEgresos.forEach(x => {
                        congregacion = x.codigoCongregacion.abreviatura
                          egreso=parseFloat(x.valor)
                          datosE={
                            fecha:x.createdAt,
                            concepto:"egreso",
                            descripcion:x.descripcion,
                            egreso:x.valor
                        }
                        totalegresos=parseFloat(egreso)+totalegresos
                        array.push(datosE)
                          });

                    

                   

                      resultadoIngresos.forEach(x => {
                         let val=0.0

                        x.diezmos.forEach(y => {
                            val=parseFloat(y.valor)+val
                            sumaDiez=parseFloat(y.valor)+sumaDiez
                        }); 
                       
                        
                        total=parseFloat(x.ofrenda)+parseFloat(x.ofrendaEspecial)+parseFloat(x.ofrendaPrimicias)+parseFloat(x.otrasofrendas)
                          datos={
                              fecha:x.createdAt,
                              concepto:"ingreso",
                              ofrenda:total,
                              diezmos:val
                          }
                          totalingresos=parseFloat(total)+parseFloat(sumaDiez)
                          array.push(datos)
                      });

                      let totales = {
                          congregacion:congregacion,
                          ingresosTotal:totalingresos,
                          egresosTotal:totalegresos,
                          saldo:totalingresos-totalegresos
                      }
                     
                      let val = [{movimientos:array.sort((a, b) => a.fecha - b.fecha)},{totales}]  
                     
                      res.status(200).json(val);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error al intentar listar.'
            });
            next(e);
        }
    },
}