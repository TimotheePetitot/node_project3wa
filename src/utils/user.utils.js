export const formatUser = (user) => {
  return {
    id: user.id,
    lastname: user.lastname,
    firstname: user.fistname,
    pseudo: user.pseudo,
    email: user.email,
    password: user.password,
    salary: user.salary,
    user_saving: user.user_saving,
    user_img: user_img,
    role: role,
  };
};

export const formatUsers = (users) => {
  return users.map(formatUser);
};
