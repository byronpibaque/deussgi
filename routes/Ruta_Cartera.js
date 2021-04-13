import routerx from 'express-promise-router';

import Controlador_Cartera from '../controllers/Controlador_Cartera';


const router=routerx();



router.post('/add',Controlador_Cartera.add);
router.get('/query',Controlador_Cartera.query);
router.get('/list',Controlador_Cartera.list);
router.get('/listxcongregacion',Controlador_Cartera.listxcongregacion);
router.get('/listxcode',Controlador_Cartera.listxcode);
router.put('/update',Controlador_Cartera.update);
router.delete('/remove',Controlador_Cartera.remove);
router.put('/activate',Controlador_Cartera.activate);
router.put('/deactivate',Controlador_Cartera.deactivate);

export default router;