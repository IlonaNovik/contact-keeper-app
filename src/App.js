import { Fragment } from 'react';

import { useHistory } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from './routes/index'

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from './layout/Navbar';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4056A1',
    },
    secondary: {
      main: '#dd1c1a',
    },
  },
})

const RenderRoute = route => {
  const history = useHistory();
  if (route.auth && !localStorage.token) {
    history.push("/login")
  }
  return <Route exact path={route.path} component={route.component} />
}

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            {routes.map((item, index) => <RenderRoute key={index} {...item} />)}
          </Switch>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
}

export default App;
