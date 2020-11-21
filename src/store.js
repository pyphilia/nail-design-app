import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
import ReduxPromise from "redux-promise";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk, ReduxPromise))
);

export default store;
