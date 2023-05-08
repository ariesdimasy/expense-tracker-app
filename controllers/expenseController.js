const fs = require("fs")
const readDB = JSON.parse(fs.readFileSync("./db.json"))
const expenses = readDB.expenses

const expenseList = (req, res) => {
    try{
        if(expenses.length > 0) { 
            res.status(200).send({
                success:true,
                message:"expense list sucessfully fetch",
                data:expenses.map(item => {
                    return {
                        id:item.id, 
                        name:item.name,
                        date:item.date
                    }
                })
            })
        } else {
            res.status(404).send({
                success:false,
                message:"expense list empty",
                data:[]
            })
        }

    } catch(err) { 
        res.status(500).send({
            success:false,
            message:err.message,
            data:[]
        })
    }
    
}

const expenseDetail = (req, res) => {
    try { 
        const expenseId = req.params.id

        const expenseDetail = expenses.find((item) => item.id == expenseId)

        if(expenseDetail) { 
            res.status(200).send({
                success:true,
                message:"expense detail sucessfully fetch",
                data:expenseDetail
            })
        } else {
            res.status(404).send({
                success:false,
                message:"expense data not found",
                data:{}
            })
        }

    } catch(err) { 
        res.status(500).send({
            success:false,
            message:err.message,
            data:null
        })
    }
}

const expenseCreate = (req, res) => { 
    try { 

        const newData = {
            id:expenses[expenses.length-1].id + 1,
            name:req.body.name,
            nominal:req.body.nominal,
            category: req.body.category,
            date:req.body.date
        }

        //console.log(" expenses => ",expenses)

        expenses.push(newData)

        //console.log(" expenses new => ",test)

        const newWriteData = JSON.stringify({ 
            expenses:expenses
        },null,4)

        // const newWriteData = JSON.stringify({ 
        //     expenses:expenses
        // })


       // console.log(newWriteData)
        const writeData = fs.writeFileSync("./db.json",newWriteData)

        res.status(200).send({
            success:true,
            message:"expense sucessfully created",
            data:expenses[expenses.length - 1]
        })

    } catch(err) { 
        res.status(500).send({
            success:false,
            message:err.message,
            data:null
        })
    }
}

const expenseUpdate = (req, res) => {
    try { 

        const id = req.params.id 

        const expenseIndex = expenses.findIndex((item) => item.id === Number(id))

        if(expenseIndex === -1) { 
            res.status(404).send({
                success:false,
                message:"expense data not found",
                data:{}
            })
        } else {

            const newData = {
                name:req.body.name || expenses[expenseIndex].name,
                nominal:req.body.nominal || expenses[expenseIndex].nominal,
                category: req.body.category || expenses[expenseIndex].category,
                date:req.body.date || expenses[expenseIndex].date,
            }

            expenses[expenseIndex] = {id:Number(id), ...newData}
            const newExpenses = expenses

            const newWriteData = JSON.stringify({ 
                expenses:newExpenses
            },null,4)

            fs.writeFileSync("./db.json",newWriteData)

            res.status(200).send({
                success:true,
                message:"expense sucessfully updated",
                data:expenses[expenseIndex]
            })

        }
    } catch (err) { 
        res.status(500).send({
            success:false,
            message:err.message,
            data:null
        })
    }
}

const expenseTotal = (req, res) => {

    const start_date = req.query.start_date ? new Date(req.query.start_date) : null
    const end_date = req.query.end_date ? new Date(req.query.end_date) : null
    const category = req.query.category

    if(start_date > end_date) { 
        return res.status(400).send({
            success:false,
            message:"end_date should be bigger than start_date",
            data:{}
        })
    }

    var resultData = []

    console.log("start_date => ", start_date.getDate(), start_date.getMonth())
    console.log("end_date => ", end_date.getDate(), end_date.getMonth())

    if(start_date && end_date) { 
        resultData = expenses.filter(item => {
            if(new Date(item.date) >= start_date && new Date(item.date) <= end_date){
                return item
            }
        })
    }else {
        return res.status(400).send({
            success:false,
            message:"expense start_date or end_date request error",
            data:{}
        })
    }

    if(category) { 
        resultData = expenses.filter(item => {
            if(item.category === category){
                return item
            }
        })
    }

    var total = 0
    resultData.forEach(item => {
        total = total + item.nominal
    });

    return res.status(200).send({
        success:true,
        message:"expense sucessfully fetched",
        data:resultData,
        total:total
    })
}

module.exports = { 
    expenseList,
    expenseDetail,
    expenseCreate,
    expenseUpdate,
    expenseTotal
} 