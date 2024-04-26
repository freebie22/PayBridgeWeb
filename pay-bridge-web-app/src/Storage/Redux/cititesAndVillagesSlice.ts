import { createSlice } from "@reduxjs/toolkit"


export const emptyCitiesAndVillagesState = {
    regions: [],
    citiesAndVillages: [],
    communities: []
}

export const citiesAndVillagesSlice = createSlice({
    name: "citiesAndVillages",
    initialState : emptyCitiesAndVillagesState,
    reducers: {
        setRegions : (state, action) => (
            state.regions = action.payload
        ),
        setCitiesAndVillages: (state, action) => (
            state.citiesAndVillages = action.payload
        ),
        setCommunities : (state, action) => (
            state.communities = action.payload
        )
    }
})

export const {setRegions, setCitiesAndVillages, setCommunities} = citiesAndVillagesSlice.actions;
export const citiesAndVillagesReducer = citiesAndVillagesSlice.reducer;