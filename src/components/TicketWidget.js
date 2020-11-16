import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import SeatImage from "../../src/assets/seat-available.svg";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { Spinner } from "../Spinner";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { BookingContext } from "./BookingContext";

const TicketWidget = () => {
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = useContext(SeatContext);

  const {
    actions: { beginBookingProcess },
  } = useContext(BookingContext);

  if (!hasLoaded) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              if (seats[seatId].isBooked === true) {
                return (
                  <SeatWrapper key={seatId}>
                    <Tippy
                      content={`Row ${rowName}, Seat ${seatIndex} - $${seats[seatId].price} (Sold)`}
                      theme="bootstrap"
                      distance={7}
                      hideOnClick={false}
                    >
                      <Button disabled={true} className="block">
                        <SeatImg
                          className="purchased"
                          src={SeatImage}
                          alt="seat"
                        />
                      </Button>
                    </Tippy>
                  </SeatWrapper>
                );
              }

              return (
                <SeatWrapper key={seatId}>
                  <Tippy
                    content={`Row ${rowName}, Seat ${seatIndex} - $${seats[seatId].price} `}
                    theme="bootstrap"
                    distance={7}
                    hideOnClick={false}
                  >
                    <Button
                      onClick={() => {
                        beginBookingProcess(seatId, seats[seatId].price);
                      }}
                    >
                      <SeatImg src={SeatImage} alt="seat" />
                    </Button>
                  </Tippy>
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;

  &.block {
    cursor: context-menu;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  color: #222;
  text-align: center;
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const SeatImg = styled.img`
  &.purchased {
    filter: grayscale(100%);
  }
`;

export default TicketWidget;
