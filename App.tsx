// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ExpenseScreen from './src/screens/ExpenseScreen';

const App = () => {
    return (
        <Provider store={store}>
            <ExpenseScreen />
        </Provider>
    );
};

export default App;
