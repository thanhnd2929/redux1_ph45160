import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
        },
        updateExpense: (state, action) => {
            const { id, title, description, date, type, amount } = action.payload;
            const expense = state.expenses.find(expense => expense.id === id);
            if (expense) {
                expense.title = title;
                expense.description = description;
                expense.date = date;
                expense.type = type;
                expense.amount = amount;
            }
        },
        searchExpense: (state, action) => {
            return {
                ...state,
                filteredExpenses: state.expenses.filter(expense =>
                    expense.title.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        },
        calculateTotal: (state) => {
            state.totalIncome = state.expenses.filter(expense => expense.type === 'income').reduce((sum, expense) => sum + expense.amount, 0);
            state.totalExpense = state.expenses.filter(expense => expense.type === 'expense').reduce((sum, expense) => sum + expense.amount, 0);
        }
    },
});

export const { addExpense, deleteExpense, updateExpense, searchExpense, calculateTotal } = expenseSlice.actions;
export default expenseSlice.reducer;
