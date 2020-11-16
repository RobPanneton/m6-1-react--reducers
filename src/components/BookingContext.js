import React, { createContext, useReducer, useEffect } from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seat,
        price: action.price,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = (seatId, seatPrice) => {
    dispatch({
      type: "begin-booking-process",
      seat: seatId,
      price: seatPrice,
    });
  };

  useEffect(() => {
    console.log(state);
  });

  return (
    <BookingContext.Provider
      value={{ state, actions: { beginBookingProcess } }}
    >
      {children}
    </BookingContext.Provider>
  );
};
