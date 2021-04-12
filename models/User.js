const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
           
        },
         // Array of _id values referencing the Thought model
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'    
            }
          ],
        
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'    
            }
         ]              
        },
       { 
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
    );

    //SCHEMA SETTINGS Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });
    
const User = model('User', UserSchema);

module.exports = User;