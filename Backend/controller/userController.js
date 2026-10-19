
import z from 'zod';
import department from '../model/department.js';
import employee from '../model/employee.js';
import User from '../model/user.js';

const departSchema = z.object({
    name : z.string().min(4, {error:"name must be at least 4 characters!"})

})

const employeeSchema = z.object({
    name : z.string({error: "name must be string"}).min(4, {error:"name must be at least 4 characters"}),
    salary: z.number({error:"salary must be a number"}).min(1500, {error:"Salary must be at least 1500"})
})


export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: 'Name and email are required.'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'User with this email already exists.'
            });
        }

        const user = await User.create({ name, email });

        return res.status(201).json({
            message: 'User created successfully.',
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Something went wrong.'
        });
    }
};


export const depart = async(req, res) => {
    try{
         const result = departSchema.safeParse(req.body);

         if(!result.success){
            return res.status(402).json({message : result.error.issues.map((issue)=> issue.message)})
         }
         const {name} = result.data;

         console.log("name", name);

         if(!name){
            return res.status(400).json({message : "Name is required!"})
         }

         const savedata = await department.create({
            name : name,

         })

         return res.status(200).json({message : "Data has been saved successfully!", data : savedata})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}

export const getDepartments = async(req, res) => {
    try {
        const departments = await department.find();

        return res.status(200).json({
            message: 'Departments retrieved successfully.',
            data: departments
        });
    } catch(error) {
        return res.status(500).json({
            message: error.message || 'Something went wrong.'
        });
    }
}

export const setEmployee = async(req, res) => {
    try{

        const {departmentId} = req.body;

        const result = employeeSchema.safeParse(req.body);

        if(!result.success){
            return res.status(403).json({message : result.error.issues.map((issue)=> issue.message)})
        }
        const {name, salary} = result.data;

        if(!name || !salary){
            return res.status(402).json({message : "name and salary is required"})
        }

        const savedata = await employee.create({name, salary, departmentId});

        return res.status(200).json({message : "Data saved in database!", data : savedata})



    }
    catch(error){
        return res.status(500).json(error.message)
    }
}

export const getEmployee = async(req, res) => {
    try{
           const getData = await employee.aggregate([
            {$match : {salary : {$gt : 1600}}},
            {$lookup : {
                from : "deps",
                localField : "departmentId",
                foreignField : "_id",
                as : "member"
            }},
            { $unwind : "$member"},
            {
                $project : {
                    name : 1,
                    salary : 1,
                    departmentId : 1,
                    department: "$member.name"
                }
            },
            {$sort : {salary : -1}}
           ])

           if(getData.length === 0){
            return res.status(400).json({message : "Data can't get!"})
           }

           return res.status(200).json({message : "Data fetched successfully!", data : getData})
    }
    catch(error){
        return res.status(500).json({message : error.message || "something went wrong"})
    }
}


export const getEmployees = async(req, res) => {
    try{
       const limit = 3;
       const page = 5;

       const skip = (page -1)*limit;
       const fetchedData = await employee.find().populate('departmentId', 'name').skip(skip).limit(limit);

       if(!fetchedData){
        return res.status(400).json({message : "Data can't fetched!"});
       }

       return res.status(200).json({message : "Data fetched successfully!", data : fetchedData})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}