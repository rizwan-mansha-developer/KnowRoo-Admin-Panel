import PropTypes from 'prop-types';

const AddNew = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#FFA500';
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="10.5"
        cy="10.5"
        r="10.3147"
        fill="white"
        stroke={strokeColor}
        strokeWidth="0.370588"
      />
      <path
        d="M10.5 6.17676V14.8238"
        stroke={strokeColor}
        strokeWidth="1.23529"
        strokeLinecap="round"
      />
      <path
        d="M6.17647 10.5L14.8235 10.5"
        stroke={strokeColor}
        strokeWidth="1.23529"
        strokeLinecap="round"
      />
    </svg>
  );
};

AddNew.propTypes = {
  selected: PropTypes.bool,
};

export default AddNew;
