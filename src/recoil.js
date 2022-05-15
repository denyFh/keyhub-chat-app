import { atom } from "recoil";

export const selectedUserState = atom({
  key: "selectedUser",
  default: {id: null, name: ""},
});

export const selectedGroupState = atom({
  key: "selectedGroup",
  default: {id: null, groupName: ""},
});