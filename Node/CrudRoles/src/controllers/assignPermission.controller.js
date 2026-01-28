import { Permission, Role, RolePermission } from "../models/index.js";

export const assignPermission = async(req, res) => {
    try {
        const {role,feature, permission} = req.body;
        const roleData = await Role.findOne({ 
            where: {
                name: role
            }
         });

        if(!roleData){
            return res.status(404).json({
                error: "role not found",
                role
            })
        }
        
        const permissionData = await Permission.findOne({
            where: {
                feature: feature,
                name: permission
            } 
        });

        if(!permissionData){
            return res.status(404).json({
                error: "permission not found",
                permission
            })
        }

        const alreadyAssign = await RolePermission.findOne({
            where:{
                role_id: roleData.role_id,
                permission_id: permissionData.permission_id
            }
        });

        if(alreadyAssign){
            return res.status(401).json({
                error:"Permission already assigned"
            })
        }

        await RolePermission.create({
            role_id: roleData.role_id,
            permission_id: permissionData.permission_id
        });

        res.status(200).json({
            message: "Assign Permission successfully",
            rolePermission: {
                role,
                permission
            }
        })
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}