import React,{useState} from "react";
import { Grid, AppBar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {getTicketsBySearch} from '../../actions/tickets'
import Tickts from '../Tickets/Tickets'
function Filter() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
 
    if (search.trim()) {
      dispatch(getTicketsBySearch({ search }));
      navigate(`/tickets/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };
  return (
      <>
         <Grid item xs={12} sm={6} md={3}>
      <AppBar position="static" color="inherit">
        <TextField
          onKeyDown={handleKeyPress}
          name="search"
          variant="outlined"
          label="Search Byname"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={searchPost} variant="contained" color="primary">
          Search
        </Button>
      </AppBar>
    </Grid>
    <Tickts itemsPerPage={10}/>
      </>
 
  );
}

export default Filter;
