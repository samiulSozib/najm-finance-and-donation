import { 
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL, 
  GROUP_ADD_REQUEST, 
  GROUP_ADD_SUCCESS, 
  GROUP_ADD_FAIL, 
  GROUP_EDIT_REQUEST, 
  GROUP_EDIT_SUCCESS, 
  GROUP_EDIT_FAIL, 
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS, 
  GROUP_DELETE_FAIL 
  } from '../constants/groupConstants';
  
  const initialState = {
    groups: [],
    error: null,
    loading: false,
  };
  
  const groupReducer = (state = initialState, action) => {
    switch (action.type) {
      case GROUP_LIST_REQUEST:
        return { ...state, loading: true };
      case GROUP_LIST_SUCCESS:
        return { ...state, loading: false, groups: action.payload };
      case GROUP_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      case GROUP_ADD_REQUEST:
      case GROUP_EDIT_REQUEST:
        return { ...state, loading: true, error: null };
      case GROUP_ADD_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          groups: [...state.groups, action.payload] // Add the new usra to the existing list
        };
      case GROUP_EDIT_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          groups: state.groups.map(group => 
            group.id === action.payload.id ? action.payload : group
          )
        };
      case GROUP_ADD_FAIL:
      case GROUP_EDIT_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      case GROUP_DELETE_REQUEST:
        return { ...state, loading: true, error: null };
      case GROUP_DELETE_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          groups: state.groups.filter(group => group.id !== action.payload)
        };
      case GROUP_DELETE_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default groupReducer;
  