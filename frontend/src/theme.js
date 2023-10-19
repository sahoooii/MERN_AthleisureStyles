import { createTheme } from '@mui/material/styles';

export const shades = {
	primary: {
		100: '#cccccc',
		200: '#999999',
		300: '#666666',
		400: '#333333',
		500: '#000000',
		600: '#000000',
		700: '#000000',
		800: '#000000',
		900: '#000000',
	},
	blue: {
		100: '#d5e5f0',
		200: '#accce1',
		300: '#82b2d1',
		400: '#5999c2',
		500: '#2f7fb3',
		600: '#26668f',
		700: '#1c4c6b',
		800: '#133348',
		900: '#091924',
	},
	babyBlue: {
		100: '#e7f5fc',
		200: '#d0ecf9',
		300: '#b8e2f6',
		400: '#a1d9f3',
		500: '#89cff0',
		600: '#6ea6c0',
		700: '#527c90',
		800: '#375360',
		900: '#1b2930',
	},
	babyPink: {
		100: '#fdf3f3',
		200: '#fbe7e7',
		300: '#f8dada',
		400: '#f6cece',
		500: '#f4c2c2',
		600: '#c39b9b',
		700: '#927474',
		800: '#624e4e',
		900: '#312727',
	},
	green: {
		100: '#e7fcf8',
		200: '#d0f9f2',
		300: '#b8f6eb',
		400: '#a1f3e5',
		500: '#89f0de',
		600: '#6ec0b2',
		700: '#529085',
		800: '#376059',
		900: '#1b302c',
	},
	neutral: {
		100: '#f5f5f5',
		200: '#ecebeb',
		300: '#e2e1e1',
		400: '#d9d7d7',
		500: '#cfcdcd',
		600: '#a6a4a4',
		700: '#7c7b7b',
		800: '#535252',
		900: '#292929',
	},
};

export const theme = createTheme({
	palette: {
		primary: {
			main: shades.primary[500],
		},
		secondary: {
			main: shades.primary[400],
		},
		blue: {
			dark: shades.blue[500],
			main: shades.blue[400],
		},
		babyBlue: {
			main: shades.babyBlue[500],
		},
		babyPink: {
			main: shades.babyPink[500],
		},
		green: {
			main: shades.green[600],
		},
		neutral: {
			dark: shades.neutral[700],
			main: shades.neutral[500],
			light: shades.neutral[100],
		},
	},
	typography: {
		fontFamily: ['Ubuntu', 'sans-serif'].join(','),
		fontSize: 11,
		h1: {
			fontFamily: ['Play', 'sans-serif'].join(','),
			fontSize: 48,
		},
		h2: {
			fontFamily: ['Play', 'sans-serif'].join(','),
			fontSize: 36,
		},
		h3: {
			fontFamily: ['Play', 'sans-serif'].join(','),
			fontSize: 20,
		},
		h4: {
			fontFamily: ['Play', 'sans-serif'].join(','),
			fontSize: 14,
		},
	},
});
