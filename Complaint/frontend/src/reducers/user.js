 import * as Auth from '../constants/Auth';

const authReducer = (state = { authData: null }, actions) => {
  switch (actions.type) {
    case Auth.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...actions?.data }));

      return { ...state, authData: actions.data, loading: false, errors: null };
      case Auth.LOGOUT:

      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
