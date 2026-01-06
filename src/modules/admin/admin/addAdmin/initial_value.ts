export type Admin = {
  fullName: string;
  displayName: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  bloodGroup: string;
  dateOfBirth: string;
  profession: string;
  fatherName: string;
  motherName: string;
  identityType: string;
  mobile: string;
  files: File[];
  picture: string;
  roleIds: Array<number>;
};

export const initialValue: Admin = {
  fullName: '',
  displayName: '',
  username: '',
  password: '',
  email: '',
  gender: '',
  bloodGroup: '',
  dateOfBirth: '',
  profession: '',
  fatherName: '',
  motherName: '',
  identityType: '',
  mobile: '',
  files: [],
  picture: '',
  roleIds: [],
};
