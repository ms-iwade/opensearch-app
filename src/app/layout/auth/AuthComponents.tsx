import { Authenticator } from '@aws-amplify/ui-react';
import Header from "./Header";
import Footer from "./Footer";

const AuthComponents: Partial<typeof Authenticator.Provider> = {
  Header,
  Footer,
};

export default AuthComponents; 