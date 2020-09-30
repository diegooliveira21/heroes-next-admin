import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
});

const User = models.User || model('User', UserSchema);

export default User;
