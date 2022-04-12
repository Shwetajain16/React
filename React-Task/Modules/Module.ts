import{ ValidatorCLS} from './Validator/Validator';

let Email='Zalakthakor807@gmail.com';
let ZCode='38218';

let V=new ValidatorCLS();

let ROfEV=V.isValidEmailStr(Email);
let ROfZV=V.isValidZipCode(ZCode);
console.log("Vallid Email or Not="+ROfEV);
console.log("Valid Zip code Or Not="+ROfZV);