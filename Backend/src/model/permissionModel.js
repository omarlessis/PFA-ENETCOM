const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true
  }
});

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;