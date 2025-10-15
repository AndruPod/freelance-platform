import {DataTypes} from "sequelize";
import sequelize from '../db.js'

// Defining database models

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "CLIENT"},
})

const Category = sequelize.define('Category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Offer = sequelize.define('Offer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    category_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: Category, key: 'id'}},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "PENDING"},
    client_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'id'}},
})

const OfferResponse = sequelize.define('OfferResponse', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true},
    offer_id: {type: DataTypes.INTEGER, primaryKey: true},
    comment: {type: DataTypes.STRING, defaultValue: ""},
})

const UserOffer = sequelize.define('UserOffer', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true},
    offer_id: {type: DataTypes.INTEGER, primaryKey: true},
})

User.hasMany(UserOffer, {foreignKey: 'user_id'})
UserOffer.belongsTo(User, {foreignKey: 'user_id', as: 'user'})

Offer.hasMany(UserOffer, {foreignKey: 'offer_id'})
UserOffer.belongsTo(Offer, {foreignKey: 'offer_id', as: 'offer'})

User.hasMany(Offer, {foreignKey: 'client_id', as: 'client'})
Offer.belongsTo(User, {foreignKey: 'client_id', as: 'client'})

Offer.hasMany(OfferResponse, { foreignKey: 'offer_id', as: 'responses' });
OfferResponse.belongsTo(Offer, { foreignKey: 'offer_id', as: 'offer' });

OfferResponse.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(OfferResponse, { foreignKey: 'user_id' });

Offer.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
});

Category.hasMany(Offer, {
    foreignKey: 'category_id',
    as: 'offers',
});

export {
    User,
    Offer,
    UserOffer,
    Category,
    OfferResponse
}

export default{
    User,
    Offer,
    UserOffer,
    Category,
    OfferResponse
}