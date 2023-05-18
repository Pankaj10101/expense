import React, { useState, useContext } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Store } from '../../Context/context';

const Home = () => {
  const { isLogin, addExpenses, expenses } = useContext(Store);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');


  const handleAddExpense = (e) => {
    e.preventDefault();
    if(moneySpent && description && category){
      const newExpense = {
        id: expenses.length + 1,
        moneySpent,
        description,
        category,
      };
      addExpenses(newExpense)
      setMoneySpent('');
      setDescription('');
      setCategory('');
    }else{
      alert('Fill al fields')
    }
    
  };

  if (!isLogin) {
    return (<div className='text-center fs-5' >Welcome To Expense Tracker</div>)
  }

  return (
    <div className="container mt-5">
      <h2>Expense Tracker</h2>

      <Form onSubmit={handleAddExpense} className="mt-4">
  <div className="row">
    <div className="col-md-4">
      <Form.Group controlId="moneySpent">
        <Form.Label>Money Spent</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          value={moneySpent}
          onChange={(e) => setMoneySpent(e.target.value)}
        />
      </Form.Group>
    </div>

    <div className="col-md-4">
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
    </div>

    <div className="col-md-4">
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Shopping</option>
          <option value="Salary">Travel</option>
          <option value="Salary">Entertainment</option>
        </Form.Control>
      </Form.Group>
    </div>
  </div>

  <div className="text-center mt-4">
    <Button variant="primary" type="submit">
      Add Expense
    </Button>
  </div>
</Form>

      {expenses.length > 0 && (
        <div className="mt-4">
          <h3>Expenses:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Money Spent</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.moneySpent}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Home;
