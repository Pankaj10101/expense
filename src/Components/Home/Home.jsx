import React, { useState, useContext } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { Store } from "../../Context/context";

const Home = () => {
  const {
    isLogin,
    addExpenses,
    expenses,
    handleEditExpense,
    handleDeleteExpense,  
  } = useContext(Store);

  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (moneySpent && description && category) {
      const newExpense = {
        id: expenses.length + 1,
        moneySpent,
        description,
        category,
      };
      addExpenses(newExpense);
      setMoneySpent("");
      setDescription("");
      setCategory("");
    } else {
      alert("Fill all fields");
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setMoneySpent(expense.moneySpent);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setMoneySpent("");
    setDescription("");
    setCategory("");
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    if (moneySpent && description && category) {
      const updatedExpense = {
        id: editingId,
        moneySpent,
        description,
        category,
      };
      handleEditExpense(updatedExpense, editingId);
      setEditingId(null);
      setMoneySpent("");
      setDescription("");
      setCategory("");
    } else {
      alert("Fill all fields");
    }
  };

  if (!isLogin) {
    return <div className="text-center fs-5">Welcome To Expense Tracker</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Expense Tracker</h2>

      {!editingId ? (
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
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
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
      ) : (
        <Form onSubmit={handleUpdateExpense} className="mt-4">
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
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              Update Expense
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
        </Form>
      )}

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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.moneySpent}</td>
                  <td>
                    {!editingId || editingId !== expense.id ? (
                      <Button variant="info" onClick={() => handleEdit(expense)}>
                        Edit
                      </Button>
                    ) : null}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
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
