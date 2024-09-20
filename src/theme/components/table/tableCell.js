import { margin } from '@mui/system';
import borders from '../../base/borders';
import colors from '../../base/colors';
import pxToRem from '../../functions/pxToRem';

const { borderWidth, borderRadius } = borders;
const { light, dark } = colors;

const tableCell = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(20)}`,

      // borderRadius: `${borderRadius.xl} ${borderRadius.xl} 1 `,
      borderBottom: `${borderWidth[0]} solid ${dark.main}`,
    },
  },
};

export default tableCell;
