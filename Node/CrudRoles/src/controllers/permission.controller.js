import { Permission, RolePermission } from "../models/index.js"

export const createPermission = async(req, res) => {
    try {
        const {feature,name} = req.body;
        const permission = await Permission.create({feature,name});

        res.status(200).json({
            message: "Permission created successfully",
            permission
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const editPermission = async(req, res) => {
    
    try {
        const {permission_id} = req.params;
        const {feature, name} = req.body;
        const permission = await Permission.findByPk(permission_id);
        
        if(!permission){
            return res.status(404).json({
                error: "permission not found",
                permission_id: permission_id
            })
        }

        await permission.update({feature: feature, name: name }) 

        const newPermission = await Permission.findByPk(permission.permission_id);

        res.status(200).json({
            message: "Permission update successfully",
            newPermission
        })
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const getPermissionByUserId = async (user_id, roleIds) => {

  const permissions = await RolePermission.findAll({
    where: {
      role_id: roleIds
    },
    include: [{
      model: Permission,
      attributes: ['feature', 'name']
    }],

  });

  const permissionNames = permissions.map(rp => {
    return {
        feature: rp.Permission.feature,
        name: rp.Permission.name
    };
    });

  return permissionNames;
};
