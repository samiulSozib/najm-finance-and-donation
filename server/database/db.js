const { Sequelize, DataTypes } = require('sequelize');

// Set up the Sequelize connection
const sequelize = new Sequelize('najm_finance_and_donation', 'root', '', {
    host: 'localhost',
    logging: true,
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 }
});

// const sequelize = new Sequelize('nodescri_najm_finance_and_donation', 'nodescri_najm_finance_and_donati', 'b{b]Ama}=s_O', {
//     host: '173.252.167.120',
//     logging: true,
//     dialect: 'mysql',
//     pool: { max: 5, min: 0, idle: 10000 }
// });

// Authenticate and check database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(error => {
        console.log('Database connection error: ' + error);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Sync database models (force: false ensures data is not dropped)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database sync complete');
    })
    .catch(e => {
        console.log('Error during database sync: ' + e);
    });

// Import models
db.User = require('../model/user')(sequelize, DataTypes);
db.Member = require('../model/member')(sequelize, DataTypes);
db.Payment = require('../model/payment')(sequelize, DataTypes);
db.Expense = require('../model/expense')(sequelize, DataTypes);
db.Event = require('../model/event')(sequelize, DataTypes);
db.ExpenseCategory = require('../model/expanse_categorie')(sequelize, DataTypes);
db.Role = require('../model/role')(sequelize, DataTypes);
db.Permission = require('../model/permission')(sequelize, DataTypes);
db.RolePermission = require('../model/role_permission')(sequelize, DataTypes);
db.OTP = require('../model/otp')(sequelize, DataTypes);
db.UserRole=require('../model/user_role')(sequelize,DataTypes)
db.Language=require('../model/language')(sequelize,DataTypes)
db.Translation=require('../model/translation')(sequelize,DataTypes)
db.Group = require('../model/group')(sequelize, DataTypes);
db.GroupType=require('../model/group_type')(sequelize,DataTypes)

// Setup Associations

// A user can have many members (1-to-many relationship between User and Member)
db.User.hasMany(db.Member, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.Member.belongsTo(db.User, { foreignKey: 'user_id' });

// a group type has multiple group
db.GroupType.hasMany(db.Group,{foreignKey:'group_type'})
db.Group.belongsTo(db.GroupType,{foreignKey:'group_type'})


// A Group can have many members (1-to-many relationship between Group and Member)
db.Group.hasMany(db.Member, { foreignKey: 'group_id', onDelete: 'SET NULL' });
db.Member.belongsTo(db.Group, { foreignKey: 'group_id'});

// db.User.hasMany(db.Usra, { foreignKey: 'leader_id', onDelete: 'SET NULL' });
// db.Usra.belongsTo(db.User, { foreignKey: 'leader_id' });

// A member can lead an Usra (self-referencing 1-to-many relationship for Usra leadership)
// db.Member.belongsTo(db.Member, { as: 'Leader', foreignKey: 'usraLeader_id' });

// A member can make many payments (1-to-many relationship between Member and Payment)
db.Member.hasMany(db.Payment, { foreignKey: 'member_id', onDelete: 'CASCADE' });
db.Payment.belongsTo(db.Member, { foreignKey: 'member_id' });

// An event can be linked to many payments (1-to-many relationship between Event and Payment)
db.Event.hasMany(db.Payment, { foreignKey: 'event_id', onDelete: 'SET NULL' });
db.Payment.belongsTo(db.Event, { foreignKey: 'event_id' });

// A user (admin) can be linked to many expenses (1-to-many relationship between User and Expense)
db.User.hasMany(db.Expense, { foreignKey: 'admin_id', onDelete: 'CASCADE' });
db.Expense.belongsTo(db.User, { foreignKey: 'admin_id' });

// An event can be linked to many expenses (1-to-many relationship between Event and Expense)
db.Event.hasMany(db.Expense, { foreignKey: 'event_id', onDelete: 'SET NULL' });
db.Expense.belongsTo(db.Event, { foreignKey: 'event_id' });

// Expense can belong to one category (1-to-many relationship between ExpenseCategory and Expense)
db.ExpenseCategory.hasMany(db.Expense, { foreignKey: 'category', onDelete: 'SET NULL' });
db.Expense.belongsTo(db.ExpenseCategory, { foreignKey: 'category' });

// User to UserRole relationship
db.User.hasMany(db.UserRole, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.UserRole.belongsTo(db.User, { foreignKey: 'user_id' });

// Role to UserRole relationship
db.Role.hasMany(db.UserRole, { foreignKey: 'role_id', onDelete: 'CASCADE' });
db.UserRole.belongsTo(db.Role, { foreignKey: 'role_id' });

// **Role and Permission Associations**

// A role can have many permissions (many-to-many relationship between Role and Permission)
db.Role.belongsToMany(db.Permission, { through: db.RolePermission, foreignKey: 'role_id' });
db.Permission.belongsToMany(db.Role, { through: db.RolePermission, foreignKey: 'permission_id' });

// language and translation
db.Language.hasMany(db.Translation,{foreignKey:'language_id'})
db.Translation.belongsTo(db.Language,{foreignKey:'language_id'})


module.exports = db;
