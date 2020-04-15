import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Shop from '../Components/Shop/ShopComponent';
import Users from '../Components/Users/UsersComponent';
import Recipes from '../Components/Recipes/RecipesComponent';
import Home from '../Components/Home/HomeComponent';
import Login from '../Components/Login/LoginContainer';
import AccountPage from '../Components/AccountPage/AccountPageContainer';
import Bank from '../Components/Bank/BankContainer';
import Calorie from '../Components/Calorie/CalorieComponent';
import Registration from '../Components/Registration/RegistrationContainer';
import PrivateRoute from '../Components/PrivateRoute/PrivateRouteContainer';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/login" component={Login} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/calorie" component={Calorie} />
      <Route path="/registration" component={Registration} />
      <PrivateRoute path="/account" requiredRole={null} component={AccountPage} />
      <PrivateRoute path="/bank" requiredRole={null} component={Bank} />
      <PrivateRoute path="/users" requiredRole="admin" component={Users} />
    </Switch>
  </Router>
);

export default App;
