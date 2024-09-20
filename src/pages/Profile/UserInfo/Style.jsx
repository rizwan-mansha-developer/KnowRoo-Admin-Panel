import { styled } from 'styled-components';
import { Box } from '@mui/material';

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  margin: 0 auto;
`;

export const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const UploadBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-color: #f4faf4;
  border: 1px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 18px;
`;

export const GrayContainer = styled(Box)`
  background-color: #fafafb;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
`;
