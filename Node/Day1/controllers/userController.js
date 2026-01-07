const { readUser, writeUser, updateUser, deleteUser } = require("../models/userModel");


exports.getUser = async (req, res) => {
    try {
        const users = await readUser();
        res.json({
            status: 200,
            message: "User Fetched",
            data: users
        });
    } catch (error) {
        res.json({
            status: 500,
            message: "Failed to load user"
        })
    }
}

exports.postUser =  async (req, res) => {
    const { name, email } = req.body;
    id = Math.random().toString();
    const data = { id, name, email };
    await writeUser(data);
    res.json({
        status: 201,
        message: "User created successfully",
        user: data
    });
}

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const { name, email } = req.body;
    const updatedUser = await updateUser(id, { name, email });

    if(!updatedUser){
        res.json({
            status: 404,
            message: "User not found"
        })
    }
    res.json({
        status: 200,
        message: "User updated successfully",
        user: updatedUser
    });

}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        status: 404,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: 200,
      message: `User with id ${id} deleted successfully`
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete user"
    });
  }
};
