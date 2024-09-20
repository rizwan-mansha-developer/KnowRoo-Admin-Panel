import PropTypes from 'prop-types';
import { Box, Button, IconButton, TextField, Tooltip, useMediaQuery } from '@mui/material';
import React from 'react';
import PlusIcon from '../../assets/FormsIcon/AddIcon copy.svg';
import { SearchContainer, Search, SearchIconWrapper, StyledInputBase } from './Style';
import SearchIcon from '../../assets/navbarIcon/search-normal.svg';
import Cookies from 'js-cookie';
const SearchBar = ({ ButtonText, SetSearch, toggleDoorBar, PlaceholderText }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const roleId = parseInt(Cookies.get('role_id'));
  return (
    <Box
      mx={0}
      mb={2}
      pr={0}
      borderRadius="20px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <SearchContainer
        style={{
          width:
            roleId === 1 || roleId === 2
              ? '80%'
              : isSmallScreen
                ? '70%'
                : ButtonText === 'Add Leaps' || ButtonText === 'Add Hops'
                  ? '80%'
                  : isSmallScreen
                    ? '70%'
                    : '100%',
        }}
      >
        <Search>
          <SearchIconWrapper>
            <img src={SearchIcon} alt="Search Icon" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search...."
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => SetSearch(e.target.value)}
          />
        </Search>
      </SearchContainer>
      {roleId === 1 || roleId === 2 ? (
        <Tooltip title={isSmallScreen ? ButtonText : ''}>
          <Button
            onClick={toggleDoorBar}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#FFA500',
              padding: 'auto',
              width: isSmallScreen ? 'auto' : 'auto',
              alignItems: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: isSmallScreen ? '11px' : '15px',
              whiteSpace: 'nowrap',
            }}
            startIcon={<img src={PlusIcon} alt="+" />}
          >
            {ButtonText}
          </Button>
        </Tooltip>
      ) : ButtonText === 'Add Leaps' || ButtonText === 'Add Hops' ? (
        <Tooltip title={isSmallScreen ? ButtonText : ''}>
          <Button
            onClick={toggleDoorBar}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#FFA500',
              padding: 'auto',
              width: isSmallScreen ? 'auto' : 'auto',
              alignItems: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: isSmallScreen ? '11px' : '15px',
              whiteSpace: 'nowrap',
            }}
            startIcon={<img src={PlusIcon} alt="+" />}
          >
            {ButtonText}
          </Button>
        </Tooltip>
      ) : null}
    </Box>
  );
};

SearchBar.propTypes = {
  ButtonText: PropTypes.string.isRequired,
  SetSearch: PropTypes.func,
  toggleDoorBar: PropTypes.func.isRequired,
  PlaceholderText: PropTypes.string.isRequired,
};

export default SearchBar;
