const db = require("./../models")
const sequelize = require("sequelize")
const User = db.User

const getAllUser = async (req, res) => {
    
    // const result = await User.findAll({ 
    //     //attributes:['firstName']
    //     attributes:[sequelize.fn('COUNT',sequelize.col('firstName'))]
    // })

    // const result = await User.findOne()

    const result = await User.findAll({
        where : {
            firstName:{
                [sequelize.Op.like]:'%gy'
            }
        }
    })

    res.send({ 
        success:true,
        message:"success",
        data:result
    })
}

const createUser = async (req, res) => {
    
    const result = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
    });

    res.send({ 
        success:true,
        message:"create user success",
        data:result
    })

}

const updateUser = async (req, res) => { 
    const result = await User.update({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address
    },{
        where:{
            id:req.params.id
        }
    })

    res.send({ 
        success:true,
        message:"update user success",
        data:result
    })
} 

module.exports = { 
    getAllUser,
    createUser,
    updateUser
}