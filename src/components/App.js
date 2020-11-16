import React, { useContext, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";
import PurchaseConfirmation from "./PurchaseConfirmation";
import { BookingContext } from "./BookingContext";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  const { state: status } = useContext(BookingContext);

  useEffect(() => {
    fetch(`/api/seat-availability`)
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  console.log(status);

  return (
    <>
      <PurchaseModal />
      <GlobalStyles />
      <TicketWidget />
      {status.status === "purchased" && (
        <>
          <PurchaseConfirmation />
        </>
      )}
    </>
  );
}

export default App;
