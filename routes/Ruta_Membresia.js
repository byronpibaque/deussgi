import routerx from 'express-promise-router';

import Controlador_Membresia from '../controllers/Controlador_Membresia';


const router=routerx();



router.post('/add',Controlador_Membresia.add);
router.get('/query',Controlador_Membresia.query);
router.get('/list',Controlador_Membresia.list);
router.get('/listxcongregacion',Controlador_Membresia.listxcongregacion);
router.put('/update',Controlador_Membresia.update);
router.delete('/remove',Controlador_Membresia.remove);
router.put('/activate',Controlador_Membresia.activate);
router.put('/deactivate',Controlador_Membresia.deactivate);

export default router;