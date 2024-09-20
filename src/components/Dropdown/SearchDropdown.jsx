import React, { useState, useRef } from 'react';
import { TextField, MenuItem, FormControl, Select, Box } from '@mui/material';
import PropTypes from 'prop-types';

const SearchableDropdown = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  options,
  searchInputProps,
  selectProps,
  backgroundColor,
  multiple,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Determine if options are key-value pairs or simple strings
  const isKeyValue = options.length && typeof options[0] === 'object' && options[0].label;

  // Filter function
  const filteredOptions = options.filter((option) => {
    const searchLower = searchTerm.toLowerCase();
    if (isKeyValue) {
      return option.label.toLowerCase().includes(searchLower);
    }
    return option.toLowerCase().includes(searchLower);
  });

  // Handle search input changes
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (multiple && Array.isArray(value)) {
      // Handle multiple selection
      const newValue = value.includes(option)
        ? value.filter((val) => val !== option)
        : [...value, option];
      onChange({ target: { name, value: newValue } });
    } else {
      // Handle single selection
      onChange({ target: { name, value: option } });
    }
    setSearchTerm('');
  };

  // Render selected values
  const renderValue = (selected) => {
    if (multiple && Array.isArray(selected)) {
      return selected.join(', ');
    }
    return isKeyValue ? options.find((option) => option.value === selected)?.label || '' : selected;
  };

  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={name}>
        {label}
      </label>
      <Select
        name={name}
        value={value || (multiple ? [] : '')} // Ensure value is always defined
        onChange={onChange}
        label={label}
        multiple={multiple}
        renderValue={renderValue}
        {...selectProps} // Spread additional props for the Select component
        MenuProps={{
          autoFocus: false,
          PaperProps: {
            style: {
              color: '#ffffff',
              margin: '5px',
              borderRadius: '15px',
              backgroundColor: ' #7E8999',
              maxHeight: 200,
              overflowY: 'auto',
              width: 'auto',
            },
          },
        }}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : '#f5f6f7',
        }}
      >
        <MenuItem style={{ background: 'none' }}>
          <Box sx={{ p: 0, width: '100%' }}>
            <TextField
              variant="outlined"
              placeholder={`Search ${label}`}
              value={searchTerm}
              onChange={handleSearchTermChange}
              fullWidth
              onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on search input click
              autoFocus // Focus the search input automatically
              inputRef={inputRef}
              {...searchInputProps}
            />
          </Box>
        </MenuItem>
        {filteredOptions.map((option, index) => (
          <MenuItem
            key={index}
            value={isKeyValue ? option.value : option}
            onClick={() => handleOptionSelect(isKeyValue ? option.value : option)}
          >
            {isKeyValue ? option.label : option}
          </MenuItem>
        ))}
      </Select>
      {helperText && <p style={{ color: 'red', fontSize: '12px' }}>{helperText}</p>}
    </FormControl>
  );
};

SearchableDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  backgroundColor: PropTypes.string,
  searchInputProps: PropTypes.object,
  selectProps: PropTypes.object,
  multiple: PropTypes.bool,
};

export default SearchableDropdown;
