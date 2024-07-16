import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { addExpense, deleteExpense, updateExpense, searchExpense, calculateTotal } from '../redux/reducers/expenseReducer'; 
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native'; 

const ExpenseScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('income'); 
    const [amount, setAmount] = useState('');
    const [editId, setEditId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses.expenses);
    const filteredExpenses = useSelector(state => state.expenses.filteredExpenses);
    const totalIncome = useSelector(state => state.expenses.totalIncome);
    const totalExpense = useSelector(state => state.expenses.totalExpense);

    const handleAddExpense = () => {
        if (editId) {
            dispatch(updateExpense({ id: editId, title, description, date, type, amount: parseFloat(amount) }));
            setEditId(null);
        } else {
            dispatch(addExpense({ id: Math.random().toString(), title, description, date, type, amount: parseFloat(amount) }));
        }
        setTitle('');
        setDescription('');
        setDate('');
        setType('income');
        setAmount('');
        dispatch(calculateTotal());
    };

    const handleEditExpense = (expense) => {
        setTitle(expense.title);
        setDescription(expense.description);
        setDate(expense.date);
        setType(expense.type);
        setAmount(expense.amount.toString());
        setEditId(expense.id);
    };

    const handleDeleteExpense = (id) => {
        dispatch(deleteExpense(id));
        dispatch(calculateTotal());
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        dispatch(searchExpense(query));
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Tìm kiếm..." value={searchQuery} onChangeText={handleSearch} style={styles.input} />
            <TextInput placeholder="Tiêu đề" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Mô tả" value={description} onChangeText={setDescription} style={styles.input} />
            <TextInput placeholder="Ngày" value={date} onChangeText={setDate} style={styles.input} />
            <TextInput placeholder="Số tiền" value={amount} onChangeText={setAmount} style={styles.input} keyboardType="numeric" />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setType('income')} style={[styles.button, type === 'income' && styles.selectedButton]}>
                    <Text>THU</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('expense')} style={[styles.button, type === 'expense' && styles.selectedButton]}>
                    <Text>CHI</Text>
                </TouchableOpacity>
            </View>
            <Button title={editId ? "Cập nhật" : "Thêm"} onPress={handleAddExpense} />          
            <FlatList
                data={searchQuery ? filteredExpenses : expenses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>Tiêu đề: {item.title}</Text>
                        <Text style={styles.text}>Mô tả: {item.description}</Text>
                        <Text style={styles.text}>Ngày: {item.date}</Text>
                        <Text style={styles.text}>{item.type === 'income' ? 'THU' : 'CHI'} - {item.amount}</Text>
                        <Button title="Sửa" onPress={() => handleEditExpense(item)} />
                        <Button title="Xóa" onPress={() => handleDeleteExpense(item.id)} />
                    </View>
                )}
            />
            <Text style={{fontSize: 16, color: '#006400', fontWeight: 'bold'}}>Tổng thu: {totalIncome}</Text>
            <Text style={{fontSize: 16, color: 'red', fontWeight: 'bold'}}>Tổng chi: {totalExpense}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ccc',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10
    },
    selectedButton: {
        backgroundColor: '#228B22',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000'
    }
});

export default ExpenseScreen;
