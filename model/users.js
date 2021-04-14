const User = require("./schemas/userSchema");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const createNewUser = async ({
  email,
  password,
  subscription,
  token,
  avatarURL,
}) => {
  const user = await new User({
    email,
    password,
    subscription,
    token,
    avatarURL,
  }).save();
  return user;
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const patchSub = async (id, sub) => {
  const user = await User.findByIdAndUpdate(
    id,
    { subscription: sub },
    { new: true }
  );
  return user;
};

const patchAvatar = async (id, avatar) => {
  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL: avatar },
    { new: true }
  );
  return user;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createNewUser,
  updateToken,
  patchSub,
  patchAvatar,
};
