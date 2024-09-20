import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';
import colors from '../../base/colors';

const { white } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const tableContainer = {
  styleOverrides: {
    root: {
      boxShadow: md,
      borderRadius: borderRadius.xl,
      margin: '0px',
    },
  },
};

export default tableContainer;
