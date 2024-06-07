import mongoose from "./index.js";

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
};

const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
};

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    designation:{type:String},
    role:{type:String,required:true},
    password: { type: String, required: [true, "Password is required"] },
    location: { type: String},
    gender:{type:String},
    email: { type: String, required: [true, "Email is required"], validate: { validator: validateEmail, message: "Invalid email format" } },
    mobile: { type: String, required: [true, "Mobile Number is required"], validate: { validator: validateMobile, message: "Invalid mobile number" } },
    image:{type:String},
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'departments'},
    ctc: { type: String},
    doj: { type: Date},
    status: { type: String},
    noticePeriod: { type: String },
    // attendance: {
    //     type: [{
    //       date: { type: Date, default: Date.now },
    //       status: { type: String, required: true, enum: ['Present', 'Absent'] }
    //     }],
    //     default: []
    //   }
  });

const employeeModel = mongoose.model('employees', employeeSchema);
export default employeeModel;
