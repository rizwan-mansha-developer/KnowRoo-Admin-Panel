import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box, useMediaQuery, width } from '@mui/system';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import BlueStarIcon from '../../../assets/FormsIcon/blueStar.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';

import NextIcon from '../../../assets/FormsIcon/Graterthen.svg';
import PreviousIcon from '../../../assets/FormsIcon/Lessthen.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import YellowStarIcon from '../../../assets/FormsIcon/yellowStar.svg';

import { addquiz, resetStatus } from '../../../redux/postApiSlices/AddQuizSlice';
import SubmitButton from '../../Button/FormButton';
import DateTimePicker from '../../DatePicker/DateTimePicker';
import DropdownField from '../../Dropdown/Index'; // Adjust the path as necessary
import InputField from '../../InputField/Index'; // Adjust the path as necessary
import extractTime from '../../../utils/formatTime';
import extractDate from '../../../utils/formatDateTime';
import Cookies from 'js-cookie';

const AddQuizForm = ({ CloseModal }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizType, setQuizType] = useState('0');
  const hopsId = Cookies.get('hops_Id');
  const MobsID = Cookies.get('mobs_Id');
  const [categories, setCategories] = useState([
    { label: 'MCQs', value: '0' },
    { label: 'Fill in the Blank', value: '1' },
    { label: 'True/False', value: '2' },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [questions, setQuestions] = useState([
    { question: '', options: [], correctOption: 0, marks: '', time: '' },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [passingPoints, setPassingPoints] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [formData, setFormData] = useState({
    instruction: '',
    description: '',
  });

  const { status } = useSelector((state) => state.addquiz);
  const [titleError, setTitleError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [questionType, setQuestionType] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [marksError, setMarksError] = useState(false);
  const [instructError, setInstructError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [errors, setErrors] = useState({
    titleError: false,
    typeError: false,
    questionError: false,
    marksError: false,
    timeError: false,
    passingpoint: false,
    instructError: false,
    descriptionError: false,
    dateTime: false,
    passingmark: false,
  });

  const validateError = (field) => field && typeof field === 'string' && field.trim() !== '';

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
    if (status === 'success') {
      // Reset form data
      setQuizTitle('');
      setQuizType('');
      setQuestions([{ question: '', options: [], correctOption: 0, marks: '', time: '' }]);
      setCurrentQuestion(1);
      setTotalQuestions(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setTotalPoints(0);
      setPassingPoints(0);
      setFormData({ instruction: '', description: '' });
      // Close the form/modal
      CloseModal();
      dispatch(resetStatus());
    }
  }, [status, CloseModal]);

  const dispatch = useDispatch();
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      options: getDefaultOptions(quizType), // Set default options based on the current type
      correctOption: 0,
      marks: '',
      time: '',
      instruction: instructionTexts[quizType], // Set instruction based on the current type
    };
    setQuestions([...questions, newQuestion]);
    setTotalQuestions(totalQuestions + 1);
    setCurrentQuestion(questions.length + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
  };

  const handleMarksChange = (e, index) => {
    const newQuestions = [...questions];
    const oldMarks = newQuestions[index].marks;

    // Ensure the value is numeric and default to 0 if not
    const newMarks = isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value);

    newQuestions[index].marks = newMarks;
    setQuestions(newQuestions);

    // Update the totalPoints with the new marks value
    setTotalPoints(totalPoints - oldMarks + newMarks);
  };

  const handleTimeChange = (e, index) => {
    const newQuestions = [...questions];
    const oldTime = newQuestions[index].time;

    // Ensure the value is numeric and default to 0 if not
    const newTime = isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value);

    newQuestions[index].time = newTime;
    setQuestions(newQuestions);
    setTotalTime(totalTime - oldTime + newTime);
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
      titleError: !validateField(quizTitle),
      typeError: !validateField(quizType),
      questionError: !validateField(questions[currentQuestion - 1]?.question),
      marksError: !validateField(questions[currentQuestion - 1]?.marks),
      timeError: !validateField(questions[currentQuestion - 1]?.time),
      instructError: !validateField(formData.instruction),
      descriptionError: !validateField(formData.description),
      optionsError: !validateOptions(questions[currentQuestion - 1]?.options || []),
      passingpoint: !validateField(passingPoints),
      dateTime: !(validateField(selectedDate) && validateField(selectedTime))
        ? 'Both date and time are required'
        : '',
      passingmark:
        passingPoints > totalPoints ? 'Passing Points cannot be greater than Total Points' : '',
    };

    setErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  useEffect(() => {
    const updatedQuestions = [...questions];
    const currentQuestionIndex = currentQuestion - 1;

    // Update only the options for the current active question
    updatedQuestions[currentQuestionIndex].options = getDefaultOptions(quizType);
    updatedQuestions[currentQuestionIndex].instruction = instructionTexts[quizType];

    setQuestions(updatedQuestions);
    setQuestionType(instructionTexts[quizType]);
  }, [quizType, currentQuestion]);

  const handleSubmit = () => {
    const isFormValid = handleValidation();
    console.log(isFormValid);
    if (isFormValid) {
      const FormateDate = `${extractDate(selectedDate)} ${extractTime(selectedTime)}`;

      const quizData = {
        title: quizTitle,
        type: quizType,
        module_id: hopsId,
        // group_id: MobsID,
        user_id: 1,
        duration: totalTime,
        status_id: '1',
        passing_points: passingPoints,
        total_points: totalPoints,
        date_time: FormateDate,
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
          points: question.marks,
          type: '1',
          question_time: question.time,
        })),
      };

      dispatch(addquiz(quizData));
    }
  };
  // console.log(errors.dateTime);

  return (
    <FormContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span style={{ fontWeight: 'bold' }}>Add Quiz</span>
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
              name="quizTitle"
              label="Quiz Title"
              variant="outlined"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              error={errors.titleError}
              // helperText={titleError ? 'This field is required' : ''}
              helperText={errors.titleError ? 'This field is required' : ''}
              placeholder="Enter quiz title"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormGroup style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Grid item xs={12} sm={8.8} mt={0.8} mr={1}>
              <InputField
                name="type"
                label="Type"
                variant="outlined"
                value={questionType}
                // onChange={(e) => setQuizTitle(e.target.value)}
                error={errors.typeError}
                // helperText={typeError ? 'This field is required' : ''}
                helperText={errors.typeError ? 'This field is required' : ''}
                placeholder="Enter Quiz Type"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DropdownField
                name="quizType"
                label="Select Question Type"
                value={quizType}
                onChange={(e) => setQuizType(e.target.value)}
                options={categories}
                error={errors.typeError}
                helperText={errors.typeError ? 'This field is required' : ''}
                icon={null}
              />
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
            <Grid
              container
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
              {/* Question Input Field */}
              <Grid item xs={12} sm={8}>
                {' '}
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

              {/* Time Input Field */}
              <Grid item xs={6} sm={2}>
                {' '}
                {/* Adjust xs value to cover 20% of the space */}
                <InputField
                  name={`time-${currentQuestion}`}
                  label={`Time`}
                  variant="outlined"
                  value={questions[currentQuestion - 1].time}
                  onChange={(e) => handleTimeChange(e, currentQuestion - 1)}
                  error={errors.timeError}
                  helperText={errors.timeError ? 'This field is required' : ''}
                  placeholder="Enter Time"
                  backgroundColor="#fff"
                  fullWidth
                />
                {timeError && (
                  <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
                    This field is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={2}>
                {' '}
                {/* Adjust xs value to cover 20% of the space */}
                <InputField
                  name={`marks-${currentQuestion}`}
                  label={`Marks`}
                  variant="outlined"
                  value={questions[currentQuestion - 1].marks}
                  onChange={(e) => handleMarksChange(e, currentQuestion - 1)}
                  error={errors.marksError}
                  helperText={errors.marksError ? 'This field is required' : ''}
                  placeholder="Enter marks"
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

        <Grid item xs={12} sm={12} display="flex" justifyContent="space-between" flexWrap="wrap">
          <FormGroup>
            <DateTimePicker
              label="End Date"
              selectedDate={selectedDate}
              onDateChange={(date) => setSelectedDate(date)}
              selectedTime={selectedTime}
              onTimeChange={(time) => setSelectedTime(time)}
              pastDate={true}
            />
            {!!errors.dateTime && (
              <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
                {errors.dateTime || ''}
              </Typography>
            )}
          </FormGroup>
          <FormGroup>
            <Box>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>
                Total Points
              </Typography>
              <Typography
                pr={14}
                pl={1.5}
                py={2}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  background: '#F4F4F6',
                  color: '#FFA500',
                  borderRadius: '12px',
                  textAlign: 'center',
                  // paddingRight: "20px",
                }}
              >
                <img src={YellowStarIcon} style={{ marginRight: '10px' }} />
                {totalPoints} Points
              </Typography>
            </Box>
          </FormGroup>
          <FormGroup>
            <InputField
              name="passingPoints"
              label="Passing Points"
              variant="outlined"
              placeholder="Enter Passing Points"
              // type="number"
              value={passingPoints}
              onChange={(e) =>
                setPassingPoints(isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value))
              }
              error={errors.passingpoint}
              helperText={
                errors.passingpoint
                  ? 'This field is required'
                  : totalPoints < passingPoints
                    ? 'Passing Number not grater then Total Points'
                    : ''
              }
              startIcon={<img src={BlueStarIcon} />}
            />
            {errors.passingmark && (
              <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
                Passing Number not grater then Total Points
              </Typography>
            )}
          </FormGroup>
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
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
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
AddQuizForm.propTypes = {
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
    // font-size: 1rem;
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

export default AddQuizForm;
