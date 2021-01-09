import React, { Component } from 'react';

import { layout as Layout } from "./components/Layout/Layout";
import { BurgerBulder } from "./containers/BurgerBuilder/BurgerBulder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBulder />
        </Layout>
      </div>
    );
  }
}

export default App;
