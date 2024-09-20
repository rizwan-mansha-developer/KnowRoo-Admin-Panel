import PropTypes from 'prop-types';

const ArrowIconBtn = ({ isHovered }) => {
  const strokeColor = isHovered ? '#fff' : '#FFA500';
  return (
    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.79248 0.845531L5.11412 5.16717C5.6245 5.67755 5.6245 6.51271 5.11412 7.02309L0.79248 11.3447"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
ArrowIconBtn.propTypes = {
  isHovered: PropTypes.bool,
};

export default ArrowIconBtn;
