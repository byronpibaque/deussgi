import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    numeroRegistro:{type:String},
    valores:[{
        totaldiezmos:{ type:Number},
        tresporciento:{ type:Number},
        diezmosmenos3:{ type:Number},
        totalofrendas:{ type:Number},
        ofrendasmasdiezmosmenos3:{ type:Number},
        diezporciento:{ type:Number},
            }],
    codigoUsuario: {type: Schema.ObjectId, ref:'usuario'},
    codigoCongregacionE: {type: Schema.ObjectId, ref:'congregacion'},
    codigoCongregacionR: {type: Schema.ObjectId, ref:'congregacion'},
    estado: {type:Number,default:0},
    createdAt: { type: Date, default: Date.now }
});

const Porcentaje = mongoose.model('porcentaje',Esquema);

export default Porcentaje;