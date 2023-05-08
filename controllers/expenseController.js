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

    const newData = {
      name: req.body.name,
      nominal: req.body.nominal,
      category: req.body.category,
      date: req.body.date,
    };

    connection.query(
      `UPDATE expenses SET name='${newData.name}', nominal='${newData.nominal}', category='${newData.category}', date='${newData.date}', created_at=now() WHERE id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.status(200).send({
          success: true,
          message: "expense sucessfully updated",
          data: result,
        });
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

const expenseDelete = (req, res) => {
  try {
    const id = req.params.id;

    connection.query(`DELETE FROM expenses WHERE id = ${id}`, (err, result) => {
      if (err) throw err;
      res.status(200).send({
        success: true,
        message: "expense sucessfully deleted",
        data: result,
      });
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

const expenseTotal = (req, res) => {
  try {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const category = req.query.category;

    var result_query =
      "SELECT SUM(expenses.nominal) as 'total' FROM expenses WHERE 1=1 ";

    if (start_date > end_date) {
      return res.status(400).send({
        success: false,
        message: "end_date should be bigger than start_date",
        data: {},
      });
    }

    if (start_date && end_date) {
      result_query += `AND date BETWEEN '${start_date}' AND '${end_date}'`;
    } else {
      return res.status(400).send({
        success: false,
        message: "expense start_date or end_date request error",
        data: {},
      });
    }

    if (category) {
      result_query += `AND category = '${category}'`;
    }

    connection.query(result_query, (err, result) => {
      if (err) throw err;
      if (result) {
        console.log("result => ", result);
        return res.status(200).send({
          success: true,
          message: "expense sucessfully fetched",
          data: result,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

module.exports = {
  expenseList,
  expenseDetail,
  expenseCreate,
  expenseUpdate,
  expenseDelete,
  expenseTotal,
};
