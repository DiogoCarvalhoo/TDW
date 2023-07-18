import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../../redux/actions/actions";

import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineClear,
} from "react-icons/ai";

const Counter = () => {
  var count = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <p>
      Cliques: {count} vezes{" "}
      <AiOutlinePlusCircle onClick={() => dispatch(increment())} />{" "}
      <AiOutlineMinusCircle onClick={() => dispatch(decrement())} />{" "}
      <AiOutlineClear onClick={() => dispatch(reset())} />
    </p>
  );
};

export default Counter;
