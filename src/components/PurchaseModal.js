import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const PurchasedModal = () => {
  const {
    state: { status, selectedSeatId, price },
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketSuccess,
      purchaseTicketFailure,
    },
  } = useContext(BookingContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const handlePurchase = () => {
    purchaseTicketRequest();
    fetch(`/api/book-seat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seatId: selectedSeatId,
        creditCard: creditCard,
        expiration: expiration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 500) {
          purchaseTicketFailure();
        } else if (data.status === 200) {
          purchaseTicketSuccess();
        } else {
          cancelBookingProcess();
        }
      });
  };

  return (
    <div>
      {selectedSeatId && (
        <Dialog
          open={selectedSeatId !== null}
          onClose={cancelBookingProcess}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Purchase Ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You're purchasing 1 ticket for the price of ${price}.
            </DialogContentText>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Row</TableCell>
                  <TableCell>Seat</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{selectedSeatId.split("-")[0]}</TableCell>
                  <TableCell>{selectedSeatId.split("-")[1]}</TableCell>
                  <TableCell>${price}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <DialogContentText> </DialogContentText>
            {/* <DialogContentText>
              Row: {selectedSeatId.split("-")[0]} Seat:{" "}
              {selectedSeatId.split("-")[1]} Price: {price}
            </DialogContentText> */}

            <DialogContentText>Enter payment details</DialogContentText>

            <TextField
              autoFocus
              value={creditCard}
              onChange={(e) => {
                setCreditCard(e.target.value);
              }}
              margin="dense"
              id="creditCard"
              label="Credit Card"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              value={expiration}
              onChange={(e) => {
                setExpiration(e.target.value);
              }}
              margin="dense"
              id="expDate"
              label="Expiration"
              type="text"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handlePurchase} color="primary">
              Purchase
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default PurchasedModal;
