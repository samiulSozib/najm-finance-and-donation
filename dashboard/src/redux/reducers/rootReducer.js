import {combineReducers} from 'redux'
import authReducer from './authReducer'
import memberReducer from './memberReducer'
import eventReducer from './eventReducer'
import expenseCategoryReducer from './expenseCategoryReducer'
import expenseReducer from './expenseReducer'
import userReducer from './userReducer'
import paymentReducer from './paymentReducer'
import roleReducer from './roleReducer'
import groupTypeReducer from './groupTypeReducer'
import groupReducer from './groupReducer'

const rootReducer=combineReducers({
    auth:authReducer,
    member:memberReducer,
    expenseCategory:expenseCategoryReducer,
    expense:expenseReducer,
    payment:paymentReducer,
    event:eventReducer,
    group:groupReducer,
    user:userReducer,
    role:roleReducer,
    groupType:groupTypeReducer
})

export default rootReducer