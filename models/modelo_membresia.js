
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    stt:{type:String},
    nombres:{type:String, maxlength:100,required:true},
    cedula:{type:String, maxlength:10},
    direccion:{type:String, maxlength:100},
    ciudad:{type:String,maxlength:100},
    provincia:{type:String,maxlength:100},
    parroquia:{type:String,maxlength:100},
    telefono:{type:String, maxlength:10},
    correo:{type:String, maxlength:50},
    sexo:{type:String, maxlength:15},
    codigoCargo: {type:Schema.ObjectId, ref:'cargo'},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    estado: {type:Number,default:1},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY"),
    
}
});

const Membresia = mongoose.model('membresia',Esquema);

export default Membresia;
