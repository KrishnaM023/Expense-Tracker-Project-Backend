const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  try {
    const newExpense = await Expense.create({ amount, description, category });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Error creating expense' });
  }
  
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category } = req.body;
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      await expense.save();
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating expense' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.status(200).json({ message: 'Expense deleted' });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense' });
  }
};
