import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchviewQuiz } from '../redux/slices/viewQuizSlice';
// import QuestionCard from './QuestionCard';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import QuestionCard from './Question';
import { useLocation } from 'react-router-dom';
import { fetchviewQuiz } from '../../../../redux/slices/ViewQuiz';
import AdminLayout from '../../../../layouts/AdminLayout';
import QuizHeader from './Header';

const QuizQuestions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || sessionStorage.getItem('quizId'));
  const [quizName, setQuizName] = useState(
    location.state?.heading || sessionStorage.getItem('quizName')
  );
  const { viewQuiz, loading, error } = useSelector((state) => state.viewQuiz);

  useEffect(() => {
    dispatch(fetchviewQuiz(id));
  }, [dispatch, id]);

  return (
    <AdminLayout>
      <Box bgcolor="#fff" borderRadius="12px" pt={2} pb={2}>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {!loading && !error && (
          <>
            <Typography variant="h2" textAlign="center" fontWeight="bold" mb={2} color="#FFA500">
              {viewQuiz.title}
            </Typography>
            <QuizHeader viewQuiz={viewQuiz} />
            {/* 
                    <Typography variant="body1">{viewQuiz.description}</Typography> */}
            {viewQuiz.questions && viewQuiz.questions.length > 0 ? (
              viewQuiz.questions.map((question, index) => (
                <QuestionCard key={question.id} question={question} questionIndex={index} />
              ))
            ) : (
              <Typography>No questions available</Typography>
            )}
          </>
        )}
      </Box>
    </AdminLayout>
  );
};

export default QuizQuestions;
