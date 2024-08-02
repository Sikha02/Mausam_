const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Mausam', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define the schema for user login
const LogInSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
});

// Hash the password before saving a user
LogInSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            next();
        } catch (err) {
            console.error('Error hashing password:', err); // Debugging
            next(err);
        }
    } else {
        next();
    }
});

// Method to compare password
LogInSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const match = await bcrypt.compare(candidatePassword, this.password);
        if (!match) {
            console.error('Password comparison failed'); // Debugging
        }
        return match;
    } catch (err) {
        console.error('Error comparing password:', err); // Debugging
        throw err;
    }
};

// Create a model for the schema
const LogInCollection = mongoose.model('LogInCollection', LogInSchema);

module.exports = { LogInCollection };
