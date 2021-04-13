
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
    fecha:{type:String},
    numeroRegistro:{type:String, maxlength:13,required:true},
    diezmos:[{
        valor:{ type:Number},
        codigoMiembro:{type: Schema.ObjectId, ref:'membresia'},
        nombres:{type:String}
    }],
    ofrendaEspecial:{type:Number},
    ofrenda:{type:Number},
    ofrendaMisionera:{type:Number},
    ofrendaPrimicias:{type:Number},
    otrasofrendas:{type:Number},
    codigoCongregacion: {type: Schema.ObjectId, ref:'congregacion'},
    codigoUsuario: {type: Schema.ObjectId, ref:'usuario'},
    estado: {type:Number,default:1},
    createdAt: { type: Date, default: Date.now }
});

const Ingreso = mongoose.model('ingreso',Esquema);

export default Ingreso;
