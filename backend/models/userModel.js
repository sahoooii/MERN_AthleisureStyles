import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		picturePath: {
			type: String,
			default: '',
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

export default User;
