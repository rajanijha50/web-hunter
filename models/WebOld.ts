import mongoose from "mongoose"


const WebSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    url:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    tags:{
        type: Array,
        maxlength: 5
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})
const WebOldModel = mongoose.models.websites || mongoose.model('websites', WebSchema)

export default WebOldModel