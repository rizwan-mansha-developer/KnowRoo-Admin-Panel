import pxToRem from '../functions/pxToRem';
const svgIcon = {
  defaultProps: {
    fontSize: 'inherit',
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: 'inherit !important',
      color: '#FFA500',
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },
    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
    color: 'green',
  },
};

export default svgIcon;
