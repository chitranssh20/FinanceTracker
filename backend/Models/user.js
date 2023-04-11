const mongoose = require('mongoose') 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,  
    }
}); 

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const salt = await bcrypt.genSalt(3);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword; 
        return next();
    }
    catch (error) {
        return next(error);
    }
});

userSchema.methods.comparedPassword = async function(candidatePassword, next){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(error){
        return next(error)
    }
}


const User = mongoose.model('users', userSchema);
module.exports = User;