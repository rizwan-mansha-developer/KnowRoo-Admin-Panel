import { fontSize, fontWeight } from '@mui/system';
import borders from '../base/borders';
import colors from '../base/colors';
import pxToRem from '../functions/pxToRem';
const { background } = colors;
const { borderRadius } = borders;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(20),
      whiteSpace: 'nowrap',
      border: 'none',
      fontWeight: 'bold',
    },
    paper: {
      width: pxToRem(240),
      backgroundColor: background.sidenav,
      height: `calc(100vh - ${pxToRem(52)})`,
      margin: pxToRem(16),

      borderRadius: borderRadius.xl,
      border: 'none',
      boxShadow: '0px 1px 13px -12px #b4c3db',
    },
    paperAnchorDockedLeft: {
      borderRight: 'none',
    },
  },
};

export default sidenav;
