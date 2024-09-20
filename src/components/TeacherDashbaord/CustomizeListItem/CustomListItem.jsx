import { Box, Typography, Avatar } from '@mui/material';
import MedalIcon from '../../../assets/LBIcon/ListIcon.svg';
import StarsIcon from '../../../assets/LBIcon/star.svg';

import GoldMedal from '../../../assets/LBIcon/goldBatch.svg';
import GoldStars from '../../../assets/LBIcon/goldStar.svg';

import BlueMedal from '../../../assets/LBIcon/blueBatch.svg';
import BlueStars from '../../../assets/LBIcon/blueStar.svg';

import GrayMedal from '../../../assets/LBIcon/grayBatch.svg';
import GrayStars from '../../../assets/LBIcon/grayStar.svg';
// import ProfileAvatar from "../../../../assets/AvatarImage1.png";

const CustomListItem = ({ index, name, points, image }) => {
  const ListNumber = index;

  const getMedalIcon = (index) => {
    switch (index) {
      case 1:
        return MedalIcon;
      case 2:
        return GoldMedal;
      case 3:
        return BlueMedal;
      default:
        return GrayMedal;
    }
  };

  const getStarIcon = (index) => {
    switch (index) {
      case 1:
        return StarsIcon;
      case 2:
        return GoldStars;
      case 3:
        return BlueStars;
      default:
        return GrayStars;
    }
  };

  return (
    <>
      <Box
        width={'100%'}
        height={'60px'}
        bgcolor={'#FFFFFF'}
        borderRadius={3}
        display={'flex'}
        alignItems={'center'}
        gap={2}
        px={2}
        justifyContent={'space-between'}
        sx={{
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 5px #606C80',
          },
        }}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Box
            sx={{
              fontSize: '12px',
              backgroundColor: 'white',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid #E6E6E6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {index}
          </Box>
          <Avatar src={image} sx={{ width: '40px', height: '40px' }} />
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h6" color={'#616161'} fontSize={15} fontWeight={'bold'}>
              {name}
            </Typography>
            <Typography variant="body2" fontWeight="bold" color={'#FFA500'} fontSize={11}>
              {`${points === null ? '0' : points} points`}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <img src={getMedalIcon(ListNumber)} alt="" width={'30px'} height={'30px'} />
        </Box>
      </Box>
    </>
  );
};

export default CustomListItem;
