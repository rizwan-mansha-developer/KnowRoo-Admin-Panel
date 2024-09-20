import React, { useState } from 'react';
import { Box, Typography, Collapse, useMediaQuery, Button } from '@mui/material';
import styled from 'styled-components';
import ArrowDropDownIcon from '../../../../assets/CardsIcon/dropdown.svg';
import ArrowDropUpIcon from '../../../../assets/CardsIcon/dropup.svg';
import { display } from '@mui/system';

const QuestionCardContainer = styled(Box)`
  background-color: #ffffff;
  padding: 7px;
  border-radius: 8px;
  //   margin-bottom: 16px;
`;

const OptionsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
//   align-items: center;
  gap: 8px;
  margin-top: 16px;
  width:80%
  margin-right:auto;
  margin-left: 5%;
`;

const OptionButton = styled(Box)`
  text-align: left;
  justify-content: flex-start;
  background-color: #f4f4f6;
  border-radius: 10px;
  width: 90%;
  height: 40px;
  padding: 6px 30px;
`;

const CorrectAnswerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  //   align-items: center;
  margin-top: 26px;
  margin-left: 5%;
`;

const DropdownHeader = styled(Box)`
  background-color: #f4f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   cursor: pointer;
`;

const QuestionCard = ({ question, questionIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const optionLabels = ['A', 'B', 'C', 'D', 'E']; // Adjust based on the number of options
  const correctOptionIndex = question.options.findIndex((option) => option === question.answer);

  return (
    <QuestionCardContainer>
      <DropdownHeader
        onClick={toggleDropdown}
        style={{
          height: '50px',
          borderRadius: '12px',
          padding: '2px 20px',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Typography>{`${questionIndex + 1}. ${question.question}`}</Typography>
        {isOpen ? (
          <img style={{ width: '15px' }} src={ArrowDropUpIcon} alt="Arrow Up" />
        ) : (
          <img style={{ width: '9px' }} src={ArrowDropDownIcon} alt="Arrow Down" />
        )}
      </DropdownHeader>
      <Collapse in={isOpen}>
        <OptionsContainer>
          {question?.options.map((option, index) => (
            <Box display="flex" flexDirection="row" gap={2}>
              <Typography
                style={{
                  backgroundColor: '#f4f4f6',
                  borderRadius: '50%',
                  width: IsMobile ? '35px' : '30px',
                  marginTop: '2px',
                  height: '30px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E6E6E6',
                }}
              >
                {String.fromCharCode(65 + index)}
              </Typography>
              <OptionButton key={index} variant="outlined">
                <Typography>{`${option}`}</Typography>
              </OptionButton>
            </Box>
          ))}
        </OptionsContainer>

        <CorrectAnswerContainer>
          <Typography>Correct Answer:</Typography>
          <Box display="flex" gap={2}>
            {question.options?.map((option, index) => (
              <Button
                key={index}
                style={{
                  backgroundColor: correctOptionIndex === index ? '#f4f4f6' : '#f4f4f6',
                  boxShadow: correctOptionIndex === index ? '0px 0px 2px 1px green' : 'none',
                  color: correctOptionIndex === index ? 'green' : 'black',
                  borderRadius: '15px',
                }}
              >
                {String.fromCharCode(65 + index)}
              </Button>
            ))}
          </Box>
        </CorrectAnswerContainer>
      </Collapse>
    </QuestionCardContainer>
  );
};

export default QuestionCard;
