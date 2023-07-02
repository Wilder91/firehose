import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form'
import NeighborhoodSearch from './pages/permit-neighborhoods/permit-scraper'
import DashboardScraper from './pages/demographics-neighborhoods/dashboard-scraper';
import VacantScraper from './pages/vacants-neighborhoods/vacant-scraper';
import Logo from './images/logo.png'
import { useState } from 'react';
function App() {
  const [neighborhood, setNeighborhood] = useState('')
  
  return (
    <div className="App">
      <header className="App-header">
       <h1>Baltimore Index</h1>
       <Form >
        <Form.Group controlId="formProjectName">
          <Form.Control
            required
            type="text"
            placeholder="Neighborhood Name"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </Form.Group>
        </Form>
        <NeighborhoodSearch neighborhood={neighborhood}/>
        <DashboardScraper neighborhood={neighborhood}/>
        <VacantScraper neighborhood={neighborhood}/>
      
      
      </header>
    </div>
  );
}

export default App;
