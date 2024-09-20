import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const DateTimePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  border-radius: 10px;
  background-color: #f4f4f6;
  padding: 10px 5px;
`;

const DateTimePickerLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #616161;
`;

const DateTimePickerInput = styled(DatePicker)`
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  width: 150px;
  color: #03a9f4;
  box-shadow: 0 4px 8px rgba(146, 140, 151, 0.1);

  .react-datepicker__month-container {
    background-color: green;
  }

  .react-datepicker__time-container .react-datepicker__time {
    background-color: yellow;
  }

  .react-datepicker__header {
    background-color: inherit;
  }

  .react-datepicker__time-box {
    background-color: inherit;
  }
`;

const DateTimePicker = ({
  label,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  pastDate = false, // Add this prop
}) => {
  // Get the current date and calculate tomorrow's date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Ensure the time part is set to midnight to avoid time issues
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <>
      <DateTimePickerLabel>{label}</DateTimePickerLabel>
      <DateTimePickerWrapper>
        <DateTimePickerInput
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select Date"
          minDate={pastDate ? tomorrow : null} // Prevent past dates if pastDate is true
        />
        <DateTimePickerInput
          selected={selectedTime}
          onChange={onTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          placeholderText="Select Time"
          minDate={pastDate ? tomorrow : null} // Prevent past dates if pastDate is true
        />
      </DateTimePickerWrapper>
    </>
  );
};

DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  selectedTime: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  pastDate: PropTypes.bool, // Add this prop type
};

export default DateTimePicker;
