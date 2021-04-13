
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const rolSchema = new Schema({
    descripcion:{type:String, maxlength:50,unique:true,required:true},
    estado: {type:Number,default:1},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY")}
});

const Rol = mongoose.model('rol',rolSchema);

export default Rol;
