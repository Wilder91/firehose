import logo from './logo.svg';
import './App.css';

import NeighborhoodSearch from './pages/permit-neighborhoods/neighborhood-search'
import DashboardScraper from './pages/demographics-neighborhoods/dashboard-scraper';
import VacantScraper from './pages/vacants-neighborhoods/vacant-scraper';
import Logo from './images/logo.png'
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Baltimore Index</h1>
        <NeighborhoodSearch />
        <DashboardScraper />
        <VacantScraper />
      
      
      </header>
    </div>
  );
}

export default App;
