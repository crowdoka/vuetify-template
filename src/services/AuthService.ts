class AuthService {
  login(server: string, email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      //Loging
      resolve();
    });
  }
}

export default new AuthService();
