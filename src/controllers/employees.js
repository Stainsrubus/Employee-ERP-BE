
import employeeModel from '../models/employees.js';
import Auth from '../common/auth.js';

const createEmployee = async (req, res) => {
    try {
        let employee = await employeeModel.findOne({ email: req.body.email });
        if (!employee) {
            let image = '';
            if (req.file) {
                image = req.file.path;
            }
            req.body.password = await Auth.hashPassword(req.body.password);
            await employeeModel.create({ ...req.body, image });
            res.status(201).send({ message: "Employee Created Successfully" });
        } else {
            res.status(400).send({ message: `Employee with ${req.body.email} already exists` });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};
const signup = async (req, res) => {
    try {
        let employee = await employeeModel.findOne({ email: req.body.email });
        if (!employee) {
            if (!req.body.password) {
                return res.status(400).send({ message: "Password is required" });
            }
            req.body.password = await Auth.hashPassword(req.body.password);
            await employeeModel.create({ ...req.body });
            return res.status(201).send({ message: "Employee Created Successfully" });
        } else {
            return res.status(400).send({ message: `Employee with ${req.body.email} already exists` });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const login = async(req,res)=>{
    try {
        let employee = await employeeModel.findOne({email:req.body.email})
        if(employee)
        {
            let hashCompare = await Auth.hashCompare(req.body.password,employee.password)
            if(hashCompare)
            {
                let token = await Auth.createToken({
                    id:employee._id,
                    name:employee.name,
                    email:employee.email,
                    role:employee.role
                })
                let employeeData = await employeeModel.findOne({email:req.body.email},{password:0,status:0})
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    employeeData
                })
            }
            else
            {
                res.status(400).send({
                    message:`Invalid Password`
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`Account with ${req.body.email} does not exists!`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        let employees = await employeeModel.find();
        res.status(200).send({ message: "Employees retrieved successfully", employees });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeModel.findById(employeeId,{password: 0,createdAt: 0 });
        // await markAttendance(employeeId,date,status);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee retrieved successfully', employee });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { name, email, mobile, designation,location,gender, status, noticePeriod ,ctc,doj} = req.body;
        let employee = await employeeModel.findById(employeeId);
        let imgURL = "";

        if (req.file) {
            imgURL = req.file.path;
        }

        if (employee) {
            if (req.file && employee.image) {
                const filename = employee.image.split('/').pop();
                const filePath = path.join(__dirname, `../storage/${filename}`);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            employee.name = name;
            employee.email = email;
            employee.mobile = mobile;
            employee.gender = gender;
            employee.image = imgURL || employee.image;
            employee.status = status;
            employee.noticePeriod = noticePeriod;
            employee.doj=doj;
            employee.gender=gender;
            employee.designation=designation;
            employee.location=location;
            employee.modifiedAt = Date.now();

            await employee.save();
            res.status(200).send({ message: "Employee Updated Successfully" });
        } else {
            res.status(400).send({ message: "Employee Id Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeModel.findByIdAndDelete(employeeId);
        if (employee) {
            if (employee.image) {
                const filename = employee.image.split('/').pop();
                const filePath = path.join(__dirname, `../storage/${filename}`);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            res.status(200).send({ message: "Employee Deleted Successfully" });
        } else {
            res.status(404).send({ message: "Employee Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

export default {
    createEmployee,
    signup,
    login,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
