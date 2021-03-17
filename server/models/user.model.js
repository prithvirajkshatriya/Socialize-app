import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email address is required !",
  },
  hashed_password: {
    type: String,
    required: "Password is required !",
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

/**
 * The password string that's provided by the user is not stored directly in the user
 * document. Instead, it is handled as a virtual field.
 */
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * The encryption logic and salt generation logic, which are used to generate the
 * hashed_password and salt values representing the password value, are defined as
 * UserSchema methods.
 */
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.authenticate(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

/**
 * To add validation constraints to the actual password string that's selected by the end
 * user, we need to add custom validation logic and associate it with the hashed_password
 * field in the schema.
 */
UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be atleast 8 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required.");
  }
}, null);

export default mongoose.model("User", UserSchema);