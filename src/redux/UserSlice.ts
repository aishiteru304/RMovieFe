import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '../interface/user'

const initialState: IUserState = {
    token: "",
    name: "",
    image: "",
    isAdmin: false,
    liked: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserState>) => {
            state.token = action.payload.token
        },
        getInformation: (state, action: PayloadAction<IUserState>) => {
            state.isAdmin = action.payload.isAdmin
            state.name = action.payload.name
            state.image = action.payload.image ? action.payload.image : ""
        },
        setAvatar: (state, action: PayloadAction<IUserState>) => {
            state.image = action.payload.image
        },
        setLiked: (state, action) => {
            state.liked = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, getInformation, setAvatar, setLiked } = userSlice.actions

export default userSlice.reducer