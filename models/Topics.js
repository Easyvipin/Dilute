const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  type: {
    type: String,
    unique: true,
    required: [true, "Topic type is required"],
  },
  inTrending: {
    type: Boolean,
    required: [true, "value is required"],
  },
  interaction: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Topic", TopicSchema);
