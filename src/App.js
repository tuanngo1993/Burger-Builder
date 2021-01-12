import React, { Component } from 'react';

import { Layout } from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: false }), 5000);
  }

  render() {
    return (
      <div>
        <Layout>
          {this.state.show && <BurgerBuilder />}
        </Layout>
      </div>
    );
  }
}

export default App;
