import bcrypt from 'bcryptjs';

const users = [
	{
		firstName: 'Admin',
		lastName: 'User',
		email: 'admin@email.com',
		password: bcrypt.hashSync('123456', 10),
		picturePath: '/images/profilePics/shokota.JPG',
		isAdmin: true,
	},
	{
		firstName: 'Kanoa',
		lastName: 'Igarashi',
		email: 'kanoa@email.com',
		picturePath: '/images/profilePics/kanoa.jpg',
		password: bcrypt.hashSync('123456', 10),

		isAdmin: false,
	},
	{
		firstName: 'Shohei',
		lastName: 'Ohtani',
		email: 'shohei@email.com',
		password: bcrypt.hashSync('123456', 10),
		picturePath: '/images/profilePics/shohei.jpg',
		isAdmin: false,
	},
];

export default users;
