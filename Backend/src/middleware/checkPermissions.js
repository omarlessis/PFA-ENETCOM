
const PermissionModel = require('../model/permissionModel');

const checkPermissions = async (req, res, next) => {
  const role = req.body.role;
  const permission = req.body.permission;
  try {
    const doc = await PermissionModel.findOne({ role: role });
    if (!doc) {
      res.status(403).send("Accès refusé");
    } else if (doc.permissions.includes(permission)) {
      next();
    } else {
      res.status(403).send("Accès refusé");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = { checkPermissions };
