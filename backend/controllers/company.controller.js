import {Company} from '../models/company.model.js';
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            });
        }

        // Create the new company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        // Log the created company
        console.log('Created Company:', company);

        // Send success response
        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company // You can also send back the created company details
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "An error occurred while registering the company",
            success: false,
            error: err.message
        });
    }
};


export const getCompany = async(req,res) => {
    try{
        const userId = req.id;
        const companies = await Company.find({userId});
        console.log(companies);

        if(!companies){
            return res.status(404).json({
                message: "No company found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    }catch(err){
        console.log(err);
    }
}

export const getCompanyById = async(req,res) => {
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "No company found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    }catch(err){
        console.log(err);
    }
}


export const updateCompany = async(req,res) => {
    try{
        const {name,description,website,location} = req.body;
        const file = req.file;

        const updateFields = {};
        if (name) updateFields.name = name; // Correct field mapping
        if (description) updateFields.description = description;
        if (website) updateFields.website = website;
        if (location) updateFields.location = location;
        const company = await Company.findByIdAndUpdate(req.params.id,updateFields,{new:true});

        if(!company){
            return res.status(404).json({
                message: "No company found",
                success: false
                
            })
        }
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            
            
        })
    }catch(err){
        console.log(err); 
    }
}


