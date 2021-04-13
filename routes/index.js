import routerx from 'express-promise-router';

import Ruta_Rol from './Ruta_Rol';
import Ruta_Cargo from './Ruta_Cargo'
import Ruta_Congregacion from './Ruta_Congregacion'
import Ruta_Membresia from './Ruta_Membresia'
import Ruta_Usuario from './Ruta_Usuario'
import Ruta_Cartera from './Ruta_Cartera'
import Ruta_Ingresos from './Ruta_Ingresos'
import Ruta_Egresos from './Ruta_Egresos'
import Ruta_Mision from './Ruta_Misiones'
import Ruta_Porcentajes from "./Ruta_Porcentajes";
import Ruta_balances from './Ruta_balance'



const router=routerx();
router.use('/rol',Ruta_Rol)
router.use('/cargo',Ruta_Cargo)
router.use('/congregacion',Ruta_Congregacion)
router.use('/membresia',Ruta_Membresia)
router.use('/usuario',Ruta_Usuario)
router.use('/cartera',Ruta_Cartera)
router.use('/ingresos',Ruta_Ingresos)
router.use('/egresos',Ruta_Egresos)
router.use('/misiones',Ruta_Mision)
router.use('/porcentaje',Ruta_Porcentajes)
router.use('/balance',Ruta_balances)
export default router;