import PropTypes from 'prop-types';

const ArrowOpenIcon = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#BFBFBF';
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 1L9.23737 6.76263C8.55682 7.44318 7.44318 7.44318 6.76263 6.76263L1 1"
        stroke="#FFA500"
        strokeWidth="1.32576"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
ArrowOpenIcon.propTypes = {
  selected: PropTypes.bool,
};
export default ArrowOpenIcon;
