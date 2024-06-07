import departmentModel from "../models/departments.js";

const createDepartment = async (req, res) => {
    try {
        let department = await departmentModel.findOne({ department_name: req.body.department_name });
        if (!department) {
            await departmentModel.create({ ...req.body });
            res.status(201).send({ message: "Department created successfully" });
        } else {
            res.status(400).send({ message: `Department with name ${req.body.department_name} already exists` });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

// Get a department by ID
const getDepartmentById = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await departmentModel.findById(departmentId);
        if (!department) {
            return res.status(404).send({ message: "Department not found" });
        }
        res.status(200).send({ message: "Department retrieved successfully", department });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

// Get all departments
const getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find();
        res.status(200).send({ message: "Departments retrieved successfully", departments });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

// Delete a department
const deleteDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await departmentModel.findByIdAndDelete(departmentId);
        if (!department) {
            return res.status(404).send({ message: "Department not found" });
        }
        res.status(200).send({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

// Edit a department
const editDepartment = async (req, res) => {
    try {
        const Id = req.params.id;
        const { department_name, departmentHead, peoples } = req.body;
        const department = await departmentModel.findById(Id);
        if (!department) {
            return res.status(404).send({ message: "Department not found" });
        }
        department.department_name = department_name;
        department.departmentHead = departmentHead;
        department.peoples = peoples;
        department.updated_at = Date.now();

        await department.save();
        res.status(200).send({ message: "Department updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

export default {
    createDepartment,
    editDepartment,
    getDepartmentById,
    getAllDepartments,
    deleteDepartment
};
