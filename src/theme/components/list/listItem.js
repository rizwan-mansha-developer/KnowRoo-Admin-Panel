import { fontWeight } from '@mui/system';
import borders from '../../base/borders';

const listItem = {
  defaultProps: {
    disableGutters: true,
  },

  styleOverrides: {
    root: {
      paddingRight: 10,
      borderRadius: borders.borderRadius.lg,
      marginRight: -10,
      fontWeight: 'bold',
    },
  },
};

export default listItem;
