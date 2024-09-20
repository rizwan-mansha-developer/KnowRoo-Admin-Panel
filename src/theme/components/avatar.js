import borders from '../base/borders';

const { borderRadius } = borders;

const avatar = {
  styleOverrides: {
    root: {
      transition: 'all 200ms ease-in-out',
    },

    rounded: {
      borderRadius: borderRadius.lg,
    },

    img: {
      // height: 'auto',
      objectfit: 'cover' /* Ensures the image covers the avatar area without distortion */,
      width: '100%' /* Ensures the image takes up the full width of the avatar */,
      height: '100%' /* Ensures the image takes up the full height of the avatar */,
    },
  },
};

export default avatar;
