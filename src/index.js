import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './index.scss';
import About from './components/About'; // 导入About组件
import Scanner from './pages/Scanner'; // 导入About组件

export default class Hello extends Component {
  constructor(p) {
    super(p);
    this.state = {
      subPath: window.location.pathname,
      routers: [
        { path: "/", title: "关于", component: About },
        { path: "/Scanner", title: "二维码扫描", component: Scanner }
      ]
    };
  }

  activeNav = (subPath) => () => this.setState({ subPath });

  render() {
    const { routers, subPath } = this.state;
    return (
      <Router>
        <div>
          <div className="nav">
            {
              routers.map(({ path, title }) => <Link
                to={path}
                key={path}
                onClick={this.activeNav(path)}
                className={subPath === path ? "active" : ''}
              >{title}</Link>)
            }
          </div>
          <hr />
          {
            routers.map(({ path, component }) => <Route
              path={path}
              key={path}
              exact={true}
              component={component}
            />)
          }
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'));