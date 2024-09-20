import { Card, Container, Box, Typography, Grid } from '@mui/material';
import LoginForm from './LoginForm';
import KnowrooLogo from '../../../assets/SidebarLogo.svg';

export const LoginContainer = () => {
  return (
    <Grid
      sx={{
        width: 'auto',
        height: '97vh',
        background: 'linear-gradient(to bottom, #4CAF50 50%, #F9FFF9 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '-8px',
      }}
    >
      <Card
        sx={{
          width: '420px',
          height: 'auto',
          paddingY: '20px',
          backgroundColor: 'white',
          boxShadow: '0px 1px 5px -1px #000000',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={KnowrooLogo}
          alt=""
          style={{ width: '100px', height: '50px', marginBottom: '30px' }}
        />
        <Typography variant="body1" color={'#616161'}>
          Welcome 🖐
        </Typography>
        <Typography variant="h2" color={'#616161'} fontSize={'25px'} fontWeight={'bold'}>
          Login to your <span style={{ color: '#03A9F4' }}>Account</span>
        </Typography>
        <LoginForm />
      </Card>
    </Grid>
  );
};
