import mongoose from './index.js';

const  projectSchema= new mongoose.Schema(
    {
    projectID: { type: String, required: true },
    projectName: { type: String, required: true },
    status: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'departments', required: true },
    projectHead: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true },
    projectCrew: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    },
    {
        timestamps: true 
      }
);
const projectModel= mongoose.model('projects',projectSchema);
export default projectModel;