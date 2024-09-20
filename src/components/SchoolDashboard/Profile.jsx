import { Container, Box, Typography, Avatar, Button } from '@mui/material';
// import ProfileAvatar from "../../assets/ProfileAvatar.png";
// import CardImage from '../../assets/CardImage.png'

const Profile = ({ pic, username, schoolName }) => {
  return (
    <>
      <Box
        width={'310px'}
        height={'250px'}
        paddingX={1}
        paddingY={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        bgcolor={'white'}
        borderRadius={8}
      >
        <Box width={'350px'} height={'90%'} display={'flex'}>
          <Avatar
            src={pic}
            sx={{
              width: '80px',
              height: '80px',
              border: '3px solid #F5F5F5',
              bgcolor: '#DAD0FC',
            }}
          />
          <Box
            width={'270px'}
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box width={'90%'}>
              <Typography variant="h2" fontSize={20} color={'#616161'} fontWeight="bold">
                Welcome <span style={{ fontWeight: 'bold', color: '#03A9F4' }}>{username}!</span>
              </Typography>
              <Typography variant="body2" fontSize={12} fontWeight={'bold'} color={'#C4C4C4'}>
                Admin of <span style={{ color: '#4CAF50' }}>{schoolName}</span>
              </Typography>
              <Typography
                variant="body1"
                fontSize={16}
                marginTop={4}
                fontWeight={'bold'}
                color={'#373737'}
              >
                Your Highest Score
              </Typography>
              <Typography
                variant="h1"
                fontSize={46}
                marginTop={2}
                fontWeight={'bold'}
                color={'#FFA500'}
              >
                86%
              </Typography>
              <Typography variant="body2" fontSize={12} marginTop={1} color={'#C4C4C4'}>
                Latest update:{' '}
                <span style={{ fontWeight: 'bold', color: '#373737' }}>August 20</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box width={'250px'} height={'90%'}>
          {/* <img src={CardImage} alt="" width={"250px"} /> */}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
