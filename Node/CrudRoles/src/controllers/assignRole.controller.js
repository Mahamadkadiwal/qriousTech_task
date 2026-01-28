import Users from "../models/users.model.js";
import Role from "../models/role.model.js";
import UserRole from "../models/user_role.model.js";

export const assignRoleToUser = async (req, res) => {
  try {
    const { username, role } = req.body;

    if (!username || !role) {
      return res.status(400).json({
        message: "username and roles are required",
      });
    }

    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dbRoles = await Role.findOne({
      where: { name: role },
    });

    if (!dbRoles) {
      return res.status(404).json({ message: "Roles not found" });
    }

    const alreadyAssign = await UserRole.findOne({
        where: {
            user_id: user.user_id,
            role_id: dbRoles.role_id
        }
    })

    if(alreadyAssign){
    return res.status(401).json({
            error:"Role already assigned"
        })
    }

    await UserRole.create({
      user_id: user.user_id,
      role_id: dbRoles.role_id,
    });


    res.status(200).json({
      message: "Role assignment completed",
      user: username,
      role: role
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
