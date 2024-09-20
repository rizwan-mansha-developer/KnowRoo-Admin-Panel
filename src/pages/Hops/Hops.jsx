import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import HopsButton from '../../components/Button/AddHopsButton';
import CreateAssignment from '../../components/Card/CreateAssignment';
import CreateCourse from '../../components/Card/CreateCourse';
import CreateQuestionnaire from '../../components/Card/CreateQuestionnaire';
import QuizCard from '../../components/Card/CreateQuiz';
import CreateQuiz from '../../components/Card/CreateQuiz';
import AddAssignment from '../../components/Form/AddAssignment/Index';
import AddCourse from '../../components/Form/AddCourse/Index';
import AddQuestionnaire from '../../components/Form/AddQuestionnnaire/Index';
import AddQuizForm from '../../components/Form/AddQuiz/Index';
import ModalOpen from '../../components/Modal/Modal';
import AdminLayout from '../../layouts/AdminLayout';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { Grid, Modal, Box, Typography } from '@mui/material';
import { StyledCard } from '../Leaps/Style';
import Cardimg from '../../assets/images/school1.png';
import AddIcon from '../../assets/PlusButton.svg';
import { fetchAssignment } from '../../redux/slices/AssignmentSlice';
import { fetchCourse } from '../../redux/slices/CourseSlice';
import { fetchQuestionnaire } from '../../redux/slices/QuestionnaireSlice';
import { fetchQuiz } from '../../redux/slices/QuizSlice';
import { resetStatus } from '../../redux/postApiSlices/AddQuizSlice';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { addCourse, resetaddCourseStatus } from './../../redux/postApiSlices/AddCourseSlice';
import {
  addAssignment,
  resetaddAssignmentStatus,
} from './../../redux/postApiSlices/AddAssignmentSlice';
import {
  addQuestionnaire,
  resetaddQuestionnaireStatus,
} from './../../redux/postApiSlices/AddQuestionnaireSlice';
import Loader from '../../components/Skeleton/Loader';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';

const Hops = ({ data }) => {
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || Cookies.get('hops_Id'));
  const { quizs, loading, error } = useSelector((state) => state.quizs);

  const { quizLoading, quizError, status } = useSelector((state) => state.addquiz);
  const { addCourseLoading, addCourseError, addCourseStatus } = useSelector(
    (state) => state.addCourse
  );

  const { addAssignmentLoading, addAssignmentError, addAssignmentstatus } = useSelector(
    (state) => state.addAssignment
  );

  const { addQuestionnaireLoading, addQuestionnaireError, addQuestionnaireStatus } = useSelector(
    (state) => state.addQuestionnaire
  );

  const { questionnaires, questionnaireLoading, questionnaireError } = useSelector(
    (state) => state.questionnaires
  );

  const { assignments, assignmentLoading, assignmentError } = useSelector(
    (state) => state.assignments
  );
  const { courses, courseLoading, courseError } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchQuiz(id));
    dispatch(fetchQuestionnaire(id));
    dispatch(fetchAssignment(id));
    dispatch(fetchCourse(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (addCourseStatus === 'success') {
      setSnackbarMessage('Course added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      dispatch(fetchCourse(id));
      setModalOpen(false);
    } else if (addCourseStatus === 'error') {
      setSnackbarMessage('An error occurred while adding the course. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }

    if (status === 'success') {
      setSnackbarMessage('Quiz added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      dispatch(fetchQuiz(id));
    } else if (status === 'error') {
      setSnackbarMessage('An error occurred while adding the quiz. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }

    if (addAssignmentstatus === 'success') {
      setSnackbarMessage('Assignment added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      dispatch(fetchAssignment(id));
    } else if (addAssignmentstatus === 'error') {
      setSnackbarMessage('An error occurred while adding the assignment. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }

    if (addQuestionnaireStatus === 'success') {
      setSnackbarMessage('Questionnaire added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      dispatch(fetchQuestionnaire(id));
    } else if (addQuestionnaireStatus === 'error') {
      setSnackbarMessage(addQuestionnaireError);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }

    // Reset the status after displaying the message
    dispatch(resetStatus());
    dispatch(resetaddAssignmentStatus());
    dispatch(resetaddQuestionnaireStatus());
    dispatch(resetaddCourseStatus());
  }, [addCourseStatus, status, addAssignmentstatus, addQuestionnaireStatus]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClick = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalContent(null);
  };
  const isLoading =
    quizLoading || addQuestionnaireLoading || addAssignmentLoading || addCourseLoading;
  return (
    <AdminLayout>
      <Grid display="flex" flexWrap="wrap" gap="10px">
        {/* Create Quiz */}
        <StyledCard style={{ background: hoveredCard?.type === 'quiz' ? '#fff' : 'none' }}>
          <HopsButton
            title="CREATE QUIZZES"
            icon={AddIcon}
            onClick={() => handleClick(<AddQuizForm CloseModal={handleClose} />)}
            backgroundColor="#FFA500"
            boxShadowColor="#D46F1E"
          />
          <Grid
            my={2}
            style={{
              backgroundColor: '#0000',
              borderRadius: '20px',
              padding: '0px 10px',
            }}
          >
            {loading && <CircularProgress style={{ color: '#FFA500', margin: '5% 40%' }} />}
            {quizs.notFound ? (
              <Typography>Quiz data not available</Typography>
            ) : (
              quizs.length > 0 &&
              quizs?.map((quiz, index) => (
                <Grid
                  my={2}
                  key={index}
                  onMouseEnter={() => setHoveredCard({ type: 'quiz', index })}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: '20px',
                    boxShadow:
                      hoveredCard?.type === 'quiz' && hoveredCard.index === index
                        ? ' 0px 4px 3px #FFA500'
                        : 'none',
                    transition: 'box-shadow 0.3s ease-in-out',
                    border:
                      hoveredCard?.type === 'quiz' && hoveredCard.index === index
                        ? '1px solid #FFA500'
                        : 'none',
                    backgroundColor:
                      hoveredCard?.type === 'quiz' && hoveredCard.index === index
                        ? '#fff'
                        : '#FFEDDF',
                  }}
                >
                  <CreateQuiz
                    key={index}
                    id={quiz.id}
                    count={index + 1}
                    heading={quiz.title}
                    duration={quiz.duration}
                    question={quiz.question_count}
                    color="#6E4100"
                    isHovered={hoveredCard?.type === 'quiz' && hoveredCard.index === index}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </StyledCard>
        {/* Create Questionnaire */}
        <StyledCard style={{ background: hoveredCard?.type === 'questionnaire' ? '#fff' : 'none' }}>
          <HopsButton
            title="CREATE QUESTIONNAIRE"
            icon={AddIcon}
            onClick={() => handleClick(<AddQuestionnaire CloseModal={handleClose} />)}
            backgroundColor="#4CAF50"
            boxShadowColor="#39853C"
          />
          <Grid
            my={2}
            style={{
              backgroundColor: '#0000',
              borderRadius: '20px',
              padding: '0px 10px',
            }}
          >
            {questionnaireLoading && (
              <CircularProgress style={{ color: '#4CAF50', margin: '5% 40%' }} />
            )}
            {questionnaires?.notFound ? (
              <Typography>Questionnaire data not available</Typography>
            ) : (
              questionnaires.length > 0 &&
              questionnaires?.map((questionnaire, index) => (
                <Grid
                  my={2}
                  key={index}
                  onMouseEnter={() => setHoveredCard({ type: 'questionnaire', index })}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: '20px',
                    boxShadow:
                      hoveredCard?.type === 'questionnaire' && hoveredCard.index === index
                        ? ' 0px 4px 3px #4CAF50'
                        : 'none',
                    transition: 'box-shadow 0.3s ease-in-out',
                    border:
                      hoveredCard?.type === 'questionnaire' && hoveredCard.index === index
                        ? '1px solid #4CAF50'
                        : 'none',
                    backgroundColor:
                      hoveredCard?.type === 'questionnaire' && hoveredCard.index === index
                        ? '#fff'
                        : '#EBF8F5',
                  }}
                >
                  <CreateQuestionnaire
                    key={index}
                    count={index + 1}
                    id={questionnaire.id}
                    heading={questionnaire.title} // Use appropriate field for heading
                    color="#5A745B"
                    isHovered={hoveredCard?.type === 'questionnaire' && hoveredCard.index === index}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </StyledCard>
        {/* Create Assignment */}
        <StyledCard style={{ background: hoveredCard?.type === 'assignment' ? '#fff' : 'none' }}>
          <HopsButton
            title="CREATE ASSIGNMENTS"
            icon={AddIcon}
            onClick={() => handleClick(<AddAssignment CloseModal={handleClose} />)}
            backgroundColor="#03A9F4"
            boxShadowColor="#107EB0"
          />
          <Grid
            my={2}
            style={{
              backgroundColor: '#0000',
              borderRadius: '20px',
              padding: '0px 10px',
            }}
          >
            {assignmentLoading && (
              <CircularProgress style={{ color: '#03A9F4', margin: '5% 40%' }} />
            )}
            {!assignmentLoading && !assignments?.length && (
              <Typography>Assignment data not available</Typography>
            )}
            {assignments.length > 0 &&
              assignments?.map((assignment, index) => (
                <Grid
                  my={2}
                  key={index}
                  onMouseEnter={() => setHoveredCard({ type: 'assignment', index })}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: '20px',
                    boxShadow:
                      hoveredCard?.type === 'assignment' && hoveredCard.index === index
                        ? ' 0px 4px 3px #03A9F4'
                        : 'none',
                    transition: 'box-shadow 0.3s ease-in-out',
                    border:
                      hoveredCard?.type === 'assignment' && hoveredCard.index === index
                        ? '1px solid #03A9F4'
                        : 'none',
                    backgroundColor:
                      hoveredCard?.type === 'assignment' && hoveredCard.index === index
                        ? '#fff'
                        : '#E2F3FF',
                  }}
                >
                  <CreateAssignment
                    key={index}
                    count={index + 1}
                    id={assignment.id}
                    heading={assignment.title}
                    color="#0B719F"
                    isHovered={hoveredCard?.type === 'assignment' && hoveredCard.index === index}
                  />
                </Grid>
              ))}
          </Grid>
        </StyledCard>
        {/* Create Course */}
        <StyledCard style={{ background: hoveredCard?.type === 'course' ? '#fff' : 'none' }}>
          <HopsButton
            title="CREATE COURSE"
            icon={AddIcon}
            onClick={() => handleClick(<AddCourse CloseModal={handleClose} />)}
            backgroundColor="#616161"
            boxShadowColor="#484040"
          />
          <Grid
            my={2}
            style={{
              backgroundColor: '#0000',
              borderRadius: '20px',
              padding: '0px 10px',
            }}
          >
            {courseLoading && <CircularProgress style={{ color: '#606C80', margin: '5% 40%' }} />}
            {!courseLoading && !courses?.length && (
              <Typography>Course data not available</Typography>
            )}
            {courses.length > 0 &&
              courses?.map((course, index) => (
                <Grid
                  my={2}
                  key={index}
                  onMouseEnter={() => setHoveredCard({ type: 'course', index })}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: '20px',
                    boxShadow:
                      hoveredCard?.type === 'course' && hoveredCard.index === index
                        ? ' 0px 4px 3px #616161'
                        : 'none',
                    transition: 'box-shadow 0.3s ease-in-out',
                    border:
                      hoveredCard?.type === 'course' && hoveredCard.index === index
                        ? '1px solid #616161'
                        : 'none',
                    backgroundColor:
                      hoveredCard?.type === 'course' && hoveredCard.index === index
                        ? '#fff'
                        : '#F0F1F9',
                  }}
                >
                  <CreateCourse
                    key={index}
                    count={index + 1}
                    id={course.id}
                    heading={course.title}
                    color="#606C80"
                    isHovered={hoveredCard?.type === 'course' && hoveredCard.index === index}
                  />
                </Grid>
              ))}
          </Grid>
        </StyledCard>
      </Grid>
      <ModalOpen AddContent={modalContent} OpenModal={modalOpen} />

      {isLoading && <Loader />}
      {/* Snackbar Component */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </AdminLayout>
  );
};

Hops.propTypes = {
  data: PropTypes.node,
};

export default Hops;
