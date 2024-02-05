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
import AdminRoute from './components/AdminRoute';
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
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import NotPaidOrderHistoryScreen from './screens/NotPaidOrderHistoryScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ItemsListScreen from './screens/admin/ItemsListScreen';
import CreateItemScreen from './screens/admin/CreateItemScreen';
import ItemEditScreen from './screens/admin/ItemEditScreen';
import UsersListScreen from './screens/admin/UsersListScreen';
import UserProfileEditScreen from './screens/admin/UserProfileEditScreen';
import WishlistScreen from './screens/WishlistScreen';
import ReviewsEditScreen from './screens/admin/ReviewsEditScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/page/:pageNumber' element={<HomeScreen />} />
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
				<Route path='/orderhistory' element={<OrderHistoryScreen />} />
				<Route path='/notpaidorder' element={<NotPaidOrderHistoryScreen />} />
				<Route path='/wishlist' element={<WishlistScreen />} />
			</Route>

			{/* Admin Route only admin can see these */}
			<Route path='/' element={<AdminRoute />}>
				<Route path='/admin/orderlist' element={<OrderListScreen />} />
				<Route path='/admin/itemslist' element={<ItemsListScreen />} />
				<Route
					path='/admin/itemslist/:pageNumber'
					element={<ItemsListScreen />}
				/>
				<Route path='/admin/create' element={<CreateItemScreen />} />
				<Route path='/admin/item/:id/edit' element={<ItemEditScreen />} />
				<Route path='/admin/userslist' element={<UsersListScreen />} />
				<Route
					path='/admin/userslist/:pageNumber'
					element={<UsersListScreen />}
				/>
				<Route
					path='/admin/user/:id/edit'
					element={<UserProfileEditScreen />}
				/>
				<Route path='/admin/item/:id/reviews' element={<ReviewsEditScreen />} />
				<Route
					path='/admin/item/:id/reviews/:pageNumber'
					element={<ReviewsEditScreen />}
				/>
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
