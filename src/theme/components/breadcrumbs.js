import { fontWeight } from '@mui/system';
import colors from '../base/colors';
import typography from '../base/typography';
const { grey } = colors;
const { size } = typography;

const breadcrumbs = {
  styleOverrides: {
    root: {
      fontSize: '15px',
      fontWeight: 500,
      // marginTop: "7px",
    },
    li: {
      lineHeight: 0,
      // marginTop: "7px",
    },

    separator: {
      fontSize: '2rem',
      fontWeight: 300,
      color: grey[600],
      textAlign: 'center',
      marginTop: '-7px',
    },
  },
};

export default breadcrumbs;
