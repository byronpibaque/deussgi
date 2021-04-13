import models from "../models";

async function aumentarCartera(idCartera, idCongregacion, TotalC) {
  let { total } = await models.Modelo_Cartera.findOne({
    $and: [{ _id: idCartera }, { codigoCongregacion: idCongregacion }],
  });
  let aumento = parseFloat(total) + parseFloat(TotalC);
  const reg = await models.Modelo_Cartera.findByIdAndUpdate(
    { _id: idCartera },
    { total: aumento }
  );
}
async function disminuirCartera(idCartera, idCongregacion, TotalC) {
  let { total } = await models.Modelo_Cartera.findOne({
    $and: [{ _id: idCartera }, { codigoCongregacion: idCongregacion }],
  });
  let aumento = parseFloat(total) - parseFloat(TotalC);
  const reg = await models.Modelo_Cartera.findByIdAndUpdate(
    { _id: idCartera },
    { total: aumento }
  );
}

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Modelo_Ingreso.create(req.body);

      let codigoCongregacion = req.body.codigoCongregacion;
      let ofrendaMisionera = req.body.ofrendaMisionera;
      let ofrenda = req.body.ofrenda;
      let ofrendaEspecial = req.body.ofrendaEspecial;
      let ofrendaPrimicias = req.body.ofrendaPrimicias;
      let otrasofrendas = req.body.otrasofrendas;
      let diezmos = req.body.diezmos;
      let totalDiezmos = 0;
      if (diezmos.length != 0) {
        diezmos.map(function (x) {
          totalDiezmos = parseFloat(totalDiezmos) + parseFloat(x.valor);
        });
      }
      let total =
        +parseFloat(ofrenda) +
        parseFloat(ofrendaEspecial) +
        parseFloat(ofrendaPrimicias) +
        parseFloat(otrasofrendas);

      let { _id } = await models.Modelo_Cartera.findOne({
        $and: [
          { nombre: "INGRESOS" },
          { codigoCongregacion: codigoCongregacion },
        ],
      });

      aumentarCartera(_id, codigoCongregacion, total);

      if (ofrendaMisionera) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "MISIONES" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        aumentarCartera(_id, codigoCongregacion, ofrendaMisionera);
      }

      if (totalDiezmos) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "DIEZMOS" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        aumentarCartera(_id, codigoCongregacion, totalDiezmos);
      }

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar agregar Rol.",
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Modelo_Ingreso.findOne({
        _id: req.query._id,
      }).populate([
        { path: "codigoUsuario", model: "usuario" },
        { path: "codigoCongregacion", model: "congregacion" },
      ]);
      if (!reg) {
        res.status(404).send({
          message: "El registro no existe.",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al buscar el registro de Rol.",
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Modelo_Ingreso.find(/*{$and:[]}*/)
        .populate([
          { path: "codigoUsuario", model: "usuario" },
          { path: "codigoCongregacion", model: "congregacion" },
        ])
        .sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar listar los Roles.",
      });
      next(e);
    }
  },
  listxcongregacion: async (req, res, next) => {
    try {
      let valor = req.query.codigoCongregacion;
      const reg = await models.Modelo_Ingreso.find({
        $and: [{ codigoCongregacion: valor }],
      })
        .populate([
          { path: "codigoUsuario", model: "usuario" },
          { path: "codigoCongregacion", model: "congregacion" },
        ])
        .sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar listar los Roles.",
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Modelo_Ingreso.findByIdAndUpdate(
        { _id: req.body._id },
        { descripcion: req.body.descripcion }
      );

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al actualizar el Rol.",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Modelo_Ingreso.findByIdAndDelete({
        _id: req.query._id,
      });
      let codigoCongregacion = reg.codigoCongregacion;
      let ofrendaMisionera = reg.ofrendaMisionera;
      let ofrenda = reg.ofrenda;
      let ofrendaEspecial = reg.ofrendaEspecial;
      let ofrendaPrimicias = reg.ofrendaPrimicias;
      let otrasofrendas = reg.otrasofrendas;
      let diezmos = reg.diezmos;
      let totalDiezmos = 0;
      if (diezmos.length != 0) {
        diezmos.map(function (x) {
          totalDiezmos = parseFloat(totalDiezmos) + parseFloat(x.valor);
        });
      }
      let total =
        +parseFloat(ofrenda) +
        parseFloat(ofrendaEspecial) +
        parseFloat(ofrendaPrimicias) +
        parseFloat(otrasofrendas);

      let { _id } = await models.Modelo_Cartera.findOne({
        $and: [
          { nombre: "INGRESOS" },
          { codigoCongregacion: codigoCongregacion },
        ],
      });

      disminuirCartera(_id, codigoCongregacion, total);

      if (ofrendaMisionera) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "MISIONES" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        disminuirCartera(_id, codigoCongregacion, ofrendaMisionera);
      }

      if (totalDiezmos) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "DIEZMOS" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        disminuirCartera(_id, codigoCongregacion, totalDiezmos);
      }

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar eliminar el Rol.",
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Modelo_Ingreso.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      let codigoCongregacion = reg.codigoCongregacion;
      let ofrendaMisionera = reg.ofrendaMisionera;
      let ofrenda = reg.ofrenda;
      let ofrendaEspecial = reg.ofrendaEspecial;
      let ofrendaPrimicias = reg.ofrendaPrimicias;
      let otrasofrendas = reg.otrasofrendas;
      let diezmos = reg.diezmos;
      let totalDiezmos = 0;
      if (diezmos.length != 0) {
        diezmos.map(function (x) {
          totalDiezmos = parseFloat(totalDiezmos) + parseFloat(x.valor);
        });
      }
      let total =
        +parseFloat(ofrenda) +
        parseFloat(ofrendaEspecial) +
        parseFloat(ofrendaPrimicias) +
        parseFloat(otrasofrendas);

      let { _id } = await models.Modelo_Cartera.findOne({
        $and: [
          { nombre: "INGRESOS" },
          { codigoCongregacion: codigoCongregacion },
        ],
      });

      aumentarCartera(_id, codigoCongregacion, total);

      if (ofrendaMisionera) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "MISIONES" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        aumentarCartera(_id, codigoCongregacion, ofrendaMisionera);
      }
      if (totalDiezmos) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "DIEZMOS" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        aumentarCartera(_id, codigoCongregacion, totalDiezmos);
      }

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar activar el Rol.",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Modelo_Ingreso.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      let codigoCongregacion = reg.codigoCongregacion;
      let ofrendaMisionera = reg.ofrendaMisionera;
      let ofrenda = reg.ofrenda;
      let ofrendaEspecial = reg.ofrendaEspecial;
      let ofrendaPrimicias = reg.ofrendaPrimicias;
      let otrasofrendas = reg.otrasofrendas;
      let diezmos = reg.diezmos;
      let totalDiezmos = 0;
      if (diezmos.length != 0) {
        diezmos.map(function (x) {
          totalDiezmos = parseFloat(totalDiezmos) + parseFloat(x.valor);
        });
      }
      let total =
        +parseFloat(ofrenda) +
        parseFloat(ofrendaEspecial) +
        parseFloat(ofrendaPrimicias) +
        parseFloat(otrasofrendas);
      let { _id } = await models.Modelo_Cartera.findOne({
        $and: [
          { nombre: "INGRESOS" },
          { codigoCongregacion: codigoCongregacion },
        ],
      });
      disminuirCartera(_id, codigoCongregacion, total);

      if (ofrendaMisionera) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "MISIONES" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        disminuirCartera(_id, codigoCongregacion, ofrendaMisionera);
      }
      if (totalDiezmos) {
        let { _id } = await models.Modelo_Cartera.findOne({
          $and: [
            { nombre: "DIEZMOS" },
            { codigoCongregacion: codigoCongregacion },
          ],
        });
        disminuirCartera(_id, codigoCongregacion, totalDiezmos);
      }

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar desactivar el Rol.",
      });
      next(e);
    }
  },
  grafico12Meses: async (req, res, next) => {
    //GRAFICO DE 12 MESES DE OFRENDA MISIONERA
    try {
      const reg = await models.Modelo_Ingreso.aggregate([
        { $match: { $and: [{ estado: 1 }] } },
        {
          $group: {
            _id: {
              mes:{$month:"$createdAt"},
              year:{$year: "$createdAt"},
              codigo: "$codigoCongregacion",
            },
            total: { $sum: "$ofrendaMisionera" },
            numero: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.mes": -1,
          },
        },
      ]).limit(12);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  grafico12MesesI: async (req, res, next) => {
    //GRAFICO DE 12 MESES DE INGRESOS
    try {
      const reg = await models.Modelo_Ingreso.aggregate([
        { $match: { $and: [{ estado: 1 }] } },

        {
          $group: {
            _id: {
              mes:{$month:"$createdAt"},
              year:{$year: "$createdAt"},
              codigo: "$codigoCongregacion",
              },
              total : {$sum:{$add : ["$ofrenda", "$ofrendaEspecial", "$ofrendaPrimicias","$otrasofrendas"]}},
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.mes": -1,
          },
        },
      ]).limit(12);
     
    
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  grafico12MesesD: async (req, res, next) => {
    //GRAFICO DE 12 MESES DE INGRESOS por diezmos
    try {
      const reg = await models.Modelo_Ingreso.aggregate([
        { $match: { $and: [{ estado: 1 }] } },
        { $unwind: "$diezmos" },
        {
          $group: {
            _id: {
              mes:{$month:"$createdAt"},
              year:{$year: "$createdAt"},
              codigo: "$codigoCongregacion",
            },
            diezmos: { $sum: "$diezmos.valor" },
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
      reg.forEach((element) => {
        if (element._id.codigo == req.query.codigoCongregacion) {
          suma = parseFloat(suma) + parseFloat(element.diezmos);
          arry = 
            {
              _id: {
                mes: element._id.mes,
                year: element._id.year,
                codigo: element._id.codigo,
              },
              total: suma,
            }
            arr.push(arry)
        }

      });

      res.status(200).json(arr);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  calcularPorcentaje: async (req, res, next) => {
    try {
      const start = req.query.start;
      const end = req.query.end;

      const reg = await models.Modelo_Ingreso.find({
        $and: [
          { codigoCongregacion: req.query.codigoCongregacion },
           { createdAt: { $gte: start, $lte: end } }
        ],
      })
        .populate([
          { path: "codigoUsuario", model: "usuario", select: "nombres" },
          {
            path: "codigoCongregacion",
            model: "congregacion",
            select: "abreviatura",
          },
        ])
        .sort({ createdAt: -1 });
        
       
      let sumDiezmos = 0.0;
      let sumOfrendas = 0.0;

      reg.forEach((element) => {

          for (let index = 0; index < element.diezmos.length; index++) {
            sumDiezmos = sumDiezmos + parseFloat(element.diezmos[index].valor);
          }
  
          sumOfrendas = sumOfrendas + parseFloat(element.ofrenda);
         

       
      });

      let tresporciento = parseFloat(sumDiezmos) * 0.03;

      let diezmoMenosPorcentaje =
        parseFloat(sumDiezmos.toFixed(2)) -
        parseFloat(tresporciento.toFixed(2));

      let ofrendasmasdiezmos=parseFloat(diezmoMenosPorcentaje.toFixed(2)) + parseFloat(sumOfrendas.toFixed(2))
      let diezporciento =
        (parseFloat(diezmoMenosPorcentaje.toFixed(2)) + parseFloat(sumOfrendas.toFixed(2))) * 0.1;

       const respuesta = {
            "totaldiezmos":sumDiezmos.toFixed(2),
            "totalofrendas":sumOfrendas.toFixed(2),
            "ofrendasmenosdiezmos":ofrendasmasdiezmos.toFixed(2),
            "diezmomenosporcentaje":diezmoMenosPorcentaje.toFixed(2),
            "tresporciento":tresporciento.toFixed(2),
            "diezporciento":diezporciento.toFixed(2)
          }
      res.status(200).json(respuesta);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar listar los Roles.",
      });
      next(e);
    }
  },
  filtarporfechas: async (req, res, next) => {
    try {
      const start = req.query.start;
      const end = req.query.end;
    
      const reg = await models.Modelo_Ingreso.find({
        $and: [
          { codigoCongregacion: req.query.codigoCongregacion },
           { createdAt: { $gte: start, $lte: end } },
        ],
      })
        .populate([
          { path: "codigoUsuario", model: "usuario", select: "nombres" },
          { path: "codigoCongregacion", model: "congregacion",select: "abreviatura"},
        ])
        .sort({ createdAt: -1 });
        
       res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error al intentar listar.",
      });
      next(e);
    }
  },
};
