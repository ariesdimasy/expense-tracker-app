module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', { 
        firstName: {
            type:Sequelize.STRING,
        },
        lastName : { 
            type:Sequelize.STRING
        },
        address : {
            type:Sequelize.STRING
        }
    });

    User.associate = models => {
        User.hasMany (models.Expense, { 
            foreignKey: "user_id"
        })
    }

    return User
}