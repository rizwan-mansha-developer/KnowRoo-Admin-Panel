import React, { useEffect, useState } from 'react';
import DataTable from '../../../../components/DataTable/Index';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { fetchUser } from '../../../../redux/slices/UserSlice';
import TeacherTableHeader from '../../../../utils/header/TeacherTableHeader';
import CloseIcon from '../../../../assets/FormsIcon/CloseIcon.svg';
import { Box, useMediaQuery } from '@mui/system';
import { Typography } from '@mui/material';
import ModalOpen from '../../../../components/Modal/Modal';
import { fetchquizUser } from '../../../../redux/slices/UserByQuiz';
import { QuizResult } from './QuizResult';
function QuizTable({ id, CloseModal }) {
  const dispatch = useDispatch();
  const { quizUser = [], loading, error } = useSelector((state) => state.quizUser);
  const schoolId = Cookies.get('schoolId');
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(false);
  useEffect(() => {
    dispatch(fetchquizUser(id));
  }, [id]);

  const handleModalOpen = (id) => {
    setOpenModal(true);
    setUserId(id);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <span>Check Assignment</span>
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
      <DataTable
        data={quizUser}
        header={TeacherTableHeader}
        handleView={handleModalOpen}
        loading={loading}
        error={error}
      />
      <ModalOpen
        AddContent={<QuizResult userId={userId} id={id} CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={openModal}
        bgColor
      />
    </Box>
  );
}

export default QuizTable;
