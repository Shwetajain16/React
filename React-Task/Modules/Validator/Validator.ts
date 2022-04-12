import { IValidators } from "../Interface/Interface";
import {Constants} from'../constant/Constants';
class ValidatorCLS implements IValidators{
    isValidEmailStr(s: string): boolean {
        return Constants.emailRegex.test(s);

    }
    isValidZipCode(s: string): boolean {
        return s.length === 6 && Constants.numberRegex.test(s);
    }
}

export{ValidatorCLS};