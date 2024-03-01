import { Box, Container } from '@mui/material';
import Navbar from './components/Nav/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

function App() {
	return (
		<Box
			className='app'
			minHeight='100vh'
			sx={{ position: { sm: 'relative' } }}
		>
			<Navbar />
			<Box pt='120px' sx={{ pb: { sm: '350px' } }}>
				<Container sx={{ mb: { xs: '120px', sm: '100px' } }}>
					<Outlet />
				</Container>
			</Box>
			<Footer />
			<ToastContainer />
		</Box>
	);
}

export default App;
