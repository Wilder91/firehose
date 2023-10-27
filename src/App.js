import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import NeighborhoodSearch from './pages/permit-neighborhoods/permit-scraper';
import DashboardScraper from './pages/demographics-neighborhoods/dashboard-scraper';
import VacantScraper from './pages/vacants-neighborhoods/vacant-scraper';
import ThreeOneOneScraper from './pages/311-neighborhoods/311-scraper';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [neighborhood, setNeighborhood] = useState('');
  const [selectedScraper, setSelectedScraper] = useState(null);

  const handleScraperSelect = (scraperName) => {
    setSelectedScraper(scraperName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Baltimore Index</h1>

        <Form>
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
        <br />
        <DropdownButton
          id="scraper-dropdown"
          title={`${selectedScraper || 'Search Type'}`}
        >
          <Dropdown.Item onClick={() => handleScraperSelect('Building Permits')}>
            Building Permits
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleScraperSelect('Demographics')}>
            Demographics
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleScraperSelect('Vacants')}>
            Vacant Houses
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleScraperSelect('311 Calls')}>
            311 Calls
          </Dropdown.Item>
        </DropdownButton>
        <br />
        {selectedScraper === 'Building Permits' && <NeighborhoodSearch neighborhood={neighborhood} />}
        {selectedScraper === 'Demographics' && <DashboardScraper neighborhood={neighborhood} />}
        {selectedScraper === 'Vacants' && <VacantScraper neighborhood={neighborhood} />}
        {selectedScraper === '311 Calls' && <ThreeOneOneScraper neighborhood={neighborhood} />}
      </header>
    </div>
  );
}

export default App;
