import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const wishlistSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		item: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: 'Item',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
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
			// data: Buffer,
			// contentType: String,
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		// wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
		wishlist: [wishlistSchema],
	},
	{
		timestamps: true,
	}
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt before save
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
