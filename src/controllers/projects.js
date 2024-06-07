import projectModel from "../models/projects.js";

const createProject = async(req,res)=>{
    try {
        let project = await projectModel.findOne({projectName: req.body.projectName})
        if(!project){
            await projectModel.create({...req.body});
            res.status(201).send({message:"Project created successfully"})
        }
        else{
            res.status(400).send({message:`Project with ${req.body.projectName} already exists`})
        }
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.message})
    }
};

const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        res.status(200).send({ message: "Project retrieved successfully", project });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.status(200).send({ message: "Projects retrieved successfully", projects });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await projectModel.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        res.status(200).send({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};


const editProject = async (req, res) => {
    try {
        const Id = req.params.id;
        const {projectID,projectName,status,department,projectHead,projectCrew}=req.body;
        const project = await projectModel.findById(Id);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        project.projectName = projectName;
        project.projectID= projectID;
        project.status=status;
        project.department=department
        project.projectHead=projectHead;
        project.projectCrew=projectCrew;
        project.modifiedAt =Date.now();
        
        await project.save();
        res.status(200).send({ message: "Project updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};
export default{
    createProject,
    editProject,
    getProjectById,
    getAllProjects,
    deleteProject
}