import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Logger from './pages/Logger'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Logger />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
