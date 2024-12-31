import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   approvalID: null,
   siteStatus: null,
   siteVersionID: null,
};

const verificationSlice = createSlice({
   name: "siteVerification",
   initialState,

   reducers: {
      setVals(state, action) {
         state.approvalID = action.payload.approvalID;
         state.siteStatus = action.payload.siteStatus;
         state.siteVersionID = action.payload.siteVersionID;
      },

      clearVals(state) {
         state.approvalID = null;
         state.siteStatus = null;
         state.siteVersionID = null;
      }
   }
});

export const { setVals, clearVals } = verificationSlice.actions;
export default verificationSlice.reducer;