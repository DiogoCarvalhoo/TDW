import styled from "styled-components";

export const CardDiv = styled.div`
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
  padding-bottom: 10px;
  background-color: white;

  h6 {
    font-size: 28px;
    color: #012970;
    font-weight: 700;
    margin: 0;
    padding: 0;
  }
`;

export const CardBodyDiv = styled.div`
  padding: 0 20px 20px 20px;
  align-items: center;
`;

export const CardTitleH5 = styled.h5`
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;

  span {
    color: #899bbd;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const CardIconDiv = styled.div`
  font-size: 48px;
  line-height: 0;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
`;
