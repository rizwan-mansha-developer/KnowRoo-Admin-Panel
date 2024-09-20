import PropTypes from 'prop-types';

const SignoutIcon = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#BFBFBF';
  return (
    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.96306 5.68359C3.12182 7.56325 1.24927 10.7774 1.24927 14.4268C1.24927 20.2214 5.97024 24.9187 11.7939 24.9187C17.6175 24.9187 22.3384 20.2214 22.3384 14.4268C22.3384 10.7774 20.4658 7.56325 17.6247 5.68359"
        stroke={strokeColor}
        strokeWidth="2.10892"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7938 1.60352V10.9296"
        stroke={strokeColor}
        strokeWidth="2.10892"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

SignoutIcon.propTypes = {
  selected: PropTypes.bool,
};

export default SignoutIcon;
