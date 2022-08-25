import React,{useState} from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, Typography,makeStyles ,Box, FormLabel} from '@material-ui/core';
import { validName,validEmail,validNumeric, validPhone, validPassword } from '../../js/RegEx';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/user';
const initialValue = {
  name: '',
  email: '',
  phone: '',
  password: '',
}

const initialIsValidValue = {
  isname: '',
  isemail: '',
  isphone: '',
  ispassword: '',
}

const useStyles = makeStyles({
  container: {
      width: '50%',
        margin: '10% 10% 10% 25%',
        
     
  }
})


const Signup = () => {

  const [user, setUser] = useState(initialValue);
  const { name, email, phone,password } = user;

  const [isValid, setIsValid] = useState(initialIsValidValue);
  const { isname, isemail, isphone,ispassword } = isValid;
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const navigate = useNavigate();
  const validationMessageCSS = {color:'red',marginBottom:'20px'}
  
  
  const onChangeSetState=(e)=>{
      setUser({...user, [e.target.name]: e.target.value});
  }


  const onValidate = (e,regEx) => {
      const RegExObj=new RegExp(regEx);
      const isValidKey='is'+e.target.name;
      
     
      if(e.target.value==="" || RegExObj.test(e.target.value))
      {
          setIsValid({...isValid,[isValidKey]:''});
          setUser({...user, [e.target.name]: e.target.value});
      }
      else{
          setIsValid({...isValid,[isValidKey]:'Invalid input..!!'});
        
      }
  }

  var flag=true;
  const validateDetailsFlag = Object.values(isValid).every(value => {
      if (value!==null && value!=='') {
          flag=false;
      }
      return flag;
  });


  function validateDetails(){
      
      if(validateDetailsFlag)
      {
          dispatch(signup(user, navigate))
      }
      else{
          alert("Invalid input..!!");
      }
  }
  
  
    return (
      <Box>
   <FormGroup className={classes.container} style={{backgroundImage:""}}>
          <Typography variant="h4">Signup</Typography>
          
                <FormControl>
              <InputLabel htmlFor="name">Enter Your Name</InputLabel>
              <Input onChange={(e) => onValidate(e,validName)} onBlur={(e) => onValidate(e,validName)} name="name" value={name} id="txtName" inputProps={{ maxLength: 40 }} />
              <div style={validationMessageCSS}>{isname}</div>
          </FormControl>
          <FormControl>
              <InputLabel htmlFor="email">Enter your Email ID:</InputLabel>
              <Input onChange={(e) => onChangeSetState(e)} onBlur={(e) => onValidate(e,validEmail)} name='email' value={email} id="txtEmailId" inputProps={{ maxLength: 50 }} />
              <div style={validationMessageCSS}>{isemail}</div>
          </FormControl>
          <FormControl>
              <InputLabel htmlFor="phone">Enter Your Phone Number</InputLabel>
              <Input onChange={(e) => onValidate(e,validNumeric)} onBlur={(e) => onValidate(e,validPhone)} name='phone' value={phone} id="txtContactNo" inputProps={{ maxLength: 10 }} />
              <div style={validationMessageCSS}>{isphone}</div>
          </FormControl>
          <FormControl>
              <InputLabel htmlFor="password"> Enter Your Password</InputLabel>
              <Input type='password' onChange={(e) => onChangeSetState(e)} onBlur={(e) => onValidate(e,validPassword)} name='password' value={password} id="txtPassword" inputProps={{maxLength: 12 }} />
              <div style={validationMessageCSS}>{ispassword}</div>
          </FormControl>
          <br/>
          <FormControl>
              <Button variant="contained" color="primary" disabled={name.length===0 || phone.length===0 || email.length===0 || password.length===0 || isphone.length!==0 || isname.length!==0} onClick={() => validateDetails()}>Register</Button>
          </FormControl>
            </FormGroup>
            </Box>
  )
}

export default Signup