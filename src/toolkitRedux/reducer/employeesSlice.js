import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http";



const initialState = {
    employeesData: [],
    limit: 7,
    totalPage: null,
    currentPage: 1,
    isLoading: false,
    error: '',
    isSuccess: false,
    createNewEmployee: false,
    deleteUserSuccess: false,
    deleteUserLoading: false,
    deleteNavigate: false,
    deleteUserError: '',
    getOne: {
        loading: false,
        success: false,
        error: '',
    },
    userId: '',
    employeeData: {
        id: '',
        name: '',
        surname: '',
        email: '',
        mobileNumber: '',
        birthDate: '',
        gender: '',
        address: '',
        startDate: '',
        department: '',
        position: '',
        role: '',
    }
}

export const addUser = createAsyncThunk(
    'user/addOne',
    async ({ name, position, birthDate, department, surname, mobileNumber, address, email, role, startDate, gender }, thunkAPI) => {
        try {
            let response = await $api.post('/employees/add', {
                name, position, birthDate, department, surname, mobileNumber, address,
                email, role, startDate, gender
            })
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id, thunkAPI) => {
        try {
            let response = await $api.delete(`/employees/${id}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong. Failed to delete employee.")
        }
    }
)
export const getOneUser = createAsyncThunk(
    'user/getOne',
    async (id, thunkAPI) => {
        try {
            let response = await $api.get(`/employees/${id}`)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong. Failed to get employee.")
        }
    } 
)

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployeesData(state, action) {
            state.employeesData = action.payload
        },
        setTotalPage(state, action) {
            state.totalPage = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        getEmployeesDataLoading(state) {
            state.isLoading = true
        },
        getEmployeesSuccess(state, action) {
            state.isLoading = false
            state.totalPage = action.payload
        },
        getEmployeesError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        getAddUserLoading(state) {
            state.addUserIsLoading = true
        },
        getAddUserSuccess(state) {
            state.addUserSuccess = false
        },
        getAddUserError(state, action) {
            state.error = action.payload
        },
        getCreateNewEmployee(state, action) {
            state.createNewEmployee = action.payload
        },
        getIsSuccessFalse(state) {
            state.isSuccess = false
        },
        getDeleteUserSuccess(state, action) {
            state.deleteUserSuccess = action.payload
        },
        getOneUserId(state, action) {
            state.userId = action.payload
        },
        getDeleteNavigate (state, action) {
            state.deleteNavigate = action.payload
        }
    },
    extraReducers: {
        [addUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [addUser.fulfilled.type]: (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.createNewEmployee = false
        },
        [addUser.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [deleteUser.pending.type]: (state) => {
            state.deleteUserLoading = true
        },
        [deleteUser.fulfilled.type]: (state) => {
            state.deleteUserLoading = false
            state.deleteUserSuccess = false
            state.deleteNavigate = true
        },
        [deleteUser.rejected.type]: (state, action) => {
            state.deleteUserLoading = false
            state.deleteUserError = action.payload
        },
        [getOneUser.pending.type]: (state) => {
            state.getOne.loading = true
        },
        [getOneUser.fulfilled.type]: (state, action) => {
            state.getOne.loading = false
            state.getOne.success = true
            state.employeeData.id = action.payload.id
            state.employeeData.name = action.payload.name
            state.employeeData.surname = action.payload.surname
            state.employeeData.email = action.payload.email
            state.employeeData.mobileNumber = action.payload.mobileNumber
            state.employeeData.birthDate = action.payload.birthDate
            state.employeeData.gender = action.payload.gender
            state.employeeData.address = action.payload.address
            state.employeeData.startDate = action.payload.startDate
            state.employeeData.department = action.payload.department
            state.employeeData.position = action.payload.position
            state.employeeData.role = action.payload.role
        },
        [getOneUser.rejected.type]: (state, action) => {
            state.deleteUserLoading = false
            state.deleteUserError = action.payload
        }
    }
})


export const getUsers = (limit = 5, page = 1) => {
    return async (dispatch) => {
        try {
            dispatch(employeesSlice.actions.getEmployeesDataLoading())
            let response = await $api.get(`/employees/?limit=${limit}&page=${page}`)
            console.log(response)
            dispatch(employeesSlice.actions.setEmployeesData(response.data.users))
            dispatch(employeesSlice.actions.getEmployeesSuccess(response.data.count))
        } catch (error) {
            dispatch(employeesSlice.actions.getEmployeesError(error.message))
        }
    }
}

// export const addUser = (name, position, birthDate, department, surname, mobileNumber, address, email, role, startDate, gender) => {
//     return async (dispatch) => {
//         try {
//             dispatch(employeesSlice.actions.getAddUserLoading())
//             let response = await $api.post('/employees/add', {name, position, birthDate, department, surname, mobile: mobileNumber, address, 
//             email, role, startDate, gender})
//             dispatch(employeesSlice.actions.getAddUserSuccess())
//             console.log(response)
//         } catch (error) {
//             dispatch(employeesSlice.actions.getAddUserError(error.message))
//             console.log(error)
//     }
// }
// }



export const actions = employeesSlice.actions
export default employeesSlice.reducer;