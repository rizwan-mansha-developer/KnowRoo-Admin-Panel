import PropTypes from 'prop-types';

const SchoolIcon = ({ selected }) => {
  const strokeColor = selected ? '#fff' : '#BFBFBF';
  const strokeColor2 = selected ? '#FFA500' : '#BFBFBF';

  const fill = selected ? '#FFA500' : 'none';
  return (
    <svg width="25" height="27" viewBox="0 0 25 27" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.1666 1H4.72219C1.6427 1 1 1.6427 1 4.72219V25.8146H15.8887V4.72219C15.8887 1.6427 15.246 1 12.1666 1Z"
        stroke={strokeColor2}
        strokeWidth="1.94699"
        strokeLinejoin="round"
      />
      <path
        d="M19.6109 8.44434H15.8887V25.8145H23.333V12.1665C23.333 9.08703 22.6903 8.44434 19.6109 8.44434Z"
        stroke={strokeColor2}
        strokeWidth="1.94699"
        strokeLinejoin="round"
      />
      <path
        d="M7.20361 5.96289H9.68507M7.20361 9.68508H9.68507M7.20361 13.4073H9.68507"
        stroke={strokeColor}
        strokeWidth="1.94699"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5459 25.8145V20.8516C11.5459 19.6818 11.5459 19.0969 11.1825 18.7335C10.8191 18.3701 10.2342 18.3701 9.06447 18.3701H7.82374C6.65397 18.3701 6.06909 18.3701 5.70568 18.7335C5.34229 19.0969 5.34229 19.6818 5.34229 20.8516V25.8145"
        stroke={strokeColor}
        strokeWidth="1.94699"
        strokeLinejoin="round"
      />
    </svg>
  );
};
SchoolIcon.propTypes = {
  selected: PropTypes.bool,
};

export default SchoolIcon;
