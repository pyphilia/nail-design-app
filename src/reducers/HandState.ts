import { Record, Map } from "immutable";

interface IHandState {
  nails: Map<string, any>;
}

const HandStateRecord = Record({
  nails: Map({ color: "black" }),
});

class HandState extends HandStateRecord implements IHandState {}

export default HandState;
