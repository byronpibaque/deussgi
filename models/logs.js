 
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    
    valorI:{type:Number},
    valorD:{type:Number},
    cartera:{type:String},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    codigoCartera: {type: Schema.ObjectId, ref:'caretera'},
    createdAt:{type:String,default:moment().format("DD/MM/YYYY")}
});

const Logs = mongoose.model('logs',Esquema);

export default Logs;
