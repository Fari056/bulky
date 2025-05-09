import { ACCOUNTTYPE, BOOKINGS, LOGIN, LOGOUT, SIGNUP, ADD_REVIEW } from '../types/index'
const intialState = {
  user: {},
  logged_in: false,
  account_type: "",
  bookings: [],
  reviews: [],
};
const reducer = (state = intialState, action) => {
    switch (action.type) {
      case LOGIN: {
        return {
          ...state,
          user: action.payload,
          logged_in: true,
          date: new Date(),
        };
      }
      case SIGNUP: {
        return {
          ...state,
          user: action.payload,
        };
      }
      case LOGOUT: {
        return {
          ...state,
          user: {},
          logged_in: false,
        };
      }
      case ACCOUNTTYPE: {
        return {
          ...state,
          account_type: action.payload,
        };
      }
      case BOOKINGS: {
        return {
          ...state,
          bookings: action.payload,
        };
      }
      case ADD_REVIEW: {
        return {
          ...state,
          reviews: action.payload,
        };
      }
      default:
        return state;
    }
}
export default reducer;