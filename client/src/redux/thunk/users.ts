import { usersActions } from "../slices/users";
import { AppDispatch } from "../store";

import { User } from "../../type/types";
// import { BASE_URL } from "../../api";

// const userListURL = `${BASE_URL}/users`;
const userListURL = `http://localhost:8000/api/v1/users`;

export function getUserList() {
  const token = localStorage.getItem("userToken");
  return async (dispatch: AppDispatch) => {
    const response = await fetch(userListURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedUserList: User[] = await response.json();
    console.log(fetchedUserList);
    dispatch(usersActions.setUserList(fetchedUserList));
  };
}
