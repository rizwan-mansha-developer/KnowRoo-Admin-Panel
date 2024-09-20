import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import {
  StyledContainer,
  StyledBox,
  StyledInnerBox,
  StyledTypography,
  StyledItemBox,
} from './Style';
import GreenStar from '../../../../assets/FormsIcon/greenStar.svg';
import YellowStar from '../../../../assets/FormsIcon/yellowStar.svg';
import { fetchviewAssignment } from '../../../../redux/slices/ViewAssignment';
import { useDispatch, useSelector } from 'react-redux';
import { Img_BASE_URL } from '../../../../config/apiConfig';
import CloseIcon from '../../../../assets/FormsIcon/CloseIcon.svg';
import { convertUTCToLocal } from '../../../../utils/convertUTCToLocal';
import InputField from '../../../../components/InputField/Index';
import SubmitButton from '../../../../components/Button/FormButton';
import { fetchquizResult } from '../../../../redux/slices/ViewQuizResult';

export const QuizResult = ({ CloseModal, id, userId }) => {
  const dispatch = useDispatch();
  const { quizResult = {}, loading, error } = useSelector((state) => state.quizResult);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchquizResult(id, userId));
  }, [dispatch, id]);

  const DueDate = quizResult.date_time;
  const AttemptDate = quizResult.created_at;
  const { date, time } = convertUTCToLocal(DueDate);
  const { date: attemptDate, time: attemptTime } = convertUTCToLocal(AttemptDate);

  return (
    <StyledBox>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        Quiz Result
      </Typography>

      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: isMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'absolute',
          top: '2%',
          right: '2%',
        }}
      />

      <StyledInnerBox>
        <StyledItemBox>
          <StyledTypography ml={1} fontWeight="bold" variant="h6" color={'#616161'}>
            Deadline
          </StyledTypography>
          <Box className="item-container">
            {[date, time].map((item) => (
              <Box className="item" key={item}>
                <Typography variant="body2" color={'#03A9F4'}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </StyledItemBox>
        <StyledItemBox>
          <StyledTypography ml={1} fontWeight="bold" variant="h6" color={'#4CAF50'}>
            Attempt Date
          </StyledTypography>
          <Box className="item-container">
            {[attemptDate, attemptTime].map((item) => (
              <Box className="item" key={item}>
                <Typography variant="body2" color={'#4CAF50'}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </StyledItemBox>
        <Box
          display="flex"
          gap={1}
          width="100%"
          sx={{
            '@media (max-width: 380px)': {
              flexDirection: 'column',
            },
          }}
        >
          <StyledItemBox width="1/2">
            <StyledTypography ml={1} fontWeight="bold" variant="h6" color={'#616161'}>
              Total Points
            </StyledTypography>
            <Box className="full-item">
              <img src={YellowStar} alt="" />
              <Typography variant="body2" color={'#FFA500'}>
                {`${quizResult.total_points} Points`}
              </Typography>
            </Box>
          </StyledItemBox>
          <StyledItemBox width="1/2">
            <StyledTypography ml={1} fontWeight="bold" variant="h6" color={'#616161'}>
              Passing Points
            </StyledTypography>
            <Box className="full-item">
              <img src={GreenStar} alt="" />
              <Typography variant="body2" color={'#4CAF50'}>
                {`${quizResult.passing_points} Points`}
              </Typography>
            </Box>
          </StyledItemBox>
        </Box>
        <StyledItemBox>
          <StyledTypography ml={1} fontWeight="bold" variant="h6" color={'#616161'}>
            Gain Points
          </StyledTypography>
          <Box className="full-item">
            <img src={YellowStar} alt="" />
            <Typography variant="body2" color={'#FFA500'}>
              {`${quizResult.points_obtained} Points`}
            </Typography>
          </Box>
        </StyledItemBox>
      </StyledInnerBox>
    </StyledBox>
  );
};
