import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Welcome to Zantusto</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  );
}

export default App;
