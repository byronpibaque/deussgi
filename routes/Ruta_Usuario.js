import routerx from 'express-promise-router';

import Controlador_Usuario from '../controllers/Controlador_Usuario';


const router=routerx();



router.post('/add',Controlador_Usuario.add);
router.get('/query',Controlador_Usuario.query);
router.get('/list',Controlador_Usuario.list);
router.put('/update',Controlador_Usuario.update);
router.delete('/remove',Controlador_Usuario.remove);
router.put('/activate',Controlador_Usuario.activate);
router.put('/deactivate',Controlador_Usuario.deactivate);
router.post('/login',Controlador_Usuario.login);

export default router;