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
import Login from './views/Login';
import Register from './views/Register';
import Account from './views/Account';
import PetsOwned from './views/PetsOwned';
import PetsPosted from './views/PetsPosted';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <IndexView />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/account/:id">
            <Account />
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
          <Route path="/pets/owned/:id">
            <PetsOwned />
          </Route>
          <Route path="/pets/posted/:id">
            <PetsPosted />
          </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;