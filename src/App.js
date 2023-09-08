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
          title={`Selected Scraper: ${selectedScraper || 'None'}`}
        >
          <Dropdown.Item onClick={() => handleScraperSelect('NeighborhoodSearch')}>
            Neighborhood Search
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleScraperSelect('DashboardScraper')}>
            Dashboard Scraper
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleScraperSelect('VacantScraper')}>
            Vacant Scraper
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleScraperSelect('ThreeOneOneScraper')}>
            311 Scraper
          </Dropdown.Item>
        </DropdownButton>
        <br />
        {selectedScraper === 'NeighborhoodSearch' && <NeighborhoodSearch neighborhood={neighborhood} />}
        {selectedScraper === 'DashboardScraper' && <DashboardScraper neighborhood={neighborhood} />}
        {selectedScraper === 'VacantScraper' && <VacantScraper neighborhood={neighborhood} />}
        {selectedScraper === 'ThreeOneOneScraper' && <ThreeOneOneScraper neighborhood={neighborhood} />}
      </header>
    </div>
  );
}

export default App;
