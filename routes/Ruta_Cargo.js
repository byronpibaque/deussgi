import routerx from 'express-promise-router';

import Controlador_Cargo from '../controllers/Controlador_Cargo';


const router=routerx();



router.post('/add',Controlador_Cargo.add);
router.get('/query',Controlador_Cargo.query);
router.get('/list',Controlador_Cargo.list);
router.put('/update',Controlador_Cargo.update);
router.delete('/remove',Controlador_Cargo.remove);
router.put('/activate',Controlador_Cargo.activate);
router.put('/deactivate',Controlador_Cargo.deactivate);

export default router;