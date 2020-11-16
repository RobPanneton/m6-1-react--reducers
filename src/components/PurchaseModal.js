import React, { useContext, useState } from "react";
import { BookingContext } from "./BookingContext";

const PurchasedModal = () => {
  const { state } = useContext(BookingContext);
  const { status, selectedSeatId, price } = state;

  return <div>todo</div>;
};
