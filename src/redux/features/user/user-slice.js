import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: " ",
        email: "",
        image: ""
    },
    reducers: {
        changeUser: (state, action) => {
            const { name,email,image } = action.payload;

            //Update state variables based on action payload
            state.name = name;
            state.email = email;
            state. image = image;
        }
    }

})

//Exporta actionunum út
export const { changeUser } = userSlice.actions;
export default userSlice.reducer;