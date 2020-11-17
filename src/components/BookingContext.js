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
    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
      };
    case "purchase-ticket-success":
      return {
        ...initialState,
        status: "purchased",
      };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: "Please provide credit card information!",
      };
    case "cancel-booking-process":
      return {
        ...initialState,
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

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };

  const purchaseTicketFailure = () => {
    dispatch({
      type: "purchase-ticket-failure",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
