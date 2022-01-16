const mongoose = require("mongoose");
const AssesmentSchema = mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },

    subjectcode: {
        type: String,
    },
    subject: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: (new Date().getTime())
    }

})
const Assement = mongoose.model('Assement', AssesmentSchema);
module.exports = { Assement };