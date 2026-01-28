import Role from "../models/role.model.js";

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Role.findOne({ where: { name } });
    if (exists) {
      return res.status(409).json({ message: "Role already exists" });
    }

    const role = await Role.create({ name });

    res.status(201).json({
      message: "Role created successfully",
      role
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({ roles });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const getRoleById = async (req, res) => {
  try {
    const { role_id } = req.params;

    const role = await Role.findByPk(role_id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ role });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const updateRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(role_id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.name = name || role.name;
    await role.save();

    res.status(200).json({
      message: "Role updated successfully",
      role
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params;

    const role = await Role.findByPk(role_id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.destroy();

    res.status(200).json({
      message: "Role deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
