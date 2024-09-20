import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { StyledBox, StyledInnerBox, StyledTypography, StyledItemBox } from './Style';
import BlueStar from '../../../../assets/FormsIcon/blueStar.svg';
import YellowStar from '../../../../assets/FormsIcon/yellowStar.svg';
import { fetchviewAssignment } from '../../../../redux/slices/ViewAssignment';
import { useDispatch, useSelector } from 'react-redux';
import { Img_BASE_URL } from '../../../../config/apiConfig';
import CloseIcon from '../../../../assets/FormsIcon/CloseIcon.svg';
import { convertUTCToLocal } from '../../../../utils/convertUTCToLocal';
import InputField from '../../../../components/InputField/Index';
import SubmitButton from '../../../../components/Button/FormButton';
import {
  checkAssignment,
  resetcheckAssignmentStatus,
} from '../../../../redux/postApiSlices/CheckAssignment';

export const SubmitAssignment = ({
  CloseModal,
  id,
  userId,
  file,
  assignmentData,
  loading,
  error,
}) => {
  const dispatch = useDispatch();
  const { checkAssignmentstatus } = useSelector((state) => state.checkAssignment);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [addpoints, setAddPoints] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchviewAssignment(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (checkAssignmentstatus === 'success') {
      dispatch(resetcheckAssignmentStatus());
      CloseModal();
    }
  }, [checkAssignmentstatus]);

  useEffect(() => {
    if (file) {
      const fileType = getFileType(`${Img_BASE_URL}/${file}`);
      setSelectedMedia(fileType);
    }
  }, [file]);

  const getFileType = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) return 'image';
    if (['mp4', 'mov', 'avi'].includes(fileExtension)) return 'video';
    if (['pdf', 'doc', 'docx'].includes(fileExtension)) return 'document';
    return 'unknown';
  };

  const DueDate = assignmentData?.deadline;
  const IssueDate = assignmentData.issue_date;
  const { date: dueDate } = convertUTCToLocal(DueDate);
  const { date: issueDate } = convertUTCToLocal(IssueDate);

  const handleSubmit = () => {
    const submitdata = {
      assignment_id: id,
      user_id: userId,
      result: addpoints,
    };

    dispatch(checkAssignment(submitdata))
      .unwrap()
      .then(() => {
        console.log('Assignment submitted successfully.');
      })
      .catch((error) => {
        console.error('Error submitting assignment:', error);
      });
  };

  return (
    <StyledBox>
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          color: '#FFA500',
          fontSize: isMobile ? '18px' : '22px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {assignmentData.title}
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
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2}>
          <Box mt={isMobile ? 0 : 0} display="flex" justifyContent="center">
            {selectedMedia === 'image' && (
              <img
                src={`${Img_BASE_URL}/${file}`}
                alt="Selected Image"
                style={{ maxWidth: '100%', height: isMobile ? '200px' : '300px' }}
              />
            )}
            {selectedMedia === 'video' && (
              <video controls style={{ maxWidth: '100%' }}>
                <source src={`${Img_BASE_URL}/${file}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {selectedMedia === 'document' && (
              <iframe
                src={`${Img_BASE_URL}/${file}`}
                title="Document Preview"
                key={file}
                style={{ width: '100%', height: '300px' }}
              />
            )}
          </Box>

          <StyledInnerBox>
            <StyledItemBox>
              <Box display="flex" gap={isMobile ? 2 : 18}>
                <StyledTypography variant="h6" color={'#616161'}>
                  Issue Date
                </StyledTypography>

                <StyledTypography variant="h6" color={'#616161'}>
                  Deadline
                </StyledTypography>
              </Box>
              <Box className="item-container">
                {[issueDate, dueDate].map((item) => (
                  <Box className="item" key={item}>
                    <Typography variant="body2" color={'#03A9F4'}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </StyledItemBox>

            <Box
              display="flex"
              gap={isMobile ? 2 : 18}
              width="100%"
              flexDirection={isMobile ? 'column' : 'row'}
            >
              <StyledItemBox width="1/2">
                <StyledTypography variant="h6" color={'#616161'}>
                  Total Points
                </StyledTypography>
                <Box className="full-item">
                  <img src={YellowStar} alt="" />
                  <Typography variant="body2" color={'#FFA500'}>
                    {`${assignmentData.total_points} Points`}
                  </Typography>
                </Box>
              </StyledItemBox>
              <StyledItemBox width="1/2">
                <StyledTypography variant="h6" color={'#616161'}>
                  Passing Points
                </StyledTypography>
                <Box className="full-item">
                  <img src={BlueStar} alt="" />
                  <Typography variant="body2" color={'#03A9F4'}>
                    {`${assignmentData.passing_points} Points`}
                  </Typography>
                </Box>
              </StyledItemBox>
            </Box>

            <InputField
              name="addpoints"
              label="Add Points"
              variant="outlined"
              placeholder="Enter Gain Points"
              type="number"
              value={addpoints}
              onChange={(e) => setAddPoints(parseInt(e.target.value))}
              error={false}
              startIcon={<img src={BlueStar} />}
              sx={{ width: isMobile ? '100%' : 'auto' }}
            />
            <SubmitButton
              title="Send"
              backgroundColor="#FFA500"
              boxShadowColor="#D46F1E"
              onClick={handleSubmit}
              disable={checkAssignmentstatus ? true : false}
              sx={{ width: isMobile ? '100%' : 'auto' }}
            />
          </StyledInnerBox>
        </Box>
      )}
    </StyledBox>
  );
};
