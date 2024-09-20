import { InputBase, useMediaQuery } from '@mui/material';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  // margin-right: 16px;
  width: 80%;
  height: 45px;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ffe6b8;

  @media (max-width: 700px) {
    /* Adjust the max-width to match your 'sm' breakpoint */
    width: 70%;
  }
`;

export const Search = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const SearchIconWrapper = styled.div`
  padding: 0 6px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  padding: 6px 1px;
  padding-left: calc(0.2em + 32px);
  font-size: 1px;
`;
