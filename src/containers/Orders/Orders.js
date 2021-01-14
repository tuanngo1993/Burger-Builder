import React from "react";

import { order as Order } from "../../components/Order/Order";
import { instance } from "../../axios-orders";
import { spinner as Spinner } from "../../components/UI/Spinner/Spinner";
import { withError as WithError } from "../../hoc/WithError/WithError";

export const orders = WithError(props => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);

    instance.get("/orders.json")
      .then(response => {
        const fetchedOrders = [];

        for (const key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }

        setOrders(fetchedOrders);
        setLoading(false);
        console.log(fetchedOrders);
      })
      .catch(error => {
        setLoading(false);
      });
  }, []);

  return <div>
    {
      loading
        ? <Spinner />
        : orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
    }
  </div>;
}, instance);