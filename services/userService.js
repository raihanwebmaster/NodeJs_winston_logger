import models from "../models";
import { NotFound } from "../utils/errors";


export const getAllUsers = async () => {
  const User = models.User;
  const users = await User.find();
  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  const savedUser = await model.save();
  return savedUser;
};


export const updateUser = async (user) => {
  const id = user._id;
  const User = models.User;
  let model = await User.findById(id);
  if (model) {
    model.userName = user.userName;
    model.save();
    return model;
  }
  throw new NotFound("User not found by the id"  + id)

};

export const deleteUser = async (id) => {
  const User = models.User;

  /**
   * if the user is not null, delete it
   * return user  Not found
   */
  let model = await User.findById(id);
  if (model) {
    const result = await User.deleteOne({ _id: id });
    return result;
  }
  throw new NotFound("User not found by the id"  + id)
};
