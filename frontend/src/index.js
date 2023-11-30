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
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import CartScreen from './screens/CartScreen';
import LoginFormScreen from './screens/auth/LoginFormScreen';
import RegisterFormScreen from './screens/auth/RegisterFormScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/item/:itemId' element={<ItemDetailsScreen />} />
			<Route path='/cart' element={<CartScreen />} />
			<Route path='/login' element={<LoginFormScreen />} />
			<Route path='/register' element={<RegisterFormScreen />} />

			{/* Private Route */}
			<Route path='/' element={<PrivateRoute />}>
				<Route path='/checkout' element={<CheckoutScreen />} />
				<Route path='/payment' element={<PaymentScreen />} />
			</Route>
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
