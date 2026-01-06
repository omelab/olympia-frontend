// check if the user is authenticated
export const isAuthenticated = (userTokenCookie: string): boolean => {
  return !!userTokenCookie;
};

export const isUserAdmin = (userType: string) => {
  const adminType = ['ADMIN'];
  return adminType.includes(userType);
};
