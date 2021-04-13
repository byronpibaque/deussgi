import routerx from 'express-promise-router';

import Controlador from '../controllers/Controlador_Ingreso';


const router=routerx();



router.post('/add',Controlador.add);
router.get('/query',Controlador.query);
router.get('/list',Controlador.list);
router.get('/calcularPorcentaje',Controlador.calcularPorcentaje);
router.get('/listxfechas',Controlador.filtarporfechas);
router.get('/listxcongregacion',Controlador.listxcongregacion);
router.put('/update',Controlador.update);
router.delete('/remove',Controlador.remove);
router.put('/activate',Controlador.activate);
router.put('/deactivate',Controlador.deactivate);
router.get('/grafico12meses',Controlador.grafico12Meses);
router.get('/grafico12mesesi',Controlador.grafico12MesesI);
router.get('/grafico12mesesd',Controlador.grafico12MesesD);


export default router;