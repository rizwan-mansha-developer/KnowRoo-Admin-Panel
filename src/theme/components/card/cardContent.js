import pxToRem from '../../functions/pxToRem';
const cardContent = {
  styleOverrides: {
    root: {
      marginTop: 0,
      marginBottom: 0,
      padding: `${pxToRem(6)} ${pxToRem(14)} ${pxToRem(2)}`,
      paddingBottom: '0px',
    },
  },
};

export default cardContent;
