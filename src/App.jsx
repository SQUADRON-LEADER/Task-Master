import './app.css';
import Todo from './components/todo';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme === 'dark' ? 'dark-theme' : '';
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-theme' : '';
  };

  if (loading) {
    return (
      <div className="app-container loading-screen">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading TaskMaster...</p>
        </div>
      </div>
    );
  }
  
  return(
    <div className="app-container">
      <div className="app-wrapper">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span>Task</span>Master
            </h1>
            <p className="app-subtitle">
              Organize your tasks efficiently
            </p>
          </div>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        
        <main className="app-main">
          <Provider store={store}>
            <Todo/>
          </Provider>
        </main>
        
        <footer className="app-footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} TaskMaster - Your Personal Task Manager</p>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Help</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;