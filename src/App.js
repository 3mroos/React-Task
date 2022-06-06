import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Logger from './pages/Logger'

function App() {
  return (
    
      <Layout>
        
            <Logger />
         
      </Layout>

  );
}

export default App;
