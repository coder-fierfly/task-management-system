import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connection from './components/Сonnection';
import WorkSettings from './components/WorkSettings';
import Tasks from './components/Tasks';
import DistributionOfTasks from './components/DistributionOfTasks';
import Head from './components/Head';

function App() {
  return (
    <Router>
      <div>
        <Head />
        <Routes>
          <Route path="/сonnection" element={<Connection />} />
          <Route path="/workSettings" element={<WorkSettings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/distributionOfTasks" element={<DistributionOfTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
