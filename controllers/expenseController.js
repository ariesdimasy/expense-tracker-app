// const fs = require("fs")
// const readDB = JSON.parse(fs.readFileSync("./db.json"))
// const expenses = readDB.expenses

const connection = require("./../db");

const expenseList = (req, res) => {
  try {
    connection.query("SELECT * FROM expenses", (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send({
          success: true,
          message: "expense list sucessfully fetch",
          data: result,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "expense list empty",
          data: [],
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const expenseDetail = (req, res) => {
  try {
    const expenseId = req.params.id;

    connection.query(
      `SELECT * FROM expenses WHERE id = ${expenseId}`,
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            success: true,
            message: "expense detail sucessfully fetch",
            data: expenseDetail,
          });
        } else {
          res.status(404).send({
            success: false,
            message: "expense data not found",
            data: {},
          });
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const expenseCreate = (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      nominal: req.body.nominal,
      category: req.body.category,
      date: req.body.date,
    };

    connection.query(
      `INSERT INTO expenses SET name='${newData.name}', nominal='${newData.nominal}', category='${newData.category}', date='${newData.date}', created_at=now()`,
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            success: true,
            message: "expense sucessfully created",
            data: result,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

const expenseUpdate = (req, res) => {
  try {
    const id = req.params.id;

    const expenseIndex = expenses.findIndex((item) => item.id === Number(id));

    if (expenseIndex === -1) {
      res.status(404).send({
        success: false,
        message: "expense data not found",
        data: {},
      });
    } else {
      const newData = {
        name: req.body.name || expenses[expenseIndex].name,
        nominal: req.body.nominal || expenses[expenseIndex].nominal,
        category: req.body.category || expenses[expenseIndex].category,
        date: req.body.date || expenses[expenseIndex].date,
      };

      expenses[expenseIndex] = { id: Number(id), ...newData };
      const newExpenses = expenses;

      const newWriteData = JSON.stringify(
        {
          expenses: newExpenses,
        },
        null,
        4
      );

      fs.writeFileSync("./db.json", newWriteData);

      res.status(200).send({
        success: true,
        message: "expense sucessfully updated",
        data: expenses[expenseIndex],
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

const expenseTotal = (req, res) => {
  const start_date = req.query.start_date
    ? new Date(req.query.start_date)
    : null;
  const end_date = req.query.end_date ? new Date(req.query.end_date) : null;
  const category = req.query.category;

  if (start_date > end_date) {
    return res.status(400).send({
      success: false,
      message: "end_date should be bigger than start_date",
      data: {},
    });
  }

  var resultData = [];

  console.log("start_date => ", start_date.getDate(), start_date.getMonth());
  console.log("end_date => ", end_date.getDate(), end_date.getMonth());

  if (start_date && end_date) {
    resultData = expenses.filter((item) => {
      if (
        new Date(item.date) >= start_date &&
        new Date(item.date) <= end_date
      ) {
        return item;
      }
    });
  } else {
    return res.status(400).send({
      success: false,
      message: "expense start_date or end_date request error",
      data: {},
    });
  }

  if (category) {
    resultData = expenses.filter((item) => {
      if (item.category === category) {
        return item;
      }
    });
  }

  var total = 0;
  resultData.forEach((item) => {
    total = total + item.nominal;
  });

  return res.status(200).send({
    success: true,
    message: "expense sucessfully fetched",
    data: resultData,
    total: total,
  });
};

module.exports = {
  expenseList,
  expenseDetail,
  expenseCreate,
  expenseUpdate,
  expenseTotal,
};
