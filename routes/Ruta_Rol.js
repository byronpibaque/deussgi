import routerx from 'express-promise-router';

import Controlador_Rol from '../controllers/Controlador_Rol';


const router=routerx();



router.post('/add',Controlador_Rol.add);
router.get('/query',Controlador_Rol.query);
router.get('/list',Controlador_Rol.list);
router.put('/update',Controlador_Rol.update);
router.delete('/remove',Controlador_Rol.remove);
router.put('/activate',Controlador_Rol.activate);
router.put('/deactivate',Controlador_Rol.deactivate);

export default router;