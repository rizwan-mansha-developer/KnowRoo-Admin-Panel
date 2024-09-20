import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, useMediaQuery } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateIcon from '../../assets/FormsIcon/Date.svg';
import styled from 'styled-components';

const CustomDatePickerWrapper = styled.div`
  .react-datepicker__year-dropdown {
    max-height: 100px;
    overflow-y: auto;
  }
`;

function CustomDatePicker({
  value,
  onChange,
  placeholder = 'Select Date',
  label = '',
  icon = DateIcon,
  fullWidth = true,
  textFieldStyle = {},
  iconStyle = {},
  onlyFutureDates = false,
  onlyPastDates = false,
  max18yearOld = false,
}) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const max18YearsOldDate = new Date();
  max18YearsOldDate.setFullYear(max18YearsOldDate.getFullYear() - 18);

  return (
    <CustomDatePickerWrapper>
      <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={label}>
        {label}
      </label>
      <br />
      <Grid>
        <DatePicker
          selected={value}
          onChange={onChange}
          customInput={
            <TextField
              fullWidth={fullWidth}
              placeholder={placeholder}
              style={{ backgroundColor: 'green', ...textFieldStyle }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <img
                    src={icon}
                    alt="Date picker opening icon"
                    width={20}
                    style={{ cursor: 'pointer', ...iconStyle }}
                    onClick={(e) =>
                      e.target.document
                        .querySelector('.react-datepicker__input-container input')
                        .focus()
                    }
                  />
                ),
              }}
            />
          }
          dateFormat="dd-MM-yyyy"
          showYearDropdown // Show year dropdown
          dropdownMode="select" // Use select dropdown mode
          minDate={onlyFutureDates ? new Date() : null} // Set minDate if onlyFutureDates is true
          maxDate={onlyPastDates ? new Date() : max18yearOld ? max18YearsOldDate : null} // Set maxDate if onlyPastDates is true
          style={{ width: '100%' }}
        />
      </Grid>
    </CustomDatePickerWrapper>
  );
}

CustomDatePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  fullWidth: PropTypes.bool,
  textFieldStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  onlyFutureDates: PropTypes.bool, // Add this prop type
  onlyPastDates: PropTypes.bool, // Add this prop type
};

export default CustomDatePicker;
