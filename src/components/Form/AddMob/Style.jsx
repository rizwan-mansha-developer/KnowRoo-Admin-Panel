import { Box } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

export const UploadContainer = styled(Box)`
  width: 100%;
  margin-bottom: 16px;
  margin: auto;
`;

export const UploadBox = styled(Box)`
  position: relative;
  width: 700px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImagePreview = styled.img`
  width: 300px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

export const EditIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
