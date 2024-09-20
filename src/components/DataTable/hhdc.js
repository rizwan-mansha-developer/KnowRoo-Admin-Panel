import React, { useCallback, useEffect, useState } from 'react';
import {
  TableHead,
  TableBody,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
  Box,
  CircularProgress,
  Avatar,
  Table,
  TableCell,
  Grid,
} from '@mui/material';
// import EditIcon from 'assets/images/assets/edit.svg'
// import ViewIcon from 'assets/images/assets/view.svg'
// import DeleteIcon from 'assets/images/assets/Delete.svg'
// import { File } from "utils/fileURL";
import { useNavigate } from 'react-router-dom';
import { Img_BASE_URL } from '../../config/apiConfig';

function DataTable({
  data,
  total,
  header,
  onRowClick,
  handleEdit,
  handleDelete,
  loading,
  error,
  searchQuery,
  page,
  setPage,
  rowPerPage1,
  refetchData,
}) {
  // const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    // if (searchQuery || !searchQuery) return;
    const filterData = (item) => {
      const query = searchQuery?.toLowerCase();
      return (
        item?.fname?.toLowerCase().includes(query) ||
        // item?.role_id?.toLowerCase().includes(query) ||
        item?.lname?.toLowerCase().includes(query)
        // item?.status?.toLowerCase().includes(query) ||
        // item?.designation?.toLowerCase().includes(query) ||
        // item?.message?.toLowerCase().includes(query) ||
        // item?.title?.toLowerCase().includes(query) ||
        // item?.check_in?.toLowerCase().includes(query) ||
        // item?.check_out?.toLowerCase().includes(query) ||
        // item?.status?.toLowerCase().includes(query) ||
        // item?.working_hours?.toLowerCase().includes(query)
      );
    };

    const filtered = data?.filter(filterData);
    setFilteredData(filtered || []);
  }, [data, searchQuery, setPage]);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    navigate(`?page=${newPage}`);
    refetchData();
    setPage(newPage);
  };

  const toggleMultilin = (text, nameArray) => {
    const maxLength = 40;
    const lowerCaseText = String(text).toLowerCase();
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    if (lowerCaseSearchQuery && lowerCaseText.includes(lowerCaseSearchQuery)) {
      const startIndex = lowerCaseText.indexOf(lowerCaseSearchQuery);
      const endIndex = startIndex + lowerCaseSearchQuery.length;
      return (
        <React.Fragment>
          {startIndex > 0 && text.substr(0, startIndex)}
          <span style={{ backgroundColor: '#FFC107', fontWeight: 'bold' }}>
            {text.substr(startIndex, endIndex - startIndex)}
          </span>
          {text.substr(endIndex)}
        </React.Fragment>
      );
    } else {
      // Otherwise, just return the text as is
      return text.length > maxLength ? (
        <React.Fragment>
          <span style={{ cursor: 'pointer' }}>{text.substr(0, maxLength)}...</span>
          <br />
          <span style={{ display: 'none' }}>{text}</span>
        </React.Fragment>
      ) : (
        text
      );
    }
  };
  const toggleMultiline = (text) => {
    if (typeof text === 'string') {
      const maxLength = 40;
      return text.length > maxLength ? (
        <React.Fragment>
          <span style={{ cursor: 'pointer' }}>{text.substr(0, maxLength)}...</span>
          <br />
          <span style={{ display: 'none' }}>{text}</span>
        </React.Fragment>
      ) : (
        text
      );
    } else {
      return text;
    }
  };
  useEffect(() => {
    // Fetch permissions from localStorage
    const storedPermissions = JSON.parse(localStorage.getItem('Permissions'));
    setPermissions(storedPermissions || []);
  }, []);

  // Function to check if delete button should be shown
  const showDeleteButton = () => {
    return permissions.includes('delete-leave-request');
  };
  // const currentRows = filteredData

  //Attandance Table
  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // 0 for Sunday, 6 for Saturday
  };

  const isLateCheckin = (timeString) => {
    if (timeString.includes('AM')) {
      const time = timeString.replace(' AM', '');
      const [hours, minutes] = time.split(':').map(Number);
      return hours > 9 || (hours === 9 && minutes > 15);
    } else if (timeString.includes('PM')) {
      const time = timeString.replace(' PM', '');
      const [hours, minutes] = time.split(':').map(Number);
      return hours !== 12 && (hours < 9 || (hours === 9 && minutes > 15));
    }
    return false;
  };

  const isEarlyCheckout = (timeString) => {
    if (timeString.includes('AM')) {
      const time = timeString.replace(' AM', '');
      const [hours, minutes] = time.split(':').map(Number);
      return hours > 9 || (hours === 9 && minutes > 15);
    } else if (timeString.includes('PM')) {
      const time = timeString.replace(' PM', '');
      const [hours, minutes] = time.split(':').map(Number);
      return hours !== 18 && (hours < 6 || (hours === 18 && minutes > 15));
    }
    return false;
  };

  const getCellValue = (value) => {
    return value === null || value === undefined ? '--' : value;
  };

  return (
    <div
      style={{
        overflow: 'auto',
        maxHeight: '65vh',
        borderRadius: '15px',
        border: '1px solid #D8EEFF',
      }}
    >
      <style>
        {`
      /* Hide the scrollbar */
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
    `}
      </style>
      <Table
        style={{}}
        sx={{
          '& td': {
            borderBottom: '1px solid #D5DEE4',
          },
          '& td:last-child': {
            borderTopRightRadius: 13,
            borderBottomRightRadius: 13,
            borderBottom: '1px solid #D5DEE4',
          },
          '& th:first-child': {
            borderTopLeftRadius: 8,
            // borderBottomLeftRadius: 15,
          },
          '& th:last-child': {
            borderTopRightRadius: 8,
            // borderBottomRightRadius: 13,
          },
        }}
      >
        <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#FFFFFF' }}>
          <TableRow>
            {/* Render table header based on global variable */}
            {Object.keys(header)?.map((column, index) => (
              <React.Fragment>
                <TableCell key={index} style={{ color: '#1273D6', fontSize: '15px' }}>
                  {column}
                </TableCell>
              </React.Fragment>
            ))}
            {onRowClick ? (
              <TableCell style={{ color: '#1273D6', fontSize: '15px' }}>Action</TableCell>
            ) : null}
          </TableRow>
        </TableHead>

        <TableBody style={{ display: 'contents', maxHeight: '300px', overflowY: 'auto' }}>
          {/* Conditionally render table rows only if data is available */}

          {data.length > 0 &&
            data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Render table cells dynamically based on global variable */}
                {Object.entries(header).map(([key, value], Index) => (
                  <TableCell key={Index} style={{ color: '#9AB7D1', fontSize: '12px' }}>
                    {key === 'Name'
                      ? toggleMultiline(
                          <Grid container>
                            <Grid item alignItems="center">
                              <Avatar
                                src={`${Img_BASE_URL}/${row[value[0]]}`}
                                alt=""
                                style={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: '30%',
                                  marginRight: 8,
                                }}
                              />
                            </Grid>
                            <Grid item style={{ color: '#010032', fontSize: '15px' }}>
                              {row[value[1]].toLowerCase().includes(searchQuery.toLowerCase())
                                ? row[value[1]]
                                    .split(new RegExp(`(${searchQuery})`, 'gi'))
                                    .map((text, index) =>
                                      text.toLowerCase() === searchQuery.toLowerCase() ? (
                                        <span
                                          key={index}
                                          style={{
                                            backgroundColor: '#FFC107',
                                            fontWeight: 'bold',
                                            color: 'black',
                                          }}
                                        >
                                          {text}
                                        </span>
                                      ) : (
                                        <span key={index}>{text}</span>
                                      )
                                    )
                                : row[value[1]]}{' '}
                              {row[value[2]].toLowerCase().includes(searchQuery.toLowerCase())
                                ? row[value[2]]
                                    .split(new RegExp(`(${searchQuery})`, 'gi'))
                                    .map((text, index) =>
                                      text.toLowerCase() === searchQuery.toLowerCase() ? (
                                        <span
                                          key={index}
                                          style={{ backgroundColor: '#FFC107', fontWeight: 'bold' }}
                                        >
                                          {text}
                                        </span>
                                      ) : (
                                        <span key={index}>{text}</span>
                                      )
                                    )
                                : row[value[2]]}
                            </Grid>
                          </Grid>
                        )
                      : toggleMultilin(getCellValue(row[value]))}
                  </TableCell>
                ))}

                {onRowClick ? (
                  <TableCell
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={handleEdit ? EditIcon : ViewIcon}
                      onClick={() => {
                        // Check whether to view by ID or view by date
                        if (row.id) {
                          onRowClick(row.id, 'id');
                        } else if (row.date) {
                          onRowClick(row.date, 'date');
                        }
                      }}
                      alt=""
                      style={{
                        background: '#F5F6F7',
                        width: '35px',
                        padding: '8px',
                        borderRadius: '30%',
                      }}
                    />

                    {handleDelete && // Conditionally render the delete icon based on handleDelete prop
                      showDeleteButton() &&
                      (role === 'Manager' ? (
                        <img
                          src={DeleteIcon}
                          alt=""
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event from being triggered
                            handleDelete(row.id); // Call the handleDelete function
                          }}
                          style={{
                            background: '#F5F6F7',
                            width: '35px',
                            padding: '8px',
                            borderRadius: '30%',
                            marginLeft: '5px',
                          }}
                        />
                      ) : null)}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {loading && (
        <Box sx={{ padding: '10%', paddingLeft: '50%' }}>
          <CircularProgress color="info" />
        </Box>
      )}
      {error && <h1 style={{ padding: '10%', paddingLeft: '25%' }}>Something went wrong</h1>}

      {/* <TablePagination
        rowsPerPageOptions={10}
        component="div"
        count={parseInt(total)}
        rowsPerPage={rowPerPage1}
        page={parseInt(page)}
        onPageChange={handleChangePage}
      /> */}
    </div>
  );
}

export default DataTable;
