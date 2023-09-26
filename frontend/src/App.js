import { Container, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<main style={{ paddingTop: '110px' }}>
				<Container>
					<Typography variant='h2'>Athleisure Styles</Typography>
				</Container>
			</main>
		</div>
	);
}

export default App;
