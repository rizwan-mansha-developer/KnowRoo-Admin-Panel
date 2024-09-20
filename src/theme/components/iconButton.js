import colors from '../base/colors';

const { transparent, dark } = colors;

const iconButton = {
  styleOverrides: {
    root: {
      '&:hover': {
        backgroundColor: transparent.main,
        color: dark.main,
      },
    },
    color: '#010032',
  },
};

export default iconButton;
