const userModel = require('../models/user.model')

module.exports.createUser = async({
    username, email, password, role
}) => {
    if(!username || !email || !password || !role) {
        throw new Error('All fields required');
    }
    const user = userModel.create({
        username,
        email,
        password,
        role
    })
    return user;
}

module.exports.updateUser = async (userId, data) => {
  if (!userId) throw new Error("User ID required");

  await userModel.findOneAndUpdate(
    { _id: userId },
    data,
  );
  const udpatedUser = await userModel.findById(userId);

  return udpatedUser;
};

module.exports.deleteUser = async(userId) => {
   if (!userId) {
    throw new Error("User ID required");
  }

  const result = await userModel.findOneAndUpdate({ _id: userId,
    status: 'active'
   },{status : 'deleted'});
   
  return result;

}