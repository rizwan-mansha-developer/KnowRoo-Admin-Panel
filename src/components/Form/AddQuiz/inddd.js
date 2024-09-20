import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { Box, useMediaQuery } from '@mui/system';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import { addquiz, resetStatus } from '../../../redux/postApiSlices/AddQuizSlice';
import SubmitButton from '../../Button/FormButton';
import DateTimePicker from '../../DatePicker/DateTimePicker';
import DropdownField from '../../Dropdown/Index';
import InputField from '../../InputField/Index';
import extractTime from '../../../utils/formatTime';
import extractDate from '../../../utils/formatDateTime';
import Cookies from 'js-cookie';

const FormContainer = styled(Box)`
  position: relative;
  width: 100%;
  padding: 20px;
  background-color: #fff;
`;

const FormGroup = styled(Box)`
  margin-bottom: 20px;
`;

const AddQuizForm = ({ CloseModal }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizType, setQuizType] = useState('');
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
  const [passingPoints, setPassingPoints] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [formData, setFormData] = useState({
    instruction: '',
    description: '',
  });

  const { status } = useSelector((state) => state.addquiz);
  const [titleError, setTitleError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [marksError, setMarksError] = useState(false);
  const [instructError, setInstructError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const validateError = (field) => field.trim() === '';

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
      options: getDefaultOptions(quizType),
      correctOption: 0,
      marks: '',
      time: '',
      instruction: instructionTexts[quizType],
    };
    setQuestions([...questions, newQuestion]);
    setTotalQuestions(totalQuestions + 1);
    setCurrentQuestion(questions.length + 1);
  };

  const handleValidation = () => {
    let isValid = true;

    if (validateError(quizTitle)) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (validateError(quizType)) {
      setTypeError(true);
      isValid = false;
    } else {
      setTypeError(false);
    }

    const currentQ = questions[currentQuestion - 1];
    if (validateError(currentQ.question)) {
      setQuestionError(true);
      isValid = false;
    } else {
      setQuestionError(false);
    }

    if (validateError(currentQ.marks)) {
      setMarksError(true);
      isValid = false;
    } else {
      setMarksError(false);
    }

    if (validateError(currentQ.time)) {
      setTimeError(true);
      isValid = false;
    } else {
      setTimeError(false);
    }

    if (validateError(formData.instruction)) {
      setInstructError(true);
      isValid = false;
    } else {
      setInstructError(false);
    }

    if (validateError(formData.description)) {
      setDescriptionError(true);
      isValid = false;
    } else {
      setDescriptionError(false);
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isFormValid = handleValidation();
    if (isFormValid) {
      const FormateDate = `${extractDate(selectedDate)} ${extractTime(selectedTime)}`;

      const quizData = {
        title: quizTitle,
        type: quizType,
        module_id: hopsId,
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

  return (
    <FormContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#FFA500',
          fontSize: '22px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
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
              error={titleError}
              helperText={titleError ? 'This field is required' : ''}
              placeholder="Enter quiz title"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormGroup>
            <DropdownField
              name="quizType"
              label="Quiz Type"
              options={categories}
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
              error={typeError}
              helperText={typeError ? 'This field is required' : ''}
            />
          </FormGroup>
        </Grid>

        {questions.map((q, index) => (
          <Grid item xs={12} key={index}>
            <FormGroup>
              <InputField
                name={`question${index + 1}`}
                label={`Question ${index + 1}`}
                variant="outlined"
                value={q.question}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].question = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                error={questionError}
                helperText={questionError ? 'This field is required' : ''}
                placeholder="Enter question"
              />
            </FormGroup>
            <FormGroup>
              <InputField
                name={`marks${index + 1}`}
                label="Marks"
                variant="outlined"
                value={q.marks}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].marks = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                error={marksError}
                helperText={marksError ? 'This field is required' : ''}
                placeholder="Enter marks"
              />
            </FormGroup>
            <FormGroup>
              <InputField
                name={`time${index + 1}`}
                label="Time"
                variant="outlined"
                value={q.time}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].time = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                error={timeError}
                helperText={timeError ? 'This field is required' : ''}
                placeholder="Enter time"
              />
            </FormGroup>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={handleAddQuestion} variant="contained" color="primary">
            Add Question
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormGroup>
            <DateTimePicker
              label="Select Date"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormGroup>
            <DateTimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup>
            <InputField
              name="instruction"
              label="Instructions"
              variant="outlined"
              value={formData.instruction}
              onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
              error={instructError}
              helperText={instructError ? 'This field is required' : ''}
              placeholder="Enter instructions"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup>
            <InputField
              name="description"
              label="Description"
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={descriptionError}
              helperText={descriptionError ? 'This field is required' : ''}
              placeholder="Enter description"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <SubmitButton onClick={handleSubmit} disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </Grid>
      </Grid>

      {status === 'error' && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">Error occurred while adding quiz</Alert>
        </Snackbar>
      )}
      {status === 'success' && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="success">Quiz added successfully!</Alert>
        </Snackbar>
      )}
    </FormContainer>
  );
};

AddQuizForm.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddQuizForm;
