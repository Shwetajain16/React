import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Modal } from 'react-bootstrap';
import { useState, useEffect} from "react";
import { FormGroup, Button, FormControl, InputLabel, Input} from '@material-ui/core';

import { createTicket, fetchTickets, updateTicket, deleteTicket } from '../../api/api'
import { Link, useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Ticket",
    numeric: true,
    disablePadding: true,
    label: "Ticket",
    align: "left",

  },
  {
    id: "empname",
    disablePadding: false,
    label: "Name",
    align: "left",
  },
  {
    id: "ticket_descSC",

    disablePadding: false,
    label: "ticket_desc",
    align: "left",
  },
  {
    id: "empid",

    disablePadding: false,
    label: "Employee ID",
    align: "left",
  },
  {
    id: "createdAt",

    disablePadding: false,
    label: "Created At",
    align: "left",
  }, {
    id: "updatedAt",

    disablePadding: false,
    label: "Updated At",
    align: "center",
  },
  {
    id: "DeletedAt",

    disablePadding: false,
    label: "Resolved At",
    align: "center"
  },
  {
    id: "Edit",

    disablePadding: false,
    label: "Edit",
    align: "left",
  },
  {
    id: "Delete",

    disablePadding: false,
    label: "Delete",
    align: "left",
  }

];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (

    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchItem] = useState(""); //for serching name
  const [currentItems, setCurrentItems] = useState();
  const [serchField] = useState("Filter by"); 
  const [userold] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  // console.log(userold)
  const initialValue = {
    empid: "",
    ticket_desc: "",
    empname: userold?.result?.name,
    creator:userold?.result?._id
  }


  let Navigate = useNavigate();

  const [tickets, setTicket] = useState(initialValue);
  const [allTickets, setAllTickets] = useState([])
  const { empid, ticket_desc, empname } = tickets;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  
  const onValueChange = (e) => {
    // console.log(e.target.value);
    setTicket({ ...tickets, [e.target.name]: e.target.value })

  }

  const addTicketDetails = async () => {
    await createTicket(tickets);
    handleClose();
    getAllTickets()

  }

  useEffect(() => {

    getAllTickets();
    if(!user){
      Navigate('/')
    }

  }, []);

  const getAllTickets = async () => {
    let response = await fetchTickets();
    // console.log(response.data)
    setAllTickets(response.data);
    // console.log(allTickets);
    
  }

  const deleteTicketData = async (id) => {
    await deleteTicket(id);
    getAllTickets();
  }

  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allTickets.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (

    <><Button variant="primary" style={{ background: '#3d8bdb',
    color: '#fff',padding: '10px',margin: '10px' }} onClick={handleShow}>
      Add Tickets
    </Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
          <Modal.Title >Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: '#a5cdf0',color: '-moz-initial'}}>
          <FormGroup >

            <FormControl>
              <InputLabel htmlFor="my-input">Employee Id</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name='empid' value={empid} id="my-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Employee Name</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name='empname' value={empname} disabled id="my-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Discription</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name='ticket_desc' value={ticket_desc} id="my-input" />
            </FormControl>
          
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ background: '#3d8bdb',
    color: '#fff'}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{ background: '#3d8bdb',
    color: '#fff'}} onClick={addTicketDetails}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={allTickets.length} />
              <TableBody>
              {currentItems
              ?.filter((ticket) => {
                if (searchItem === "") {
                  return ticket;
                } else if (
                  serchField === "Name" &&
                  ticket.empname
                    .toLowerCase()
                    .includes(searchItem.toLocaleLowerCase())
                ) {
                  return ticket;
                } else if (
                  serchField === "Create Date" &&
                  ticket.createdAt
                    .toLowerCase()
                    .includes(searchItem.toLocaleLowerCase())
                ) {
                  return ticket;
                } else if (
                  serchField === "Employee ID" &&
                  ticket.empid.toString().includes(searchItem)
                ) {
                  return ticket;
                }
              })}
                
                {stableSort(allTickets, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  
                  .map((ticket, index) => {


                    return (


                      <>
                        <TableRow 
                        style={{

                          backgroundColor: ticket.DeletedAt

                            ? "#8cb8de"

                            : "transparent",



                          padding: ticket.DeletedAt ? "10px" : 0,

                          boxShadow: ticket.DeletedAt

                            ? "2px 0px 8px #9999c2 inset"

                            : "none",

                        }}>
                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell>{ticket.empname}</TableCell>
                          <TableCell>{ticket.ticket_desc}</TableCell>
                          <TableCell>{ticket.empid}</TableCell>
                          <TableCell>{ticket.createdAt}</TableCell>
                          <TableCell>{ticket.updatedAt}</TableCell>
                          <TableCell>{ticket.DeletedAt}</TableCell>

                          {user?.result?._id === ticket?.creator?(

                         <>
                          <TableCell>
                            
                           
                            <Button color="primary" variant="contained" style={{ marginRight: 10 }} disabled={ticket.DeletedAt} component={Link} to={`/edit/${ticket._id}`}>Edit</Button>
                          </TableCell>
                          <TableCell>
                            <Button color="secondary" variant="contained" disabled={ticket.DeletedAt} onClick={() => deleteTicketData(ticket._id)} >Delete</Button>
                           
                          </TableCell></>
                              ):(<>
                                <TableCell>
                                  
                                 
                                  <Button color="primary" variant="contained" style={{ marginRight: 10 }} disabled={true} component={Link} to={`/edit/${ticket._id}`}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                  <Button color="secondary" variant="contained" disabled={true} onClick={() => deleteTicketData(ticket._id)} >Delete</Button>
                                  
                                </TableCell></>

                              )}

                        </TableRow>
                      </>
                              );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allTickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>

      </Box></>
  );
}

