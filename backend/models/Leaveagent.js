import mongoose from 'mongoose'

const LeaveagentSchema = new mongoose.Schema({

    name:{type: String, required: true},
    NIC:{type: String, required: true},
    email:{type: String, required: true,unique: true},
    phone:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, required: true},
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
      },
    
})

export default mongoose.model("Leaveagent", LeaveagentSchema);