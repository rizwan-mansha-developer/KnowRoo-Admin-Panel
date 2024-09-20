import colors from '../../base/colors';
import pxToRem from '../../functions/pxToRem';

const { transparent, input } = colors;

const select = {
  styleOverrides: {
    select: {
      display: 'grid',
      alignItems: 'center',
      // padding: `0 ${pxToRem(12)} !important`,
      // color: "#fff"
    },

    selectMenu: {
      background: input.menuitem,
      // height: 'none',
      minHeight: 'none',
      overflow: 'auto',
    },

    icon: {
      color: input.light,
    },
  },
};

export default select;
