import jwt from "jsonwebtoken";
import {body,validationResult} from "express-validator";
const secret=process.env.SECRET;
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    if (token) {      
      let decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
      }

    next();
  } catch (error) {
    
  }
};  

// export const validateUserSignUp = [



//   body("name", "Enter valid  name.").exists(),

//   body("email", "Enter valid email").exists().isEmail(),

//   body("phone", "Enter Valid Username").exists(),

//   body("password", "Password is invalid.").exists().isLength({ min: 8, max: 16 }),

//   (req, res, next) => {

//     const errors = validationResult(req);



//     if (!errors.isEmpty()) {

//       return res.status(400).json({ errors: errors.array() });



//     }


// next();



//   },



// ];

// export const validateUser = [



//   body("email", "Enter a valid email").isEmail(),



//   (req, res, next) => {



//     const errors = validationResult(req);



//     if (!errors.isEmpty())



//       return res.status(422).json({ errors: errors.array() });



//     next();



//   },



// ];


export default auth;
