import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Plans from './pages/Plans';
import Referral from './pages/Referral';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <LiveChat />
      </div>
    </Router>
  );
}

export default App;