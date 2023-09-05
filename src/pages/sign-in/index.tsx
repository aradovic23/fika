import { SignIn } from '@clerk/nextjs';

const SignInPage = () => <SignIn path="/sign-in" signUpUrl="/sign-up" redirectUrl="/" />;
export default SignInPage;
