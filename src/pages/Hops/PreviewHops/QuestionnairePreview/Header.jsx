import { Box, Container, Typography, Button, useMediaQuery, useTheme } from '@mui/material';

import CalenderIcon2 from '../../../../assets/CardsIcon/calendar.svg';
import YellowStarIcon from '../../../../assets/FormsIcon/yellowStar.svg';
import BlueStarIcon from '../../../../assets/FormsIcon/blueStar.svg';
// import StaticTimer from "../../components/StaticTimer";
import {
  StyledContainer,
  StyledDeadlineBox,
  StyledLeftMainBox,
  StyledLeftUpperBox,
  StyledLeftLowerBox,
  StyledNumberBox,
  StyledTimeBox,
  StyledTimerBox,
  StyledCenterBox,
  StyledTypography,
  StyledButton,
  StyledDesktopTimerBox,
} from './Style';

const QuizHeader = ({ viewQuiz }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <StyledContainer isMobile={isMobile}>
        <Box display={'flex'} flexDirection={isMobile ? 'row' : 'column'}>
          <StyledLeftMainBox isMobile={isMobile}>
            <StyledLeftUpperBox isMobile={isMobile}>
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#4BC1F7',
                  whiteSpace: 'nowrap',
                  marginRight: '20px',
                  marginTop: '5px',
                }}
              >
                Total Questions:
              </Typography>
              <StyledNumberBox isMobile={isMobile}>{viewQuiz.questions_count}</StyledNumberBox>
            </StyledLeftUpperBox>
            <StyledLeftLowerBox>
              {!isMobile && (
                <Typography
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#FF0000',
                    whiteSpace: 'nowrap',
                    marginRight: '20px',
                    marginTop: '5px',
                  }}
                >
                  Deadline:
                </Typography>
              )}
              <StyledDeadlineBox>
                <img src={CalenderIcon2} alt="" width={'18px'} height={'18px'} />
                <Typography varient="caption" fontSize={12} fontWeight={'bold'} color={'#FF0000'}>
                  {viewQuiz.date}
                </Typography>
                <StyledTimeBox>{viewQuiz.time}</StyledTimeBox>
              </StyledDeadlineBox>
            </StyledLeftLowerBox>
          </StyledLeftMainBox>
        </Box>
        <StyledCenterBox isMobile={isMobile}>
          <StyledTypography isMobile={isMobile}>{viewQuiz.description}</StyledTypography>
          {/* <StyledButton>Start Quiz</StyledButton> */}
        </StyledCenterBox>

        <StyledDesktopTimerBox>
          <Box display="flex">
            <Typography
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#616161',
                whiteSpace: 'nowrap',
                marginRight: '20px',
                marginTop: '5px',
              }}
            >
              Total Points:
            </Typography>
            <Typography
              pr={14}
              pl={1.5}
              py={1}
              style={{
                fontSize: '16px',
                // fontWeight: 'bold',
                background: '#F4F4F6',
                color: '#FFA500',
                borderRadius: '12px',
                textAlign: 'center',
                width: '50px',
                // paddingRight: "20px",
                whiteSpace: 'nowrap',
              }}
            >
              <img src={YellowStarIcon} style={{ marginRight: '10px' }} />
              {viewQuiz.total_points} Points
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#616161',
                whiteSpace: 'nowrap',
                marginRight: '20px',
                marginTop: '5px',
              }}
            >
              Total Points:
            </Typography>
            <Typography
              pr={14}
              pl={1.5}
              py={1}
              style={{
                fontSize: '16px',
                // fontWeight: 'bold',
                background: '#F4F4F6',
                color: '#03A9F4',
                borderRadius: '12px',
                textAlign: 'center',
                width: '50px',
                // paddingRight: "20px",
                whiteSpace: 'nowrap',
              }}
            >
              <img src={BlueStarIcon} style={{ marginRight: '10px' }} />
              {viewQuiz.passing_points} Points
            </Typography>
          </Box>
        </StyledDesktopTimerBox>
      </StyledContainer>
    </>
  );
};

export default QuizHeader;
