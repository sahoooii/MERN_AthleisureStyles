import { Container, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<main style={{ paddingTop: '80px' }}>
				<Container>
					<HomeScreen />
				</Container>
			</main>
		</div>
	);
}

export default App;
