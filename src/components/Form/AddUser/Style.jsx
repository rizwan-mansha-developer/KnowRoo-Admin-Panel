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
`;

export const UploadBox = styled(Box)`
  position: relative;
  width: 200px;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 13px;
`;

export const EditIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
