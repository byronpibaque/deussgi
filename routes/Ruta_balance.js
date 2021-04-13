import routerx from 'express-promise-router';

import Controlador from '../controllers/Controlador_balances';


const router=routerx();


router.get('/balanceporfecha',Controlador.balancexfecha);


export default router;