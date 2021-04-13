
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    descripcion:{type:String, maxlength:100,unique:true,required:true},
    abreviatura:{type:String, maxlength:25,unique:true,required:true},
    tipocongregacion:{type:String},
    direccion:{type:String, maxlength:100},
    ciudad:{type:String, maxlength:100},
    parroquia:{type:String, maxlength:100},
    provincia:{type:String, maxlength:100},
    codigoMiembro: {type: Schema.ObjectId, ref:'membresias'},
    codigoMadre: {type: Schema.ObjectId, ref:'congregacion'},
    estado: {type:Number,default:1},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY")},

});

const Congregacion = mongoose.model('congregacion',Esquema);

export default Congregacion;
