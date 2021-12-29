import { BrowserRouter as Router, Route } from "react-router-dom";
import DynamicRoute from 'react-dynamic-route'
import LoginAndRegister from "./pages/loginAndRegister";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Menu from "./components/base/Menu";
import PageRender from "./utils/customRouter/PageRender";
import Profile from "./pages/[username].js";
import PrivateRouter from "./utils/customRouter/PrivateRouter";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [
    dispatch,
    // , auth.token
  ]);

  // console.log(auth.token);
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        {/* <div className="main"> */}
        <div className="container-fluid" id="wrapper">
          <div className="row newsfeed-size">
            <div className="col-md-12 newsfeed-right-side">
              {auth.token && <Menu />}

              <Route
                exact
                path="/"
                component={auth.token ? Home : LoginAndRegister}
              />

              <PrivateRouter
                // exact
                path="/:username"
                // component={Profile}
                component={auth.token ? PageRender : LoginAndRegister}
              />

              {/* <DynamicRoute
                page={path => {
                  console.log(path);
                  return import('./pages' + path).then(module => module.default)
                }}
                loading={<div>Loading..</div>}
                // props={{
                //   someProp1,
                //   someProp2,  // `someProp1` and `someProp2` are transfered to `module.dedault` above finally
                // }}
                onError={(e, history) => {
                  if (
                    /not find module/.test(e.message) &&
                    window.location.pathname !== '/404'
                  ) {
                    history.push('/404')
                    return
                  }
                  throw e
                }}
              /> */}

              {/* <PrivateRouter
                exact
                path="/:page"
                component={auth.token ? PageRender : LoginAndRegister}
              /> */}

              <PrivateRouter
                exact
                path="/:page/:id"
                component={auth.token ? PageRender : LoginAndRegister}
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
