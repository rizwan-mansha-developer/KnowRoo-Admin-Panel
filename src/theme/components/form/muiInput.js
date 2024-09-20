import borders from '../../base/borders';
import colors from '../../base/colors';
import typography from '../../base/typography';

const { info, inputBorderColor, dark } = colors;
const { size } = typography;
const { borderWidth } = borders;

const MuiInput = {
  MuiInput: {
    styleOverrides: {
      // Target the date picker icon
      '& .MuiInputAdornment-root .MuiSvgIcon-root': {
        color: 'red', // Change the color to whatever you want
      },
    },
  },
};

export default MuiInput;
