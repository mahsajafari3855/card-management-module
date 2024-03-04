
import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from '../features/cards/cardsSlice'; 
const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
  
}
);
export type AppDispatch = typeof store.dispatch;



export default store;
