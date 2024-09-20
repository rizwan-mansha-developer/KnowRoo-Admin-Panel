import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

const DropdownField = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  options,
  icon,
  backgroundColor,
}) => {
  const isMultiple = Array.isArray(value);

  return (
    <FormControl fullWidth error={!!error}>
      <label
        style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161', marginBottom: '5px' }}
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        multiple={isMultiple}
        MenuProps={{
          PaperProps: {
            style: {
              color: '#ffffff',
              margin: '5px',
              borderRadius: '15px',
              backgroundColor: ' #7E8999',
              maxHeight: 200,
              overflow: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            },
          },
        }}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : '#f5f6f7',
        }}
      >
        {options?.length > 0 ? (
          options.map((option, index) => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            return (
              <MenuItem
                key={index}
                value={optionValue}
                style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}
              >
                {optionLabel}
                {icon}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem disabled style={{ color: '#fff' }}>
            No data found
          </MenuItem>
        )}
      </Select>
      {helperText && <p style={{ color: 'red' }}>{helperText}</p>}
    </FormControl>
  );
};

DropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  backgroundColor: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    ])
  ).isRequired,
  icon: PropTypes.element,
};

export default DropdownField;
