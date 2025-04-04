import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});

	const isProduction = process.env.NODE_ENV === 'production';

	// Set JWT as HTTP-Only cookie name as 'jwt'
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction ? 'None' : 'Lax',
		domain:
			'mern-athleisure-styles.vercel.app' || 'athleisurestyles.onrender.com/',
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日間
	});
	return token;
};

export default generateToken;
