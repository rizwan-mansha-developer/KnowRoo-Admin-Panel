import PropTypes from 'prop-types';

const AdvanctureIcon = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#BFBFBF';
  const fill = selected ? '#FFA500' : 'none';
  return (
    <svg width="22" height="21" viewBox="0 0 22 21" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.15179 17.4023C3.85168 17.2744 2.87773 16.8839 2.22455 16.2307C1.05298 15.0592 1.05298 13.1735 1.05298 9.40234V8.90234C1.05298 5.1311 1.05298 3.24549 2.22455 2.07391C3.39613 0.902344 5.28174 0.902344 9.05298 0.902344H13.053C16.8242 0.902344 18.7099 0.902344 19.8814 2.07391C21.053 3.24549 21.053 5.1311 21.053 8.90234V9.40234C21.053 13.1735 21.053 15.0592 19.8814 16.2307C18.7099 17.4023 16.8242 17.4023 13.053 17.4023C12.4925 17.4148 12.0461 17.4574 11.6076 17.5573C10.4092 17.8332 9.29948 18.4464 8.20285 18.9812C6.64027 19.7431 5.85898 20.1241 5.36867 19.7674C4.43067 19.0688 5.34752 16.9042 5.55298 15.9023"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

AdvanctureIcon.propTypes = {
  selected: PropTypes.bool,
};

export default AdvanctureIcon;
