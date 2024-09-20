import React, { useState } from 'react';
import PropTypes from 'prop-types';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, Typography, IconButton } from '@mui/material';

const InputField = ({
  name,
  label,
  variant,
  value,
  onChange,
  error,
  helperText,
  inputProps,
  placeholder,
  type,
  style,
  backgroundColor,
  startIcon,
  fullWidth = true,
  showPasswordToggle = false, // New prop for show password toggle functionality
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={name}>
        {label}
      </label>
      <TextField
        type={showPasswordToggle && showPassword ? 'text' : type}
        id={name}
        name={name}
        variant={variant}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth={fullWidth}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : '#f5f6f7',
          ...style,
        }}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: showPasswordToggle && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityIcon fontSize="small" style={{ color: '#A9A9A9', fontSize: '10px' }} />
                ) : (
                  <VisibilityOffIcon fontSize="small" style={{ color: '#A9A9A9' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          ...inputProps,
        }}
      />
      {error && (
        <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inputProps: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  backgroundColor: PropTypes.string,
  startIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  showPasswordToggle: PropTypes.bool, // New prop type for show password toggle functionality
};

export default InputField;
