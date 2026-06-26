import { Suspense } from "react";
import SignupForm from "./SignupForm";


export default function SignInPage() {
    return (
        <Suspense fallback={null}>
            <SignupForm />
        </Suspense>
    );
}