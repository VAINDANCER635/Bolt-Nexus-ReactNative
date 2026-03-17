export const authService = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return new Promise<{ user: { id: string; email: string } }>(
      (resolve, reject) => {
        setTimeout(() => {
          if (!email.includes("@")) {
            reject(new Error("Invalid email format"));
            return;
          }

          if (password.length < 6) {
            reject(
              new Error("Password must be at least 6 characters")
            );
            return;
          }

          resolve({
            user: {
              id: Date.now().toString(),
              email,
            },
          });
        }, 1200);
      }
    );
  },
};
