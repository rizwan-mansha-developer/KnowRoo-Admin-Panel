import colors from '../../base/colors';
import typography from '../../base/typography';
import pxToRem from '../../functions/pxToRem';

const { transparent, light, info, secondary } = colors;
const { size } = typography;

const outlined = {
  base: {
    minHeight: pxToRem(10),
    color: light.main,
    borderColor: light.main,
    // padding: `${pxToRem(10)} ${pxToRem(24)}`,

    '&:hover': {
      opacity: 0.75,
      backgroundColor: transparent.main,
    },

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(8)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(12),
    padding: `${pxToRem(6)} ${pxToRem(16)}`,
    fontSize: size.xs,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(17),
    padding: `${pxToRem(2)} ${pxToRem(18)}`,
    fontSize: size.sm,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    backgroundColor: transparent.main,
    borderColor: info.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },

  secondary: {
    backgroundColor: transparent.main,
    borderColor: secondary.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },
};

export default outlined;
