import React from "react";

import { modal as Modal } from "../../components/UI/Modal/Modal";
import { context as Context } from "../Context/Context";

let reqInterceptor;
let resInterceptor;

export const withError = (WrappedComponent, axios) => props => {
  const [error, setError] = React.useState();

  // Call global request and response axios
  React.useState(() => {
    reqInterceptor = axios.interceptors.request.use(req => {
      setError(null); 
      return req;
    });

    resInterceptor = axios.interceptors.response.use(res => res, error => {
      setError(error);
    });
  });

  // Should remove axios when unmount function to avoid overloading memory
  React.useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  },[]);

  const handleToggleModal = () => {
    setError(null);
  };

  return <Context.Provider value={{ show: error, onClick: handleToggleModal }}>
    <Modal>
      {error ? error.message : null}
    </Modal>
    <WrappedComponent {...props} />
  </Context.Provider>;
}
