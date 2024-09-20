import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';
import colors from '../../base/colors';
import linearGradient from '../../functions/linearGradient';
import pxToRem from '../../functions/pxToRem';

const { white, gradients, grey, transparent } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

const switchButton = {
  defaultProps: {
    disableRipple: false,
  },

  styleOverrides: {
    switchBase: {
      color: gradients.dark.main,

      '&:hover': {
        // backgroundColor: "#01f8a5",
      },

      '&.Mui-checked': {
        color: '#4caf50',

        '&:hover': {
          // backgroundColor: transparent.main,
        },

        '& .MuiSwitch-thumb': {
          borderColor: `${'#4caf50'} !important`,
        },

        '& + .MuiSwitch-track': {
          backgroundColor: `${'#4caf50'} `,
          borderColor: `${'#4caf50'} `,
          opacity: 1,
        },
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: '0.3 !important',
      },

      '&.Mui-focusVisible .MuiSwitch-thumb': {
        backgroundImage: linearGradient(gradients.info.main, gradients.info.state),
      },
    },

    thumb: {
      backgroundColor: white.main,
      boxShadow: md,
      border: `${borderWidth[1]} solid ${grey[400]}`,
    },

    track: {
      width: pxToRem(32),
      height: pxToRem(15),
      backgroundColor: grey[400],
      border: `${borderWidth[1]} solid ${grey[400]}`,
      opacity: 1,
    },

    checked: {},
  },
};

export default switchButton;
