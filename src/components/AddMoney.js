import React, { useState } from 'react';

function AddMoney({ users, updateUserBalance }) {
    const [selectedUserId, setSelectedUserId] = useState('')
    const [amount, setAmount] = useState('')

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value)
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    };

    const handleAddFunds = () => {
        const user = users.find(u => u.id === parseInt(selectedUserId))
        if (user && !isNaN(amount) && amount > 0) {
            updateUserBalance(user.id, parseFloat(amount))
            setSelectedUserId('')
            setAmount('')
        }
    };

    return (
        <div className="add-funds">
            <h2>Add Funds</h2>
            <select value={selectedUserId} onChange={handleUserChange}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountChange}
            />
            <button onClick={handleAddFunds}>Add Money</button>
        </div>
    );
}

export default AddMoney;
