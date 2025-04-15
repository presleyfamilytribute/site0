export const authMiddleware = (user: any) => {
  if (!user) {
    throw new Error('Unauthorized access. Please log in.');
  }
};