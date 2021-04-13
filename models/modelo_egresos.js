
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    numeroRegistro:{type:String, maxlength:13,required:true},
    descripcion:{type:String, maxlength:200},
    valor:{type:Number},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    codigoMembresia: {type: Schema.ObjectId, ref:'membresia'},
    codigoUsuario: {type: Schema.ObjectId, ref:'usuario'},
    estado: {type:Number,default:1},
    createdAt: { type: Date, default: Date.now }
});

const Egreso = mongoose.model('egreso',Esquema);

export default Egreso;
