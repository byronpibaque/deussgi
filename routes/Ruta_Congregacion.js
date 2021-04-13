import routerx from 'express-promise-router';

import Controlador_Congregacion from '../controllers/Controlador_Congregacion';


const router=routerx();



router.post('/add',Controlador_Congregacion.add);
router.get('/query',Controlador_Congregacion.query);
router.get('/list',Controlador_Congregacion.list);
router.get('/listmadre',Controlador_Congregacion.listmadre);
router.put('/update',Controlador_Congregacion.update);
router.delete('/remove',Controlador_Congregacion.remove);
router.put('/activate',Controlador_Congregacion.activate);
router.put('/deactivate',Controlador_Congregacion.deactivate);

export default router;