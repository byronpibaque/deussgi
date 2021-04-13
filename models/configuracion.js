
import mongoose,{Schema} from 'mongoose';
import moment from "moment";

const Esquema = new Schema({
        configuracion:[{
                codigoConfiguracion:{type:Schema.ObjectID,default: mongoose.Types.ObjectId()},
                descripcion:{type:String},
                    valores:[{
                        val:{type:String},
                        descripcion:{type:String},
                    }],
                estado:{type:Number,default:1},
                createdAt: { type: Date, default: Date.now }
        }]
});

const Logs = mongoose.model('logs',Esquema);

export default Logs;
