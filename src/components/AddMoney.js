import React, { useState } from 'react';

function AddMoney({ users, updateUserBalance }) {
  const [selectedUserId, setSelectedUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [recipientId, setRecipientId] = useState('')

  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleTransferAmountChange = (e) => {
    setTransferAmount(e.target.value)
  }

  const handleRecipientChange = (e) => {
    setRecipientId(e.target.value)
  }

  const handleAddFunds = () => {
    const user = users.find(u => u.id === parseInt(selectedUserId))
    if (user && !isNaN(amount) && amount > 0) {
      updateUserBalance(user.id, parseFloat(amount))
      setSelectedUserId('')
      setAmount('')
    }
  }

  const handleSendMoney = () => {
    const sender = users.find(u => u.id === parseInt(selectedUserId))
    const recipient = users.find(u => u.id === parseInt(recipientId))
    
    if (sender && recipient && !isNaN(transferAmount) && transferAmount > 0 && sender.balance >= transferAmount) {
      updateUserBalance(sender.id, -parseFloat(transferAmount))
      updateUserBalance(recipient.id, parseFloat(transferAmount))
      setSelectedUserId('')
      setRecipientId('')
      setTransferAmount('')
    }
  }

  return (
    <div className="add-funds">
      <h2>Add Funds / Send Money</h2>
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

      <select value={recipientId} onChange={handleRecipientChange}> {/* Use recipientId */}
        <option value="">Select Recipient</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Transfer Amount"
        value={transferAmount}
        onChange={handleTransferAmountChange}
      />
      <button onClick={handleSendMoney}>Send Money</button>
    </div>
  );
}

export default AddMoney;