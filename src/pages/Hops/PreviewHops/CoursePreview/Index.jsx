import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery } from '@mui/material';
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
import { fetchviewCourse } from '../../../../redux/slices/ViewCourse';

function ViewCourse({ id, CloseModal }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [selectedMedia, setSelectedMedia] = useState(null); // State to track selected media
  const dispatch = useDispatch();
  const { viewCourse = {}, loading, error } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    dispatch(fetchviewCourse(id));
  }, [dispatch, id]);

  const handleIconClick = (mediaType) => {
    setSelectedMedia(mediaType);
  };

  const getFileType = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) return 'image';
    if (['mp4', 'mov', 'avi'].includes(fileExtension)) return 'video';
    if (['pdf', 'doc', 'docx'].includes(fileExtension)) return 'document';
    return 'unknown';
  };

  const fileType = getFileType(`${Img_BASE_URL}/${viewCourse.material}`);

  const iconStyle = {
    width: '10%',
    cursor: 'pointer',
    opacity: selectedMedia === fileType || !selectedMedia ? 1 : 0.5,
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <span>{viewCourse.title}</span>
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

      <Typography variant="body1" textAlign="center">
        {viewCourse.description}
      </Typography>

      <Box display="flex" justifyContent="center" gap={3}>
        {fileType === 'image' && (
          <img
            src={ImgIcon}
            alt="Image Upload"
            style={iconStyle}
            onClick={() => handleIconClick('image')}
          />
        )}

        {fileType === 'video' && (
          <img
            src={VideoIcon}
            alt="Video Upload"
            style={iconStyle}
            onClick={() => handleIconClick('video')}
          />
        )}

        {fileType === 'document' && (
          <img
            src={DocIcon}
            alt="Document Upload"
            style={iconStyle}
            onClick={() => handleIconClick('document')}
          />
        )}
      </Box>

      {/* Conditional rendering of the preview based on the selected media */}
      <Box mt={3} display="flex" justifyContent="center">
        {selectedMedia === 'image' && (
          <img
            src={`${Img_BASE_URL}/${viewCourse.material}`}
            alt="Selected Image"
            style={{ maxWidth: '100%' }}
          />
        )}
        {selectedMedia === 'video' && (
          <video controls style={{ maxWidth: '100%' }}>
            <source src={`${Img_BASE_URL}/${viewCourse.material}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {selectedMedia === 'document' && (
          <iframe
            src={`${Img_BASE_URL}/${viewCourse.material}`}
            style={{ width: '100%', height: '300px' }}
            title="Document Preview"
          ></iframe>
        )}
      </Box>
    </Box>
  );
}

export default ViewCourse;
