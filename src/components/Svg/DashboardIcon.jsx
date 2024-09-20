import PropTypes from 'prop-types';

const DashboardIcon = ({ selected }) => {
  const strokeColor = selected ? '#FFA500' : '#BFBFBF';
  const fill = selected ? '#FFA500' : 'none';
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5458 8.4972C4.5458 7.63597 4.54631 7.03466 4.57991 6.56433C4.61293 6.10215 4.67474 5.83193 4.76503 5.62499C5.0301 5.01745 5.515 4.53254 6.12255 4.26747C6.32949 4.17718 6.5997 4.11537 7.06189 4.08235C7.53221 4.04875 8.13353 4.04824 8.99475 4.04824C9.85598 4.04824 10.4573 4.04875 10.9276 4.08235C11.3898 4.11537 11.66 4.17718 11.867 4.26747C12.4745 4.53254 12.9594 5.01745 13.2245 5.62499C13.3148 5.83193 13.3766 6.10215 13.4096 6.56433C13.4432 7.03466 13.4437 7.63597 13.4437 8.4972C13.4437 9.35842 13.4432 9.95974 13.4096 10.4301C13.3766 10.8922 13.3148 11.1625 13.2245 11.3694C12.9594 11.9769 12.4745 12.4619 11.867 12.7269C11.66 12.8172 11.3898 12.879 10.9276 12.912C10.4573 12.9456 9.85598 12.9461 8.99475 12.9461C8.13353 12.9461 7.53221 12.9456 7.06189 12.912C6.5997 12.879 6.32949 12.8172 6.12255 12.7269C5.515 12.4619 5.0301 11.9769 4.76503 11.3694C4.67474 11.1625 4.61293 10.8922 4.57991 10.4301C4.54631 9.95974 4.5458 9.35842 4.5458 8.4972Z"
        stroke={strokeColor}
        strokeWidth="1.7"
      />
      <path
        d="M4.5458 21.0216C4.5458 20.1604 4.54631 19.5591 4.57991 19.0887C4.61293 18.6266 4.67474 18.3563 4.76503 18.1494C5.0301 17.5419 5.515 17.057 6.12255 16.7919C6.32949 16.7016 6.5997 16.6398 7.06189 16.6068C7.53221 16.5732 8.13353 16.5727 8.99475 16.5727C9.85598 16.5727 10.4573 16.5732 10.9276 16.6068C11.3898 16.6398 11.66 16.7016 11.867 16.7919C12.4745 17.057 12.9594 17.5419 13.2245 18.1494C13.3148 18.3563 13.3766 18.6266 13.4096 19.0887C13.4432 19.5591 13.4437 20.1604 13.4437 21.0216C13.4437 21.8828 13.4432 22.4842 13.4096 22.9545C13.3766 23.4167 13.3148 23.6869 13.2245 23.8938C12.9594 24.5014 12.4745 24.9863 11.867 25.2513C11.66 25.3416 11.3898 25.4034 10.9276 25.4365C10.4573 25.4701 9.85598 25.4706 8.99475 25.4706C8.13353 25.4706 7.53221 25.4701 7.06189 25.4365C6.5997 25.4034 6.32949 25.3416 6.12255 25.2513C5.515 24.9863 5.0301 24.5014 4.76503 23.8938C4.67474 23.6869 4.61293 23.4167 4.57991 22.9545C4.54631 22.4842 4.5458 21.8828 4.5458 21.0216Z"
        stroke={strokeColor}
        strokeWidth="1.7"
      />
      <path
        d="M16.1078 8.4972C16.1078 7.63597 16.1083 7.03466 16.1419 6.56433C16.1749 6.10215 16.2368 5.83193 16.327 5.62499C16.5921 5.01745 17.077 4.53254 17.6846 4.26747C17.8915 4.17718 18.1617 4.11537 18.6239 4.08235C19.0942 4.04875 19.6955 4.04824 20.5568 4.04824C21.418 4.04824 22.0193 4.04875 22.4896 4.08235C22.9518 4.11537 23.222 4.17718 23.429 4.26747C24.0365 4.53254 24.5214 5.01745 24.7865 5.62499C24.8768 5.83193 24.9386 6.10215 24.9716 6.56433C25.0052 7.03466 25.0057 7.63597 25.0057 8.4972C25.0057 9.35842 25.0052 9.95974 24.9716 10.4301C24.9386 10.8922 24.8768 11.1625 24.7865 11.3694C24.5214 11.9769 24.0365 12.4619 23.429 12.7269C23.222 12.8172 22.9518 12.879 22.4896 12.912C22.0193 12.9456 21.418 12.9461 20.5568 12.9461C19.6955 12.9461 19.0942 12.9456 18.6239 12.912C18.1617 12.879 17.8915 12.8172 17.6846 12.7269C17.077 12.4619 16.5921 11.9769 16.327 11.3694C16.2368 11.1625 16.1749 10.8922 16.1419 10.4301C16.1083 9.95974 16.1078 9.35842 16.1078 8.4972Z"
        stroke={strokeColor}
        strokeWidth="1.7"
      />
      <path
        d="M16.1078 21.0216C16.1078 20.1604 16.1083 19.5591 16.1419 19.0887C16.1749 18.6266 16.2368 18.3563 16.327 18.1494C16.5921 17.5419 17.077 17.057 17.6846 16.7919C17.8915 16.7016 18.1617 16.6398 18.6239 16.6068C19.0942 16.5732 19.6955 16.5727 20.5568 16.5727C21.418 16.5727 22.0193 16.5732 22.4896 16.6068C22.9518 16.6398 23.222 16.7016 23.429 16.7919C24.0365 17.057 24.5214 17.5419 24.7865 18.1494C24.8768 18.3563 24.9386 18.6266 24.9716 19.0887C25.0052 19.5591 25.0057 20.1604 25.0057 21.0216C25.0057 21.8828 25.0052 22.4842 24.9716 22.9545C24.9386 23.4167 24.8768 23.6869 24.7865 23.8938C24.5214 24.5014 24.0365 24.9863 23.429 25.2513C23.222 25.3416 22.9518 25.4034 22.4896 25.4365C22.0193 25.4701 21.418 25.4706 20.5568 25.4706C19.6955 25.4706 19.0942 25.4701 18.6239 25.4365C18.1617 25.4034 17.8915 25.3416 17.6846 25.2513C17.077 24.9863 16.5921 24.5014 16.327 23.8938C16.2368 23.6869 16.1749 23.4167 16.1419 22.9545C16.1083 22.4842 16.1078 21.8828 16.1078 21.0216Z"
        stroke={strokeColor}
        strokeWidth="1.7"
      />
    </svg>
  );
};
DashboardIcon.propTypes = {
  selected: PropTypes.bool,
};

export default DashboardIcon;
