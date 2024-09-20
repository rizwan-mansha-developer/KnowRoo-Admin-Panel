import borders from '../../base/borders';
import pxToRem from '../../functions/pxToRem';

const { borderRadius } = borders;

const tableHead = {
  styleOverrides: {
    root: {
      display: 'contents',
      padding: `${pxToRem(14)} ${pxToRem(15)} 0 ${pxToRem(1)}`,
      margin: 0,
    },
  },
};

export default tableHead;
