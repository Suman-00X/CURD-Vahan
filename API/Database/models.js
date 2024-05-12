import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }

});

const Person = mongoose.model('Person', personSchema)
export default Person;

//name<string>, email<string>, mobileNumber<number>, dateOfBirth<Date>