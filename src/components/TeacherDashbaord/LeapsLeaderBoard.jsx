import { Box, Typography, Avatar, List, ListItem, useMediaQuery } from '@mui/material';
import CustomListItem from './CustomizeListItem/CustomListItem';
import HeadingIcon from '../../assets/LBIcon/HeadingIcon.svg';
import YellowMedal from '../../assets/LBIcon/YellowMedal.svg';
import RankIcon from '../../assets/LBIcon/RankIcon.svg';
import ProfileAvatar from '../../assets/LBIcon/LeaderImage.png';
import AvatarImage1 from '../../assets/LBIcon/AvatarImage1.png';
import AvatarImage2 from '../../assets/LBIcon/AvatarImage2.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMobsLeaderBoard } from '../../redux/slices/MobsLeaderBoard';
import { Img_BASE_URL } from '../../config/apiConfig';
import { useEffect } from 'react';
const LeapsDashbaordLeaderBoard = ({ id }) => {
  const dispatch = useDispatch();
  const { mobsLeaderBoard = [], loading, error } = useSelector((state) => state.mobsLeaderBoard);
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const MobId = `group_id=${id}`;
  useEffect(() => {
    dispatch(fetchMobsLeaderBoard(MobId));
  }, []);

  const handleClick = () => {
    console.log('Clicked');
  };

  const Data = [
    { name: 'Abbas Ali', points: 90, image: AvatarImage1 },
    { name: 'Muneeb Ali', points: 80, image: AvatarImage2 },
    { name: 'Mahnoor', points: 70, image: AvatarImage1 },
    { name: 'Rizwan', points: 60, image: AvatarImage2 },
    { name: 'Mehboob', points: 50, image: AvatarImage1 },
  ];

  return (
    <>
      <Box
        width={'330px'}
        paddingY={4}
        paddingX={4}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        bgcolor={'#FFFFFF'}
        borderRadius={10}
        boxShadow={'0 2px 10px rgba(0, 0, 0, 0.1)'}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Typography variant="h2" fontSize={18} fontWeight={'bold'}>
            Top Mobs Leaderboard
          </Typography>
          <img src={HeadingIcon} alt="" width={'30px'} height={'30px'} />
        </Box>
        <Box
          onClick={handleClick}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
          marginTop={3}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <img
            src={YellowMedal}
            alt=""
            width={'40px'}
            height={'40px'}
            style={{ position: 'absolute', zIndex: 1, top: '-25px' }}
          />
          <Avatar
            src={ProfileAvatar}
            sx={{
              width: '100px',
              height: '100px',
              border: '3px solid #03A9F4',
            }}
          />
          <img
            src={RankIcon}
            alt=""
            width={'40px'}
            height={'40px'}
            style={{ position: 'absolute', zIndex: 1, bottom: '-25px' }}
          />
        </Box>
        <Box marginTop={2} width={'100%'}>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mobsLeaderBoard.map((item, index) => (
              <ListItem sx={{ padding: 0 }}>
                <CustomListItem
                  index={index + 1}
                  name={`${item.user.fname} ${item.user.lname}`}
                  image={`${Img_BASE_URL}/${item.user.profile_picture}`}
                  points={item.total_points}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default LeapsDashbaordLeaderBoard;
