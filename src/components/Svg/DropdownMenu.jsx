import PropTypes from 'prop-types';

const MenuIcon = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#FFA500';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 17.9766C14.4183 17.9766 18 14.3948 18 9.97656C18 5.55828 14.4183 1.97656 10 1.97656C5.58172 1.97656 2 5.55828 2 9.97656C2 14.3948 5.58172 17.9766 10 17.9766Z"
        stroke="#C9C8D1"
        strokeWidth="1.2"
      />
      <path
        d="M8.40015 7.57656C8.40015 6.69291 9.11647 5.97656 10.0001 5.97656C10.8838 5.97656 11.6001 6.69291 11.6001 7.57656C11.6001 7.89508 11.5071 8.19187 11.3466 8.4412C10.8685 9.18432 10.0001 9.89288 10.0001 10.7766V11.1766"
        stroke="#C9C8D1"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9.99365 13.9766H10.0009"
        stroke="#C9C8D1"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

MenuIcon.propTypes = {
  selected: PropTypes.bool,
};

export default MenuIcon;
