const { Schema,model } = require('mongoose')
const { genSalt, hash, compare } = require('bcrypt')
const usersSchema = new Schema({
    firstName:  {type: String , required: true },
    lastName:   {type: String , required: true },
    email:      {type: String , unique: true, trim: true, lowercase:true , required:true},
    password:   {type: String , required: true },
    role:   {type: String , enum:['member','admin'], default:'member' },
},{
    timestamps:true
});

usersSchema.methods.encryptPassword = async(password) =>{
    const salt = await genSalt(12);
    const hashPassword = await hash(password, salt)
    return hashPassword
}

usersSchema.methods.checkPassword = async function(password) {
    const isValid = await compare(password,this.password)
    return isValid
}

const User = model('User',usersSchema)

module.exports = User;