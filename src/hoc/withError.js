import React from "react";

import { modal as Modal } from "../components/UI/Modal/Modal";
import { context as Context } from "./context";

let reqInterceptor;
let resInterceptor;

export const withError = (WrappedCompoenent, axios) => props => {
  const [error, setErrorState] = React.useState({
    error: null
  })

  // Call global request and response axios
  React.useEffect(() => {
    reqInterceptor = axios.interceptors.request.use(req => {
      setErrorState({ error: null });
      return req;
    });

    resInterceptor = axios.interceptors.response.use(res => res, error => {
      setErrorState({ error: error });
    });
  }, []);

  // Should remove axios when unmount function to avoid overloading memory
  React.useEffect(() => {
    return () => {
      console.log("will unmount", reqInterceptor, resInterceptor);
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  },[]);

  const handleToggleModal = () => {
    setErrorState({ error: null });
  };

  return <Context.Provider value={{ show: error.error, onClick: handleToggleModal }}>
    <Modal>
      {error.error ? error.error.message : null}
    </Modal>
    <WrappedCompoenent {...props} />
  </Context.Provider>;
}