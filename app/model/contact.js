import  mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [35, "Name must be under 35 characters."]
    },
    email: {
        type: String,
        required: [true, "Email address is required."],
        match: [/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "Invalid Email Address"],
    },
    message: {
        type: String,
        required: [true, "Message can't be empty."]
    },

    date: {
        type: Date,
        default: Date.now,
    }
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;