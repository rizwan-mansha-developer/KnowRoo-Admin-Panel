import { Box, Typography, Avatar } from '@mui/material';
import MedalIcon from '../../../assets/Icons/ListIcon.svg';
import ProfileAvatar from '../../../assets/AvatarImage1.png';

const CustomListItem = ({ position, name, points, image }) => {
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
        justifyContent={'space-between'}
        sx={{
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 5px #606C80',
          },
        }}
      >
        <Box width={'80%'} display={'flex'} alignItems={'center'} gap={1}>
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
              marginLeft: 1,
            }}
          >
            {position}
          </Box>
          <Avatar src={image} sx={{ width: '40px', height: '40px' }} />
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h6" color={'#616161'} fontSize={15} fontWeight={'bold'}>
              {name}
            </Typography>
            <Typography variant="body2" color={'#616161'} fontSize={11}>
              {`${points} points`}
            </Typography>
          </Box>
        </Box>
        <Box width={'20%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <img src={MedalIcon} alt="" width={'30px'} height={'30px'} />
        </Box>
      </Box>
    </>
  );
};

export default CustomListItem;
