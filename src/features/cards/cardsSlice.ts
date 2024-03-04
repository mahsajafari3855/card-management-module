import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

 export interface MyCard {
  id: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  iban: string;
  account: string;
  expireDate: string;
  isActive: boolean;
  description: string;
}

interface CardsState {
  cards: MyCard[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  status: "idle",
  error: null,
};
const API_BASE_URL = "http://localhost:3001";


export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await axios.get(`${API_BASE_URL}/cards`);
    console.log("Fetched data:", response.data);

  return response.data;
});

// Add a new action type for search
export const searchCards = createAsyncThunk(
  "cards/searchCards",
  async (searchTerm: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/cards?search=${searchTerm}`
    );
    return response.data;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<MyCard>) => {
      state.cards.push(action.payload);
    },
    editCard: (state, action: PayloadAction<MyCard>) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    deleteCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    // Add a reducer for handling the search action
    setSearchResults: (state, action: PayloadAction<MyCard[]>) => {
      state.cards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
        state.error = null; // Reset the error on successful fetch
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred"; // Provide a default message if action.error.message is undefined
      })
      // Add a case for handling the search action
      .addCase(searchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
        state.error = null; // Reset the error on successful search
      })
      .addCase(searchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred"; // Provide a default message if action.error.message is undefined
      });
  },
});

export const { addCard, editCard, deleteCard, setSearchResults } =
  cardsSlice.actions;

export const selectAllCards = (state: { cards: CardsState }) =>
  state.cards.cards;

export default cardsSlice.reducer;
