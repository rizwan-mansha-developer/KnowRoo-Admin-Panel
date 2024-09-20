import { Box, Typography, Avatar, List, ListItem, useMediaQuery, Alert } from '@mui/material';
// import CustomListItem from "./CustomizeListItem/CustomListItem";
import HeadingIcon from '../../../assets/LBIcon/HeadingIcon.svg';
import YellowMedal from '../../../assets/LBIcon/YellowMedal.svg';
import RankIcon from '../../../assets/LBIcon/RankIcon.svg';
import ProfileAvatar from '../../../assets/LBIcon/LeaderImage.png';
import AvatarImage1 from '../../../assets/LBIcon/AvatarImage1.png';
import AvatarImage2 from '../../../assets/LBIcon/AvatarImage2.png';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import NotFoundIcon from '../../../assets/CardsIcon/notFound.svg';
import CustomListItem from '../CustomList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMobsLeaderBoard } from '../../../redux/slices/MobsLeaderBoard';
import { Img_BASE_URL } from '../../../config/apiConfig';
import Loader from '../../Skeleton/Loader';

const LeapsLeaderBoard = ({ id, CloseModal }) => {
  // const handleClick = () => {
  //     console.log("Clicked");
  // };
  const dispatch = useDispatch();
  const { mobsLeaderBoard = [], loading, error } = useSelector((state) => state.mobsLeaderBoard);
  const LeapId = `class_id=${id}`;
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  useEffect(() => {
    dispatch(fetchMobsLeaderBoard(LeapId));
  }, []);

  const Data = [
    { name: 'Boss', points: 90, image: AvatarImage1 },
    { name: 'Ahmed Ali', points: 80, image: AvatarImage2 },
  ];
  return (
    <>
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: IsMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'absolute',
          top: '1%',
          right: '1%',
        }}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Box
          minHeight="200px"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            flexDirection: 'column',
            // marginLeft: isMobile ? '20%' : '40%',
          }}
        >
          <img src={NotFoundIcon} />
          <p>Leaps Leaderboard not found</p>
        </Box>
      ) : (
        <Box
          width={'100%'}
          paddingY={4}
          paddingX={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={2}
          bgcolor={'#e6f7fe'}
          borderRadius={10}
          boxShadow={'0 2px 10px rgba(0, 0, 0, 0.1)'}
        >
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Typography variant="h2" fontSize={18} fontWeight={'bold'}>
              Leaps Leaderboard
            </Typography>
            <img src={HeadingIcon} alt="" width={'30px'} height={'30px'} />
          </Box>
          {/* <Box
                    onClick={handleClick}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    position={"relative"}
                    marginTop={3}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    <img
                        src={YellowMedal}
                        alt=""
                        width={"40px"}
                        height={"40px"}
                        style={{ position: "absolute", zIndex: 1, top: "-25px" }}
                    />
                    <Avatar
                        src={ProfileAvatar}
                        sx={{
                            width: "100px",
                            height: "100px",
                            border: "3px solid #03A9F4",
                        }}
                    />
                    <img
                        src={RankIcon}
                        alt=""
                        width={"40px"}
                        height={"40px"}
                        style={{ position: "absolute", zIndex: 1, bottom: "-25px" }}
                    />
                </Box> */}
          <Box marginTop={2} width={'100%'}>
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mobsLeaderBoard?.map((item, index) => (
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
      )}
    </>
  );
};

export default LeapsLeaderBoard;
