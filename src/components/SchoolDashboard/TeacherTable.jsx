import React, { useEffect, useState } from 'react';
// import DataTable from '../../../../components/DataTable/Index';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
// import { fetchUser } from '../../../../redux/slices/UserSlice';
// import TeacherTableHeader from '../../../../utils/header/TeacherTableHeader';
// import CloseIcon from '../../../../assets/FormsIcon/CloseIcon.svg';
import { Box, useMediaQuery } from '@mui/system';
import { Typography } from '@mui/material';
// import ModalOpen from '../../../../components/Modal/Modal';
// import { fetchquizUser } from '../../../../redux/slices/UserByQuiz';
// import { QuizResult } from './QuizResult';
import DataTable from '../DataTable/Index';
import TeacherTableHeader from '../../utils/header/TeacherTableHeader';
import SchoolDashboardTable from '../../utils/header/DashboardHeader';
function TeacherTable({ id, data }) {
  const dispatch = useDispatch();
  const { quizUser = [], loading, error } = useSelector((state) => state.quizUser);
  const schoolId = Cookies.get('schoolId');
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(false);

  const handleModalOpen = (id) => {
    setOpenModal(true);
    // setUserId(id);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box width={'auto'}>
      <DataTable
        data={data}
        header={SchoolDashboardTable}
        handleView={handleModalOpen}
        loading={loading}
        error={error}
      />
      {/* <ModalOpen
                AddContent={<QuizResult userId={userId} id={id} CloseModal={handleModalClose} />}
                CloseModal={handleModalClose}
                OpenModal={openModal}
                bgColor
            /> */}
    </Box>
  );
}

export default TeacherTable;
