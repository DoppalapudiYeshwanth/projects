const Record = require("../models/recordModel");

exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let income = 0;
    let expense = 0;

    const categoryStats = {};

    records.forEach((r) => {
      if (r.type === "income") {
        income += r.amount;
      } else {
        expense += r.amount;
      }

      if (r.category) {
        if (!categoryStats[r.category]) {
          categoryStats[r.category] = 0;
        }
        categoryStats[r.category] += r.amount;
      }
    });

    res.json({
      success: true,
      data: {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
        categoryBreakdown: categoryStats,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error generating dashboard summary",
      error: err.message,
    });
  }
};