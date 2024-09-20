import borders from '../../base/borders';
import colors from '../../base/colors';
import typography from '../../base/typography';
import pxToRem from '../../functions/pxToRem';

const { inputBorderColor, info, grey, transparent, input } = colors;
const { borderRadius } = borders;
const { size } = typography;

const inputOutlined = {
  styleOverrides: {
    root: {
      // backgroundColor: '#fff',
      fontSize: size.sm,
      paddingleft: '0px',
      borderRadius: borderRadius.xl,
      height: 'auto',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',

        // borderColor: inputBorderColor,
      },

      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          // borderColor: info.main,
          border: 'none',
        },
      },
    },

    notchedOutline: {
      // borderColor: inputBorderColor,
      border: 'none',
    },

    input: {
      color: input.light,
      // padding: pxToRem(10),
      // paddingleft:"10px",

      backgroundColor: 'none',
    },

    inputSizeSmall: {
      fontSize: size.xs,
      // padding: pxToRem(20),
    },

    multiline: {
      // backgroundColor: input.main,
      color: input.main,
      // padding: 20,
    },
  },
};

export default inputOutlined;
