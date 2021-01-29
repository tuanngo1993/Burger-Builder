import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { navigationItems as NavigationItems } from "./NavigationItems";
// import { navigationItem as NavigationItem } from "./NavigationItem/NavigationItem";
import { context as Context } from "../../../hoc/Context/Context";

configure({ adapter: new Adapter() });

describe("<Navigation />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it(
    "should render two <NavigationItem /> elements if not authenticated",
    () => {
      // wrapper.setProps({...});
      expect(wrapper.find(Context.Consumer)).toHaveLength(1);
    }
  )
});