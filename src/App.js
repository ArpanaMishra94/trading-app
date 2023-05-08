import './App.css';
import Navbar from './components/Navbar';
import MainCard from './components/MainCard';
import CoinProvider from './context';

function App() {
  return (
    <CoinProvider>
      <div className="App">
        <Navbar />
        <MainCard />
      </div>
    </CoinProvider>
  );
}

export default App;
