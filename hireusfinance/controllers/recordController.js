const Record = require("../models/recordModel");
const { recordSchema } = require("../validations/recordValidation");
exports.createRecord = async (req, res) => {
  try {
    const { error } = recordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const record = await Record.create(req.body);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating record",
      error: err.message,
    });
  }
};
exports.getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    const records = await Record.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching records",
      error: err.message,
    });
  }
};
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    res.json({
      success: true,
      data: record,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating record",
      error: err.message,
    });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    res.json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting record",
      error: err.message,
    });
  }
};