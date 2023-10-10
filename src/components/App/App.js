import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <div>
        <Header />
        <Main />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
