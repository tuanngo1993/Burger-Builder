import axios from "axios";

export const instance = axios.create({
  baseURL: "https://react-my-burger-48670-default-rtdb.firebaseio.com/"
});