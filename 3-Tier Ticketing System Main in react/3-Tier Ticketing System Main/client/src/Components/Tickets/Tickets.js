import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTicket, deletedTicket } from "../../actions/tickets";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Typography } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { FormGroup, InputLabel, Input } from "@material-ui/core";
import Table from "@mui/material/Table";
import ReactPaginate from "react-paginate";
import useStyles from "./styles";

// https://www.npmjs.com/package/react-paginate
const Tickets = ({ itemsPerPage }) => {
  const tickets = useSelector((tickets) => tickets.ticket);

  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userold, setUserold] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [open, setOpen] = useState(false);

  const [currentId, setCurrentId] = useState(0);
  const [ticket, setticket] = useState({
    empid: "",
    ticket_desc: "",
    empname: userold?.result?.name,
  });

  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [searchItem, setSearchItem] = useState(""); //for serching name

  const [serchField, setSerchField] = useState("Filter by"); //state for dropdown
  const [itemOffset, setItemOffset] = useState(0);

  const ticketfind = useSelector((tickets) =>
    currentId
      ? tickets.ticket.find((message) => message._id === currentId)
      : null
  );
  const handleClose = () => {
    setOpen(false);
    setCurrentId(0);
  };

  function validateDetails(e) {
    e.preventDefault();

    dispatch(updateTicket(currentId, { ...ticket }));
    setOpen(false);
    setCurrentId(0);
    setticket({ ...ticket, empid: "", ticket_desc: "" });
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tickets.length;

    setItemOffset(newOffset);
  };
  useEffect(() => {
    if (ticketfind) {
      setticket(ticketfind);
    }
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(tickets.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tickets.length / itemsPerPage));
  }, [ticketfind, itemOffset, itemsPerPage, tickets]);

  return !tickets.length ? (
    <h1>No Tickets Your Work</h1>
  ) : (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center">Add Ticket</DialogTitle>
        <DialogContent>
          <FormGroup>
            <InputLabel htmlFor="empid" className={classes.label}>
              Employee ID
            </InputLabel>
            <Input
              onChange={(e) => setticket({ ...ticket, empid: e.target.value })}
              required
              name="empid"
              value={ticket.empid}
              id="empid"
              inputProps={{ maxLength: 50 }}
            />
          </FormGroup>
          <TextField
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "30px",
            }}
            disabled
            id="outlined-disabled"
            label="EMPLOYEE NAME"
            defaultValue={ticket.empname}
          />
          <TextField
            id="outlined-disabled"
            label="Ticket Desc"
            required
            name="ticket_desc"
            value={ticket.ticket_desc}
            onChange={(e) =>
              setticket({ ...ticket, ticket_desc: e.target.value })
            }
            sx={{
              marginTop: "20px",
              width: 500,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={validateDetails}>Submit</Button>
        </DialogActions>
      </Dialog>
      <div className={classes.searchContainer}>
        <div>
          <select
            id="field"
            value={serchField}
            onChange={(e) => {
              setSerchField(e.target.value);
            }}
            style={{
              height: "40px",
              width: 200,
              margin: "0 10px",
              borderRadius: "5px",
            }}
          >
            <option value="Filter by" selected>
              Filter by
            </option>
            <option value="Name">Name</option>
            <option value="Create Date">Create Date</option>
            <option value="Employee ID">Employee ID</option>
          </select>
        </div>
        <TextField
          sx={{ margin: "10px 20px" }}
          id="outlined-basic"
          label="Search Here"
          variant="outlined"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
      </div>

      <TableContainer
        component={Paper}
        style={{ backgroundColor: "transparent" }}
      >
        <Table
          aria-label="simple table"
          stickyHeader
          style={{
            marginTop: "30px",
            padding: "0 100px",
            backgroundColor: "transparent",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Ticket No</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Ticket DESC</TableCell>
              <TableCell align="left">Employee ID</TableCell>
              <TableCell align="left">Created At</TableCell>

              <TableCell align="left">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Updated At</TableCell>
              <TableCell align="center">Resolved At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "transparent" }}>
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
              })
              .map((ticket, index) => (
                <TableRow
                  style={{
                    backgroundColor: ticket.Resolved
                      ? "#a3cfbb"
                      : "transparent",
                  }}
                  key={ticket._id}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {ticket.empname}
                  </TableCell>

                  <TableCell align="left">{ticket.ticket_desc}</TableCell>
                  <TableCell align="left">{ticket.empid}</TableCell>
                  <TableCell align="left">
                    {ticket.createdAt}
                    <Typography>{moment(ticket.Date).fromNow()}</Typography>
                  </TableCell>
                  {user?.result?.googleId === ticket?.creator ||
                  user?.result?._id === ticket?.creator ? (
                    <>
                      <TableCell align="right">
                        <Button
                          disabled={ticket.Resolved}
                          className={classes.Delete}
                          onClick={() => dispatch(deletedTicket(ticket))}
                        >
                          <DeleteIcon fontSize="small" />
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          disabled={ticket.Resolved}
                          className={classes.Update}
                          onClick={() => {
                            setCurrentId(ticket._id);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                          Update
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="right">
                        <Button
                          disabled={true}
                          className={classes.Delete}
                          onClick={() => dispatch(deletedTicket(ticket))}
                        >
                          <DeleteIcon fontSize="small" />
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          disabled={true}
                          className={classes.Update}
                          onClick={() => {
                            setCurrentId(ticket._id);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                          Update
                        </Button>
                      </TableCell>
                    </>
                  )}
                  {ticket?.updatedAt ? (
                    <TableCell align="right">
                      {/* {ticket.updatedAt} */}
                      <Typography>
                        {moment(ticket.updatedAt).fromNow()}
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell align="right">
                      <Typography>No Update Yet</Typography>
                    </TableCell>
                  )}
                  {ticket?.DeletedAt && (
                    <TableCell align="right">
                      <Typography>
                        {moment(ticket.DeletedAt).fromNow()}
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default Tickets;
