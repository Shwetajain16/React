// import * as React from "react";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Paper from "@mui/material/Paper";
// import { visuallyHidden } from "@mui/utils";
// import { Modal } from 'react-bootstrap';
// import { useState, useEffect} from "react";
// import { FormGroup, Button, FormControl, InputLabel, Input} from '@material-ui/core';

//  import { createComplaint, fetchComplaint, updateComplaint, deleteComplaint } from '../../api/api'
// import { Link, useNavigate } from "react-router-dom";
// // import { CsvBuilder } from 'filefy';






// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }


// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: "Complaint",
//     numeric: true,
//     disablePadding: true,
//     label: "Complaint",
//     align: "left",

//   },
//   {
//     id: "username",
//     disablePadding: false,
//     label: "Name",
//     align: "left",
//   },
//   {
//     id: "complaint_desc",

//     disablePadding: false,
//     label: "complaint_desc",
//     align: "left",
//   },
//   {
//     id: "title",

//     disablePadding: false,
//     label: "Title",
//     align: "left",
//   },
//   {
//     id: "createdAt",

//     disablePadding: false,
//     label: "Created At",
//     align: "left",
//   },

//   {
//     id: "Edit",

//     disablePadding: false,
//     label: "Edit",
//     align: "left",
//   },
//   {
//     id: "Delete",

//     disablePadding: false,
//     label: "Delete",
//     align: "left",
//   }

// ];

// function EnhancedTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort
//   } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (

//     <TableHead>
//       <TableRow>

//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired
// };

// export default function Complaint() {
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [searchItem] = useState(""); //for serching name
//   const [currentItems, setCurrentItems] = useState();
//   const [serchField] = useState("Filter by"); 
//   const [userold] = useState(
//     JSON.parse(localStorage.getItem("profile"))
//   );
//   // console.log(userold)
//   const initialValue = {
//     title: "",
//     complaint_desc: "",
//     username: userold?.result?.name,
//     creator:userold?.result?._id
//   }


//   let Navigate = useNavigate();

//   const [complaints, setComplaints] = useState(initialValue);
//   const [allComplaints, setAllComplaints] = useState([])
//   const { title, complaint_desc, username } = complaints;
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const user = JSON.parse(localStorage.getItem("profile"));
  
//   const onValueChange = (e) => {
//     setComplaints({ ...complaints, [e.target.name]: e.target.value })

//   }

//   const addComplaintDetails =  async() => {
//     await createComplaint(complaints);
//     handleClose();
//     getAllComplaint()

//   }

//   useEffect(() => {

//     getAllComplaint();
//     if(!user){
//       Navigate('/')
//     }

//   }, []);

//   const getAllComplaint = async () => {
//     let response = await fetchComplaint();
//     // console.log(response.data)
//     setAllComplaints(response.data);
 
    
//   }

//   const deleteComplaintData = async (id) => {
//     await deleteComplaint(id);
//     getAllComplaint();
//   }

  
//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = allComplaints.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (

//     <><Button variant="primary" style={{ background: '#3d8bdb',
//     color: '#fff',padding: '10px',margin: '10px' }} onClick={handleShow}>
//       Add Complaints
//     </Button>

//     <Button variant="primary" style={{ background: '#3d8bdb',
//     color: '#fff',padding: '10px',margin: '20px' }}>
//       Export CSV
//     </Button>
//       <Modal show={show} onHide={handleClose} >
//         <Modal.Header closeButton >
//           <Modal.Title >Add Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{background: '#a5cdf0',color: '-moz-initial'}}>
//           <FormGroup >

//             <FormControl>
//               <InputLabel htmlFor="my-input">Title</InputLabel>
//               <Input onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input" />
//             </FormControl>
//             <FormControl>
//               <InputLabel htmlFor="my-input">User Name</InputLabel>
//               <Input onChange={(e) => onValueChange(e)} name='username' value={username} disabled id="my-input" />
//             </FormControl>
//             <FormControl>
//               <InputLabel htmlFor="my-input">Discription</InputLabel>
//               <Input onChange={(e) => onValueChange(e)} name='complaint_desc' value={complaint_desc} id="my-input" />
//             </FormControl>
          
//           </FormGroup>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" style={{ background: '#3d8bdb',
//     color: '#fff'}} onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" style={{ background: '#3d8bdb',
//     color: '#fff'}} onClick={addComplaintDetails}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Box sx={{ width: "100%" }}>
//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               size={dense ? "small" : "medium"}
//             >
//               <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={allComplaints.length} />
//               <TableBody>
//               {currentItems
//               ?.filter((Complaint) => {
//                 if (searchItem === "") {
//                   return Complaint;
//                 } else if (
//                   serchField === "Name" &&
//                   Complaint.username
//                     .toLowerCase()
//                     .includes(searchItem.toLocaleLowerCase())
//                 ) {
//                   return Complaint;
//                 } else if (
//                   serchField === "Create Date" &&
//                   Complaint.createdAt
//                     .toLowerCase()
//                     .includes(searchItem.toLocaleLowerCase())
//                 ) {
//                   return Complaint;
//                 } else if (
//                   serchField === "Employee ID" &&
//                   Complaint.title.toString().includes(searchItem)
//                 ) {
//                   return Complaint;
//                 }
//               })}
                
//                 {stableSort(allComplaints, getComparator(order, orderBy))
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  
//                   .map((Complaint, index) => {


//                     return (


//                       <>
//                         <TableRow 
//                         style={{

//                           backgroundColor: Complaint.DeletedAt

//                             ? "#8cb8de"

//                             : "transparent",



//                           padding: Complaint.DeletedAt ? "10px" : 0,

//                           boxShadow: Complaint.DeletedAt

//                             ? "2px 0px 8px #9999c2 inset"

//                             : "none",

//                         }}>
//                           <TableCell align="right">{index + 1}</TableCell>
//                           <TableCell>{Complaint.username}</TableCell>
//                           <TableCell>{Complaint.complaint_desc}</TableCell>
//                           <TableCell>{Complaint.title}</TableCell>
//                           <TableCell>{Complaint.createdAt}</TableCell>
                          

//                           {user?.result?._id === Complaint?.creator?(

//                          <>
//                           <TableCell>
                            
                           
//                             <Button color="primary" variant="contained" style={{ marginRight: 10 }} disabled={Complaint.DeletedAt} component={Link} to={`/edit/${Complaint._id}`}>Edit</Button>
//                           </TableCell>
//                           <TableCell>
//                             <Button color="secondary" variant="contained" disabled={Complaint.DeletedAt} onClick={() => deleteComplaintData(Complaint._id)} >Delete</Button>
                           
//                           </TableCell></>
//                               ):(<>
//                                 <TableCell>
                                  
                                 
//                                   <Button color="primary" variant="contained" style={{ marginRight: 10 }} disabled={true} component={Link} to={`/edit/${Complaint._id}`}>Edit</Button>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Button color="secondary" variant="contained" disabled={true} onClick={() => deleteComplaintData(Complaint._id)} >Delete</Button>
                                  
//                                 </TableCell></>

//                               )}

//                         </TableRow>
//                       </>
//                               );
//                   })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={allComplaints.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage} />
//         </Paper>

//       </Box></>
//   );
// }

