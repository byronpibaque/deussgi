
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    descripcion:{type:String, maxlength:50,unique:true,required:true},
    abreviatura:{type:String, maxlength:10},
    estado: {type:Number,default:1},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY")}
});

const Cargo = mongoose.model('cargo',Esquema);

export default Cargo;
