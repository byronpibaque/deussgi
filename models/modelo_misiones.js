
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    fecha:{type:String},
    numeroRegistro:{type:String, maxlength:13,required:true},
    descripcion:{type:String, maxlength:150},
    valor:{type:Number},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    codigoUsuario: {type: Schema.ObjectId, ref:'usuario'},
    estado: {type:Number,default:1},
    createdAt: { type: Date, default: Date.now }
});

const Mision = mongoose.model('mision',Esquema);

export default Mision;
