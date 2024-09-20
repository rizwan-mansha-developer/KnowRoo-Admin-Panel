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
  Button,
  Typography,
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
  handleView,
  handleDelete,
  loading,
  error,
  searchQuery,
  page,
  setPage,
  rowPerPage1,
  refetchData,
}) {
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
          '& th': {
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
            {<TableCell style={{ color: '#1273D6', fontSize: '15px' }}>Action</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody style={{ display: 'contents', maxHeight: '300px', overflowY: 'auto' }}>
          {/* Conditionally render table rows only if data is available */}

          {data?.length > 0 &&
            data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Render table cells dynamically based on global variable */}
                {Object.entries(header).map(([key, value], Index) => (
                  <TableCell key={Index} style={{ color: '#030229', fontSize: '12px' }}>
                    {key === 'Name' ? (
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

                        <Grid item style={{ color: '#030229', fontSize: '15px' }}>
                          {row[value[1]]} {row[value[2]]}
                          {/* {row[value[1]].toLowerCase().includes(searchQuery.toLowerCase())
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
                                      : row[value[1]]}{' '} */}
                          {/* {row[value[2]].toLowerCase().includes(searchQuery.toLowerCase())
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
                          : row[value[2]]} */}
                        </Grid>
                      </Grid>
                    ) : (
                      row[value]
                    )}
                  </TableCell>
                ))}

                {
                  <TableCell
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (row.user_id) {
                          handleView(row.user_id, row.submission);
                        }
                      }}
                      style={{ background: '#03A9F4', color: '#fff' }}
                      disabled={row.status === 'Missed' || row.status === 'Not Attempted'}
                    >
                      view
                    </Button>
                    {/* <img src={handleEdit ? EditIcon : ViewIcon} onClick={() => {
                      // Check whether to view by ID or view by date
                      if (row.id) {
                        onRowClick(row.id, "id");
                      } else if (row.date) {
                        onRowClick(row.date, "date");
                      }
                    }} alt="" style={{
                      background: "#F5F6F7", width: "35px", padding: "8px", borderRadius: "30%"
                    }} /> */}

                    {/* {handleDelete && ( // Conditionally render the delete icon based on handleDelete prop

                      showDeleteButton() && (
                        (role === 'Manager') ?

                          <img src={DeleteIcon} alt="" onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event from being triggered
                            handleDelete(row.id); // Call the handleDelete function
                          }} style={{
                            background: "#F5F6F7", width: "35px", padding: "8px", borderRadius: "30%", marginLeft: "5px"
                          }} /> : null)
                    )} */}
                  </TableCell>
                }
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {loading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255, 255, 255, 0.8)"
          zIndex="1000"
        >
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography
          style={{
            margin: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {error}
        </Typography>
      )}

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
