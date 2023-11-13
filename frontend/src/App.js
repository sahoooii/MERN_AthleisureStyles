import { Container } from '@mui/material';
import Navbar from './components/Nav/Navbar';
// import HomeScreen from './screens/HomeScreen';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<main style={{ paddingTop: '120px' }}>
				<Container>
					<Outlet />
				</Container>
			</main>
			<ToastContainer />
		</div>
	);
}

export default App;
