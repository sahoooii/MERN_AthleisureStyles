import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/item/:itemId' element={<ItemDetailsScreen />} />
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
