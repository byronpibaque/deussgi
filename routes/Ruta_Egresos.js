import routerx from 'express-promise-router';

import Controlador from '../controllers/Controlador_Egreso';


const router=routerx();



router.post('/add',Controlador.add);
router.get('/query',Controlador.query);
router.get('/list',Controlador.list);
router.get('/grafico12meses',Controlador.grafico12Meses);
router.get('/listxcongregacion',Controlador.listxcongregacion);
router.put('/update',Controlador.update);
router.delete('/remove',Controlador.remove);
router.put('/activate',Controlador.activate);
router.put('/deactivate',Controlador.deactivate);

export default router;