module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define('Expense', { 
        name: {
            type:Sequelize.STRING,
        },
        nominal : { 
            type:Sequelize.INTEGER
        },
        category : {
            type:Sequelize.STRING
        },
        date: { 
            type:Sequelize.DATE
        }, 
        user_id: { 
            type:Sequelize.INTEGER
        }
    });

    Expense.associate = models => {
        Expense.belongsTo(models.User, { foreignKey:'user_id'})
    }

    return Expense
}