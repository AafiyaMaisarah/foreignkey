import { Sequelize,Op, DataTypes } from 'sequelize';
// import { Sequelize,DataTypes,Op } from 'sequelize';
const sequelize = new Sequelize("association","root","root",{
    host:"localhost",
    dialect:"mysql",
    port:3306,
})
const User  = sequelize.define('user' , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
   autoIncrement:true

    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[6,20]
        }
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
    validate:{
        isEmail:true
    }
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        defaultvalue:'na'
    }
},

    {
        timestamps:false

})
const Order = sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    order_details:{
        type:DataTypes.STRING,
        allowNull:false
    }
},  
    {
    
        timestamps:false
})
User.hasOne(Order)
Order.belongsTo(User)
User.bulkCreate([
    {username:"jhone",Email:"john@gmail.com",age:30,address:"abd"},
    {username:"deo",Email:"deo@gmail.com",age:20,address:"vbn"},
    {username:"tracky",Email:"tacky@gmail.com",age:35,address:"xyz"},
    {username:"jack",Email:"jack@gmail.com",age:25,address:"efg"},
    

])
sequelize.sync({alter:true})
.then(()=>{
    return User.findOne({where:{id:2}})
  
})
.then(user=>{
    return user.createOrder({order_details:"burger"})
})
.then(order=>{
    console.log(order)
}).catch(console.log)
sequelize.authenticate()
.then(()=>console.log("connected database"))
.catch(err=>console.log("not connected",err))