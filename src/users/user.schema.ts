import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchemaProvider = {

  name: 'User',
  useFactory: () => {
    const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
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
      createdAt: {
        type: String,
        default: new Date().toISOString()
      },
      updatedAt: {
        type: String,
        default: new Date().toISOString()
      }
    });

    UserSchema.pre('save', function (next: any) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const user = this;
      if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return next(err);
          }
          bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
              return next(err);
            }
            user.password = hash;
            next();
          });
        })
      }
    });

    return UserSchema;
  }
}