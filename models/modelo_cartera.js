
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    nombre:{type:String, maxlength:50,required:true},
    descripcion:{type:String, maxlength:100,required:true},
    total:{type:Number,required:true},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    estado: {type:Number,default:1},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY")}
});

const Cartera = mongoose.model('cartera',Esquema);

export default Cartera;
