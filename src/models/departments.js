import mongoose from './index.js';

const departmentSchema = new mongoose.Schema(
{
    department_name: { type: String, required: true },
    departmentHead: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true },
    peoples: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: true 
  });
const departmentModel= mongoose.model('departments',departmentSchema);
export default departmentModel;