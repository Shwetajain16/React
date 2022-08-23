import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import useStyles from "./styles";
import { createTicket, updateTicket } from "../../actions/tickets";
import { useDispatch, useSelector } from "react-redux";
import Tickets from "../Tickets/Tickets";
import { getTickets } from "../../actions/tickets";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  makeStyles,
} from "@material-ui/core";

function Dashboard() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const [ticket, setticket] = useState({
    empid: "",
    ticket_desc: "",
    empname: user?.result?.name,
  });

  function validateDetails(e) {
    e.preventDefault();

    dispatch(createTicket({ ...ticket }));
    setOpen(false);

    setticket({ ...ticket, empid: "", ticket_desc: "" });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  useEffect(() => {
    if(!user)
    {
      navigate('/');
    }
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <div className={classes.mainContainer}>
      <div>
        {/* <Button
          variant="contained"
          color="success"
          component={Link}
          to="/filter"
        >
          Filter Here
        </Button> */}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={handleClickOpen} className={classes.ticketBtn} >
          Add New Ticket
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle align="center">Add Ticket</DialogTitle>
          <DialogContent>
            <FormGroup>
              <InputLabel htmlFor="empid" className={classes.label}>
                Employee ID
              </InputLabel>
              <Input
                onChange={(e) =>
                  setticket({ ...ticket, empid: e.target.value })
                }
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
      </div>
      <Tickets itemsPerPage={10} />
    </div>
  );
}

export default Dashboard;
