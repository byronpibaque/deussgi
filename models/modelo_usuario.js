
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    nombres:{type:String, maxlength:100,required:true},
    cedula:{type:String, maxlength:10},
    direccion:{type:String, maxlength:100},
    telefono:{type:String, maxlength:10},
    correo:{type:String, maxlength:50},
    usuario:{type:String, maxlength:50},
    clave:{type:String, maxlength:64},
    sexo:{type:String, maxlength:15},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    codigoRol: {type: Schema.ObjectId, ref:'rol'},
    estado: {type:Number,default:1},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY")
}
});

const Usuario = mongoose.model('usuario',Esquema);

export default Usuario;
