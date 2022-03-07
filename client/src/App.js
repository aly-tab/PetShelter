//import logo from './logo.svg';
//import './App.css';
import { 
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import IndexView from './views/IndexView';
import CreateView from './views/CreateView';
import DetailView from './views/DetailView';
import EditView from './views/EditView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <IndexView />
          </Route>
          <Route path="/pets/new">
            <CreateView />
          </Route>
          <Route exact path="/pets/:id">
            <DetailView />
          </Route>
          <Route path="/pets/:id/edit">
            <EditView />
          </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
