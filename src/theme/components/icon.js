import pxToRem from '../functions/pxToRem';

const icon = {
  defaultProps: {
    baseClassName: 'material-icons-round',
    fontSize: 'inherit',
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: 'inherit ',
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} `,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} `,
    },
  },
};

export default icon;
