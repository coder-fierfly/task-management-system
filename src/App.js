import './App.css';
import React, { createContext } from 'react';
import TabPanel from './components/TabPanel';

export const DataContext = createContext();

function App() {
  return (
    <TabPanel />
  );
}

export default App;
