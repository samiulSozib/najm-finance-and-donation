import {
    ROLE_PERMISSION_LIST_REQUEST,
    ROLE_PERMISSION_LIST_SUCCESS,
    ROLE_PERMISSION_LIST_FAIL,
    PERMISSION_LIST_REQUEST,
    PERMISSION_LIST_SUCCESS,
    PERMISSION_LIST_FAIL,
    ROLE_PERMISSION_ADD_REQUEST,
    ROLE_PERMISSION_ADD_SUCCESS,
    ROLE_PERMISSION_ADD_FAIL,
    ROLE_PERMISSION_EDIT_REQUEST,
    ROLE_PERMISSION_EDIT_SUCCESS,
    ROLE_PERMISSION_EDIT_FAIL,
    ROLE_PERMISSION_DELETE_REQUEST,
    ROLE_PERMISSION_DELETE_SUCCESS,
    ROLE_PERMISSION_DELETE_FAIL,
} from '../constants/roleConstant';

const initialState = {
    role_permissions: [],
    permissions: [],
    error: null,
    loading: false,
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROLE_PERMISSION_LIST_REQUEST:
            return { ...state, loading: true };
        case ROLE_PERMISSION_LIST_SUCCESS:
            return { ...state, loading: false, role_permissions: action.payload };
        case ROLE_PERMISSION_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        case PERMISSION_LIST_REQUEST:
            return { ...state, loading: true };
        case PERMISSION_LIST_SUCCESS:
            return { ...state, loading: false, permissions: action.payload };
        case PERMISSION_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        case ROLE_PERMISSION_ADD_REQUEST:
            return { ...state, loading: true };
        case ROLE_PERMISSION_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                role_permissions: [...state.role_permissions, action.payload], // Add the new role to the existing list
            };
        case ROLE_PERMISSION_ADD_FAIL:
            return { ...state, loading: false, error: action.payload };

        case ROLE_PERMISSION_EDIT_REQUEST:
            return { ...state, loading: true };
        case ROLE_PERMISSION_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                role_permissions: state.role_permissions.map(role =>
                    role.id === action.payload.id ? action.payload : role // Update the role in the list
                ),
            };
        case ROLE_PERMISSION_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload };

        case ROLE_PERMISSION_DELETE_REQUEST:
            return { ...state, loading: true };
        case ROLE_PERMISSION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                role_permissions: state.role_permissions.filter(role => role.id !== action.payload), // Remove the deleted role
            };
        case ROLE_PERMISSION_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default roleReducer;
