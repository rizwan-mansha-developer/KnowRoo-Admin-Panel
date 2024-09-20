import { darkScrollbar } from '@mui/material';
import pxToRem from '../../functions/pxToRem';
import typography from '../../base/typography';
import borders from '../../base/borders';
import colors from '../../base/colors';

const { light, text, dark, input } = colors;
const { borderRadius } = borders;
const { size } = typography;

const menuItem = {
  styleOverrides: {
    root: {
      minWidth: pxToRem(160),
      minHeight: 'unset',
      padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
      borderRadius: borderRadius.xl,
      fontSize: size.sm,
      color: '#C9C8D1',
      // backgroundColor: input.menuitem,
      transition: 'background-color 300ms ease, color 300ms ease',

      '&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
        backgroundColor: input.menu,
        color: '#fff',
      },
    },
  },
};

export default menuItem;
