import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box, useMediaQuery, width } from '@mui/system';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';

import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';

import NextIcon from '../../../assets/FormsIcon/Graterthen.svg';
import PreviousIcon from '../../../assets/FormsIcon/Lessthen.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';

import SubmitButton from '../../Button/FormButton';
import DropdownField from '../../Dropdown/Index'; // Adjust the path as necessary
import InputField from '../../InputField/Index'; // Adjust the path as necessary
import Cookies from 'js-cookie';
import {
  addQuestionnaire,
  resetaddQuestionnaireStatus,
} from '../../../redux/postApiSlices/AddQuestionnaireSlice';
import { fetchQuestionnaire } from '../../../redux/slices/QuestionnaireSlice';

const AddQuestionnaire = ({ CloseModal }) => {
  const [QuestionnaireTitle, setQuestionnaireTitle] = useState('');
  const [questionnaireType, setquestionnaireType] = useState('0');
  const hopsId = Cookies.get('hops_Id');
  const UserId = Cookies.get('User_Id');
  const [categories, setCategories] = useState([
    { label: 'MCQs', value: '0' },
    { label: 'Fill in the Blank', value: '1' },
    { label: 'True/False', value: '2' },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [questionError, setQuestionError] = useState(false);
  const [questions, setQuestions] = useState([
    { question: '', options: [], correctOption: 0, marks: 0, time: 0 },
  ]);

  const { questionnaires, questionnaireLoading, questionnaireError } = useSelector(
    (state) => state.questionnaires
  );

  const [formData, setFormData] = useState({
    instruction: '',
    description: '',
  });

  const { addQuestionnaireStatus } = useSelector((state) => state.addQuestionnaire);
  const [titleError, setTitleError] = useState(false);
  const [typeErr, setTypeErr] = useState(' ');

  const [optionError, setOptionError] = useState(false);
  const [instructError, setInstructError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [questionType, setQuestionType] = useState('0');
  const [type, setType] = useState('0');

  const getOptionCount = (questionType) => {
    return questionType === '0' || questionType === '1' ? 5 : 2;
  };

  const [optionErrors, setOptionErrors] = useState(
    questions.map((question) => Array(getOptionCount(question.type)).fill(false))
  );

  const [errors, setErrors] = useState({
    titleError: false,
    typeError: false,
    type: false,
    questionError: false,
    marksError: false,
    timeError: false,
    passingpoint: false,
    instructError: false,
    descriptionError: false,
    dateTime: false,
    passingmark: false,
  });

  useEffect(() => {
    dispatch(fetchQuestionnaire(hopsId));
  }, []);
  const validateError = (field) => {
    if (field == '') {
      return true;
    }
    return false;
  };
  const instructionTexts = {
    0: 'Choose the best option A, B, C, or D',
    1: 'Select the correct word from the options.',
    2: 'Choose whether the statement is True or False',
  };

  const getDefaultOptions = (type) => {
    switch (type) {
      case '0':
      case '1':
        return ['', '', '', '', ''];
      case '2':
        return ['True', 'False'];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (addQuestionnaireStatus === 'success') {
      // Reset form data
      setQuestionnaireTitle('');
      setquestionnaireType('');
      setQuestions([{ question: '', options: [], correctOption: 0, marks: 0, time: 0 }]);
      setCurrentQuestion(1);
      setTotalQuestions(1);
      setFormData({ instruction: '', description: '' });
      // Close the form/modal
      CloseModal();
      dispatch(resetaddQuestionnaireStatus());
    }
  }, [addQuestionnaireStatus, CloseModal]);

  const dispatch = useDispatch();
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: [], correctOption: 0, marks: 0, time: 0 },
    ]);
    setTotalQuestions(totalQuestions + 1);
    setCurrentQuestion(questions.length + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() !== '') {
      if (name === 'instruction') {
        setInstructError(false);
      }
      if (name === 'description') {
        setDescriptionError(false);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);

    const optionCount = getOptionCount(newQuestions[questionIndex].type);
    const newOptionErrors = [...optionErrors];

    if (optionIndex < optionCount) {
      newOptionErrors[questionIndex][optionIndex] = e.target.value === '';
    }
    setOptionErrors(newOptionErrors);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = optionIndex;
    setQuestions(newQuestions);
  };

  const validateField = (value) => {
    if (typeof value === 'string') {
      return value.trim() !== '';
    } else if (typeof value === 'number') {
      return !isNaN(value) && value > 0;
    } else if (value instanceof Date) {
      return !isNaN(value.getTime()); // Checks if it's a valid date
    } else {
      return false; // For empty or invalid cases
    }
  };

  const validateOptions = (options) => {
    // Check if options array has at least one non-empty option
    const hasValidOptions = options.some((option) => option.trim() !== '');

    return hasValidOptions;
  };

  const handleValidation = () => {
    const errors = {
      titleError: !validateField(QuestionnaireTitle),
      typeError: !validateField(questionnaireType),
      type: !validateField(type),
      questionError: !validateField(questions[currentQuestion - 1]?.question),
      optionsError: !validateOptions(questions[currentQuestion - 1]?.options || []),
      instructError: !validateField(formData.instruction),
      descriptionError: !validateField(formData.description),
    };

    setErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  useEffect(() => {
    // Update options when the questionnaire type changes
    const updatedQuestions = questions.map((question) => ({
      ...question,
      options: getDefaultOptions(questionnaireType),
    }));
    setQuestions(updatedQuestions);
    setQuestionType(instructionTexts[questionnaireType]);
  }, [questionnaireType]);
  const handleSubmit = () => {
    if (!handleValidation()) return;

    // // Check if the questionnaires array has any items

    if (questionnaires.length > 0) {
      // Find if a questionnaire of the specified type already exists
      const existingQuestionnaire = questionnaires.find(
        (questionnaire) =>
          questionnaire.questionnaire_type === '0' || questionnaire.questionnaire_type === '1'
      );

      if (existingQuestionnaire) {
        if (existingQuestionnaire.questionnaire_type === type) {
          // Set error message and prevent API call if type matches
          setTypeErr('The Survey type is already added.');
          return;
        } else {
          // Return false if the type doesn't match
          setTypeErr('');
        }
      } else {
        // Clear error message if no matching questionnaire is found
        setTypeErr('');
        console.log('No existing questionnaire found of type 0 or 1');
      }
    }
    const questionnaireData = {
      title: QuestionnaireTitle,
      questionnaire_type: type,
      module_id: hopsId,
      user_id: UserId,
      status_id: '1',
      instructions: formData.instruction,
      description: formData.description,
      questions: questions.map((question) => ({
        question: question.question,
        option1: question.options[0] || '',
        option2: question.options[1] || '',
        option3: question.options[2] || '',
        option4: question.options[3] || '',
        option5: question.options[4] || '',
        answer: question.options[question.correctOption] || '',
        type: questionnaireType,
        question_time: question.time,
      })),
    };

    dispatch(addQuestionnaire(questionnaireData));
  };

  return (
    <FormContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span style={{ fontWeight: 'bold' }}>Add Questionnaire </span>
      </Typography>
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: IsMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'absolute',
          top: '2%',
          right: '2%',
        }}
      />
      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} sm={12}>
          <FormGroup>
            <InputField
              name="QuestionnaireTitle"
              label="Questionnaire Title"
              variant="outlined"
              value={QuestionnaireTitle}
              onChange={(e) => setQuestionnaireTitle(e.target.value)}
              error={errors.titleError}
              helperText={errors.titleError ? 'This field is required' : ''}
              placeholder="Enter Questionnaire title"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormGroup style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="type"
                label="Type"
                variant="outlined"
                value={questionType}
                // onChange={(e) => setQuestionnaireTitle(e.target.value)}
                error={errors.typeError}
                helperText={errors.typeError ? 'This field is required' : ''}
                placeholder="Select Questionnaire Type"
              />
            </Grid>

            <Grid item xs={12} sm={2.8}>
              <DropdownField
                name="questionnaireType"
                label="Question Type"
                value={questionnaireType}
                onChange={(e) => setquestionnaireType(e.target.value)}
                options={categories}
                error={errors.typeError}
                helperText={errors.typeError ? 'This field is required' : ''}
                icon={null}
              />
            </Grid>

            <Grid item xs={12} sm={2.8}>
              <DropdownField
                name="questionnaireType"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
                options={[
                  { label: 'Pre Survey', value: '0' },
                  { label: 'Post Survey', value: '1' },
                ]}
                error={errors.type}
                helperText={errors.type ? 'This field is required' : ''}
                icon={null}
              />
              {typeErr !== ' ' && (
                <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
                  {typeErr}
                </Typography>
              )}
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Navigation>
              <Button
                style={{ background: 'none' }}
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 1}
              >
                <img src={PreviousIcon} />
              </Button>
              <Typography>{`Question${currentQuestion}/${totalQuestions}`}</Typography>
              <Button
                style={{ background: 'none' }}
                onClick={handleNextQuestion}
                disabled={currentQuestion === totalQuestions}
              >
                <img src={NextIcon} />
              </Button>
            </Navigation>

            <Button
              onClick={handleAddQuestion}
              style={{
                color: '#03A9F4',
                height: '20px',
                fontSize: IsMobile ? '9px' : '12px',
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
              }}
            >
              Add Question
            </Button>
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box style={{ backgroundColor: '#F4F4F6', borderRadius: '14px' }} px={2} pb={5}>
            <Grid container spacing={2}>
              {/* Question Input Field */}
              <Grid item xs={12}>
                {/* Adjust xs value to cover 80% of the space */}
                <InputField
                  name={`question-${currentQuestion}`}
                  label={`Question ${currentQuestion}`}
                  variant="outlined"
                  value={questions[currentQuestion - 1].question}
                  onChange={(e) => handleQuestionChange(e, currentQuestion - 1)}
                  error={errors.questionError}
                  helperText={errors.questionError ? 'This field is required' : ''}
                  placeholder="Enter question"
                  backgroundColor="#fff"
                  fullWidth
                />
              </Grid>
            </Grid>

            {questions[currentQuestion - 1].options.map((option, index) => (
              <Option key={index}>
                <Typography
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    width: IsMobile ? '40px' : '30px',
                    height: '30px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E6E6E6',
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </Typography>
                <Grid xs={12} sm={10} m={2}>
                  <InputField
                    fullwidth
                    name={`option-${currentQuestion}-${index}`}
                    variant="outlined"
                    value={option}
                    onChange={(e) => handleOptionChange(e, currentQuestion - 1, index)}
                    error={errors.optionsError}
                    helperText={errors.optionsError ? 'This field is required' : ''}
                    placeholder="Enter option"
                    backgroundColor="#fff"
                    disabled={questionnaireType === '2'}
                  />
                </Grid>
              </Option>
            ))}
            <br />
            <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>
              Correct Answer
            </label>
            <ButtonContainer>
              {questions[currentQuestion - 1].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleCorrectOptionChange(currentQuestion - 1, index)}
                  style={{
                    backgroundColor:
                      questions[currentQuestion - 1].correctOption === index ? 'white' : 'white',
                    boxShadow:
                      questions[currentQuestion - 1].correctOption === index
                        ? '0px 0px 2px 1px green'
                        : 'none',
                    color:
                      questions[currentQuestion - 1].correctOption === index ? 'green' : 'black',
                    borderRadius: '15px',
                  }}
                >
                  {/* {` ${index + 1}`} */}
                  {String.fromCharCode(65 + index)}
                </Button>
              ))}
            </ButtonContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={name}>
            Instruction
          </label>
          <TextField
            fullWidth
            name="instruction"
            // label="Description"
            variant="outlined"
            value={formData.instruction}
            onChange={handleInputChange}
            // error={!!errors.description}
            // helperText={errors.description}
            placeholder="Enter Instruction"
            multiline
          />
          {errors.instructError && (
            <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
              This field is required
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={name}>
            Description
          </label>
          <TextField
            fullWidth
            name="description"
            // label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            // error={!!errors.description}
            // helperText={errors.description}
            placeholder="Enter description"
            multiline
          />
          {errors.descriptionError && (
            <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
              This field is required
            </Typography>
          )}
        </Grid>
      </Grid>
      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
        onClick={handleSubmit}
      />
    </FormContainer>
  );
};
AddQuestionnaire.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

const FormContainer = styled.div`
  margin: 10px;
`;

const FormGroup = styled.div`
  label {
    display: block;
  }

  input,
  select {
    width: 100%;
    // padding: 0.5rem;
    font-size: 1rem;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const QuestionBox = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: 'space-between';
  margin-bottom: 0.5rem;

  input {
    flex: 1;
    margin-right: 1rem;
    padding: 0.5rem;
  }

  button {
    background-color: red;
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export default AddQuestionnaire;
