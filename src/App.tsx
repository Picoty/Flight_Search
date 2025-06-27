import React from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Landing />
      </Layout>
    </div>
  );
}

export default App;