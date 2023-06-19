
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Clock from './pages/Clock';
import Todo from './pages/Todo';
import Wheather from './pages/Wheather';

const App = () => {
  

  return (
    
    <BrowserRouter>
    <nav>
      <ul>
        <li>
          <Link to="/">Todo</Link>
        </li>
        <li>
          <Link to="/wheather">Weather</Link>
        </li>
        <li>
          <Link to="/clock">Clock</Link>
        </li>
      </ul>
    </nav>

   
        <Route exact path="/" component={Todo} />
        <Route path="/about" component={Wheather} />
        <Route path="/contact" component={Clock} />
     
  </BrowserRouter>
    
  );
};

export default App;

