import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import QuestionCard from './Question';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../../../layouts/AdminLayout';

import { fetchquestionnaireQuestion } from '../../../../redux/slices/ViewQuestionnaire';

const QuestionnaireQuestions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || sessionStorage.getItem('questionnaireId'));
  const [quizName, setQuizName] = useState(
    location.state?.heading || sessionStorage.getItem('questionnaireName')
  );
  const {
    questionnaireQuestion = [],
    loading,
    error,
  } = useSelector((state) => state.questionnaireQuestion);

  useEffect(() => {
    dispatch(fetchquestionnaireQuestion(id));
  }, [dispatch, id]);
  console.log(questionnaireQuestion);

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
            <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
              {questionnaireQuestion.title}
            </Typography>
            {/* <Typography variant="body1">{questionnaireQuestion.description}</Typography> */}
            {questionnaireQuestion.questions && questionnaireQuestion.questions.length > 0 ? (
              questionnaireQuestion.questions.map((question, index) => (
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

export default QuestionnaireQuestions;
