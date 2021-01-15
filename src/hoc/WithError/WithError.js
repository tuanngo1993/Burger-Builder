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

  
  // React.useEffect(() => {
    
  //   reqInterceptor = axios.interceptors.request.use(req => {
  //     setError(null); 
  //     return req;
  //   });

  //   resInterceptor = axios.interceptors.response.use(res => res, error => {
  //     console.log(error);
  //     setError(error);
  //   });
  // });

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

// export const withError = ( WrappedComponent, axios ) => {
//     return class extends React.Component {
//         state = {
//             error: null
//         }

//         componentWillMount () {
//             console.log("here 1");
//             axios.interceptors.request.use(req => {
//                 this.setState({error: null});
//                 return req;
//             });
//             axios.interceptors.response.use(res => res, error => {
//                 console.log(error);
//                 this.setState({error: error});
//             });
//         }

//         errorConfirmedHandler = () => {
//             this.setState({error: null});
//         }

//         render () {
//             return (
//                 <Context.Provider value={{ show: this.state.error, onClick: this.errorConfirmedHandler }}>
//                     <Modal>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Context.Provider>
//             );
//         }
//     }
// }
