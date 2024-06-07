import mongoose from './index.js';
const attendanceSchema = new mongoose.Schema({
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true
    },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ['Present', 'Absent', 'Leave', 'WFH'] },
    remarks: { type: String } 
  });
  
  const attendanceModel = mongoose.model('attendances', attendanceSchema);
  export default attendanceModel