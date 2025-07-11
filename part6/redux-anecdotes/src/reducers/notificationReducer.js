import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, seconds) => {
    return dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(setNotification(text))
        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer
