import { Box } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

export const FormGroup = styled.div`
  label {
    display: block;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
