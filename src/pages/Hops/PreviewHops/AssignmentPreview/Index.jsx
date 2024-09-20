// import React, { useEffect, useState } from 'react';
// import { Typography, Box, useMediaQuery, Button } from '@mui/material';
// import BlueStarIcon from '../../../../assets/FormsIcon/blueStar.svg';
// import ImgIcon from '../../../../assets/FormsIcon/img.svg';
// import VideoIcon from '../../../../assets/FormsIcon/video.svg';
// import DocIcon from '../../../../assets/FormsIcon/pdf.svg';
// import CalenderIcon2 from '../../../../assets/CardsIcon/calendar.svg';
// import CloseIcon from '../../../../assets/FormsIcon/CloseIcon.svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchviewAssignment } from '../../../../redux/slices/ViewAssignment';
// import { Img_BASE_URL } from '../../../../config/apiConfig';
// import { StyledDeadlineBox, StyledTimeBox } from './Style';
// import { convertUTCToLocal } from '../../../../utils/convertUTCToLocal';
// import AdminLayout from '../../../../layouts/AdminLayout';
// import { useLocation } from 'react-router-dom';

// function ViewAssignment({ CloseModal }) {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [id, setId] = useState(location.state?.id || sessionStorage.getItem('assignmentId'));
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
//   const [selectedMedia, setSelectedMedia] = useState(null); // State to track selected media
//   const { viewAssignment = {}, loading, error } = useSelector((state) => state.viewAssignment);

//   useEffect(() => {
//     dispatch(fetchviewAssignment(id));
//   }, [dispatch, id]);

//   const handleIconClick = (mediaType) => {
//     setSelectedMedia(mediaType);
//   };

//   const getFileType = (fileUrl) => {
//     const fileExtension = fileUrl.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) return 'image';
//     if (['mp4', 'mov', 'avi'].includes(fileExtension)) return 'video';
//     if (['pdf', 'doc', 'docx'].includes(fileExtension)) return 'document';
//     return 'unknown';
//   };

//   const fileType = getFileType(`${Img_BASE_URL}/${viewAssignment.resource}`);

//   const iconStyle = {
//     width: '10%',
//     cursor: 'pointer',
//     opacity: selectedMedia === fileType || !selectedMedia ? 1 : 0.5,
//   };

//   const utcDateFromDB = viewAssignment.due_date;
//   const { date, time } = convertUTCToLocal(utcDateFromDB);

//   return (
//     <AdminLayout>
//       <Box bgcolor="#fff" borderRadius="12px" pt={2} pb={2} >
//         <Typography
//           variant="h1"
//           gutterBottom
//           sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
//         >
//           {viewAssignment.title}
//         </Typography>

//         <img
//           onClick={CloseModal}
//           src={CloseIcon}
//           alt="Close Icon"
//           style={{
//             width: isMobile ? '25px' : '40px',
//             cursor: 'pointer',
//             position: 'absolute',
//             top: '2%',
//             right: '2%',
//           }}
//         />

//         <Box display='flex' justifyContent='center' gap={2} textAlign='center'>
//           <Typography
//             pr={14}
//             pl={1.5}
//             py={0.6}
//             mb={2}
//             style={{
//               fontSize: '16px',
//               background: '#F4F4F6',
//               color: '#03A9F4',
//               borderRadius: '12px',
//               textAlign: 'center',
//               width: '80px',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             <img src={BlueStarIcon} style={{ marginRight: '10px' }} />
//             {viewAssignment.total_marks}
//           </Typography>

//           <StyledDeadlineBox>
//             <img src={CalenderIcon2} alt="Deadline" width={'18px'} height={'18px'} />
//             <Typography variant="caption" fontSize={10} fontWeight={'bold'} color={'#FF0000'}>
//               {date}
//             </Typography>
//             <StyledTimeBox fontSize="10px">{time}</StyledTimeBox>
//           </StyledDeadlineBox>
//           <Button style={{ height: "20px", color: "#ff9800", fontWeight: "bold" }} background="#fffaf6" >Check Assignment</Button>
//         </Box>
//         <Typography variant="body1" textAlign="center" mb={2}>
//           {viewAssignment.description}
//         </Typography>

//         <Box display="flex" justifyContent="center" gap={3}>
//           {fileType === 'image' && (
//             <img
//               src={ImgIcon}
//               alt="Image Upload"
//               style={iconStyle}
//               onClick={() => handleIconClick('image')}
//             />
//           )}

//           {fileType === 'video' && (
//             <img
//               src={VideoIcon}
//               alt="Video Upload"
//               style={iconStyle}
//               onClick={() => handleIconClick('video')}
//             />
//           )}

//           {fileType === 'document' && (
//             <img
//               src={DocIcon}
//               alt="Document Upload"
//               style={iconStyle}
//               onClick={() => handleIconClick('document')}
//             />
//           )}
//         </Box>

//         {/* Conditional rendering of the preview based on the selected media */}
//         <Box mt={3} display="flex" justifyContent="center">
//           {selectedMedia === 'image' && (
//             <img
//               src={`${Img_BASE_URL}/${viewAssignment.resource}`}
//               alt="Selected Image"
//               style={{ maxWidth: '400px', height: "300px" }}
//             />
//           )}
//           {selectedMedia === 'video' && (
//             <video controls style={{ maxWidth: '100%' }}>
//               <source src={`${Img_BASE_URL}/${viewAssignment.resource}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//           {selectedMedia === 'document' && (
//             <iframe
//               src={`${Img_BASE_URL}/${viewAssignment.resource}`}
//               style={{ width: '100%', height: '500px' }}
//               title="Document Preview"
//             ></iframe>
//           )}
//         </Box>
//       </Box>
//     </AdminLayout>
//   );
// }

// export default ViewAssignment;

import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery, Button, CircularProgress, Alert } from '@mui/material';
import BlueStarIcon from '../../../../assets/FormsIcon/blueStar.svg';
import ImgIcon from '../../../../assets/FormsIcon/img.svg';
import VideoIcon from '../../../../assets/FormsIcon/video.svg';
import DocIcon from '../../../../assets/FormsIcon/pdf.svg';
import CalenderIcon2 from '../../../../assets/CardsIcon/calendar.svg';
import CloseIcon from '../../../../assets/FormsIcon/CloseIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchviewAssignment } from '../../../../redux/slices/ViewAssignment';
import { Img_BASE_URL } from '../../../../config/apiConfig';
import { StyledDeadlineBox, StyledTimeBox } from './Style';
import { convertUTCToLocal } from '../../../../utils/convertUTCToLocal';
import AdminLayout from '../../../../layouts/AdminLayout';
import { useLocation } from 'react-router-dom';
import ModalOpen from '../../../../components/Modal/Modal';

import AssignmentTable from './AssignmentTable';
// import { PDFViewer } from '../../../../utils/pdfViewer';
import { PDFViewer } from './../../../../utils/pdfViewer';
import Loader from '../../../../components/Skeleton/Loader';

function ViewAssignment({ CloseModal }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [id, setId] = useState(location.state?.id || sessionStorage.getItem('assignmentId'));
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [openModal, setOpenModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const { viewAssignment = {}, loading, error } = useSelector((state) => state.viewAssignment);

  useEffect(() => {
    // dispatch(fetchUser(schoolId));

    dispatch(fetchviewAssignment(id));
  }, [dispatch, id]);

  // console.log(user);

  useEffect(() => {
    if (viewAssignment.resource) {
      const fileType = getFileType(`${Img_BASE_URL}/${viewAssignment.resource}`);
      setSelectedMedia(fileType);
    }
  }, [viewAssignment]);

  const handleIconClick = (mediaType) => {
    setSelectedMedia(mediaType);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const getFileType = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) return 'image';
    if (['mp4', 'mov', 'avi'].includes(fileExtension)) return 'video';
    if (['pdf'].includes(fileExtension)) return 'pdf';
    if (['doc', 'docx'].includes(fileExtension)) return 'word';
    if (['csv'].includes(fileExtension)) return 'csv';
    return 'unknown';
  };

  const iconStyle = {
    width: '10%',
    cursor: 'pointer',
    opacity: selectedMedia ? 1 : 0.5,
  };

  const utcDateFromDB = viewAssignment.due_date;

  const { date, time } = convertUTCToLocal(utcDateFromDB);

  const url = `${Img_BASE_URL}/${viewAssignment.resource}`;

  return (
    <AdminLayout>
      <Box bgcolor="#fff" borderRadius="12px" pt={2} pb={2}>
        {loading && <Loader />}

        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        <Typography
          variant="h1"
          gutterBottom
          sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
        >
          {viewAssignment.title}
        </Typography>

        <img
          onClick={CloseModal}
          src={CloseIcon}
          alt="Close Icon"
          style={{
            width: isMobile ? '25px' : '40px',
            cursor: 'pointer',
            position: 'absolute',
            top: '2%',
            right: '2%',
          }}
        />

        <Box display="flex" justifyContent="center" gap={2} textAlign="center">
          <Typography
            pr={14}
            pl={1.5}
            py={0.6}
            mb={2}
            style={{
              fontSize: '16px',
              background: '#F4F4F6',
              color: '#03A9F4',
              borderRadius: '12px',
              textAlign: 'center',
              width: '80px',
              whiteSpace: 'nowrap',
            }}
          >
            <img src={BlueStarIcon} style={{ marginRight: '10px' }} />
            {viewAssignment.total_marks}
          </Typography>

          <StyledDeadlineBox>
            <img src={CalenderIcon2} alt="Deadline" width={'18px'} height={'18px'} />
            <Typography variant="caption" fontSize={10} fontWeight={'bold'} color={'#FF0000'}>
              {date}
            </Typography>
            <StyledTimeBox fontSize="10px">{time}</StyledTimeBox>
          </StyledDeadlineBox>

          <Button
            onClick={handleModalOpen}
            style={{ height: '20px', color: '#ff9800', fontWeight: 'bold' }}
            background="#fffaf6"
          >
            Check Assignment
          </Button>
        </Box>
        <Typography variant="body1" textAlign="center" mb={2}>
          {viewAssignment.description}
        </Typography>

        {/* <Box display="flex" justifyContent="center" gap={3}>
          {viewAssignment.resource && selectedMedia === 'image' && (
            <img
              src={ImgIcon}
              alt="Image Upload"
              style={iconStyle}
              onClick={() => handleIconClick('image')}
            />
          )}

          {viewAssignment.resource && selectedMedia === 'video' && (
            <img
              src={VideoIcon}
              alt="Video Upload"
              style={iconStyle}
              onClick={() => handleIconClick('video')}
            />
          )}

          {viewAssignment.resource && selectedMedia === 'document' && (
            <img
              src={DocIcon}
              alt="Document Upload"
              style={iconStyle}
              onClick={() => handleIconClick('document')}
            />
          )}
        </Box> */}

        {/* Conditional rendering of the preview based on the selected media */}
        <Box mt={3} display="flex" justifyContent="center">
          {selectedMedia === 'image' && (
            <img
              src={`${Img_BASE_URL}/${viewAssignment.resource}`}
              alt="Selected Image"
              style={{ maxWidth: '400px', height: '300px' }}
            />
          )}
          {selectedMedia === 'video' && (
            <video controls style={{ maxWidth: '100%' }}>
              <source src={`${Img_BASE_URL}/${viewAssignment.resource}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {selectedMedia === 'pdf' && (
            <iframe
              src={`${Img_BASE_URL}/${viewAssignment.resource}`}
              title="Document Preview"
              key={viewAssignment.resource}
              style={{ width: '70%', height: '400px' }}
            />
          )}

          {selectedMedia === 'word' && (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${Img_BASE_URL}/${viewAssignment.resource}`)}`}
              style={{ width: '100%', height: '500px' }}
              title="Word Document Preview"
            ></iframe>
          )}
          {selectedMedia === 'csv' && (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(`${Img_BASE_URL}/${viewAssignment.resource}`)}&embedded=true`}
              style={{ width: '100%', height: '500px' }}
              title="CSV Preview"
            ></iframe>
          )}
          {selectedMedia === 'unknown' && (
            <Typography variant="body2" color="error">
              Cannot preview this file type.
            </Typography>
          )}
        </Box>
      </Box>
      <ModalOpen
        AddContent={<AssignmentTable id={id} CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={openModal}
        bgColor
      />
    </AdminLayout>
  );
}

export default ViewAssignment;
