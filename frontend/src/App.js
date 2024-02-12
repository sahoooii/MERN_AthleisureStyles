import { Box, Container } from '@mui/material';
import Navbar from './components/Nav/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<Box pt='120px'>
				<Container sx={{ mb: { xs: '120px', sm: '100px' } }}>
					<Outlet />
				</Container>
			</Box>
			<ToastContainer />
		</div>
	);
}

export default App;
