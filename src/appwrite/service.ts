import {Account, Client, ID} from 'appwrite';
import Snackbar from 'react-native-snackbar';
import {APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID} from '../../env';
import {
  ForgetPassowrdSchemaType,
  LoginSchemaType,
  OtpSchemaType,
  SignupSchemaType,
} from '../lib/zodSchema';

const appwriteClient = new Client();
type VerifyOTPType = ForgetPassowrdSchemaType & OtpSchemaType;
class AppwriteService {
  account;
  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  // create a new record of user inside appwrite
  async createAccount({email, username, password}: SignupSchemaType) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username,
      );
      if (userAccount) {
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: CreateAccount: ', error);
    }
  }
  async login({email, password}: LoginSchemaType) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: LoginAccount: ', error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: GetCurrentUser: ', error);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: LogoutAccount: ', error);
    }
  }
  async sendOTP({email}: ForgetPassowrdSchemaType) {
    try {
      return await this.account.createEmailToken(ID.unique(), email);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: SendOTP: ', error);
    }
  }

  // verify OTP for the specified email address
  async verifyOTP({email, otp}: VerifyOTPType) {
    try {
      return await this.account.updateVerification(email, otp);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: VerifyOTP: ', error);
    }
  }
}

export default AppwriteService;
