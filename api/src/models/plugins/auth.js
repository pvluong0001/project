import jwt from 'jsonwebtoken';

export default function(schema, options) {
  schema.methods.generateAuthToken = function() {
    return jwt.sign({
      _id: this._id,
      name: this.name,
      email: this.email
    }, process.env.SECRET_KEY)
  };

  schema.methods.comparePassword()
}