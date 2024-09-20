import PropTypes from 'prop-types';

const ArrowCloseIcon = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#BFBFBF';
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.999999 0.716675L6.05601 5.77269C6.65312 6.3698 6.65312 7.34688 6.05601 7.94398L1 13"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ArrowCloseIcon.propTypes = {
  selected: PropTypes.bool,
};

export default ArrowCloseIcon;
