import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
import ShippingBillingScreen from './screens/ShippingBillingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ProfileScreen from './screens/ProfileScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/item/:itemId' element={<ItemDetailsScreen />} />
			<Route path='/cart' element={<CartScreen />} />
			<Route path='/login' element={<LoginFormScreen />} />
			<Route path='/register' element={<RegisterFormScreen />} />

			{/* Private Route must logged in */}
			<Route path='/' element={<PrivateRoute />}>
				<Route path='/shipping' element={<ShippingBillingScreen />} />
				<Route path='/payment' element={<PaymentScreen />} />
				<Route path='/placeorder' element={<PlaceOrderScreen />} />
				<Route path='/order/:id' element={<CheckoutScreen />} />
				<Route path='/profile' element={<ProfileScreen />} />
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
				<PayPalScriptProvider deferLoading={true}>
					<RouterProvider router={router} />
				</PayPalScriptProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
