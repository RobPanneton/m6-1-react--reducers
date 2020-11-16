import React from "react";
import styled from "styled-components";

const PurchasedConfimation = () => {
  return (
    <Wrapper>
      <MessageDiv>Purchase Successful!</MessageDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const MessageDiv = styled.div`
  background-color: green;
  color: #eaeaee;
  width: 600px;
  text-align: center;
  width: 100%;
  height: 60px;
  font-size: 52px;
`;

export default PurchasedConfimation;
