import { Container } from '@mui/material';
import Navbar from './components/Nav/Navbar';
import HomeScreen from './screens/HomeScreen';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<main style={{ paddingTop: '80px' }}>
				<Container>
					<Outlet />
				</Container>
			</main>
		</div>
	);
}

export default App;
