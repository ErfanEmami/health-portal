import SignInForm from "@/components/forms/SignInForm"
import SignUpForm from "@/components/forms/SignUpForm"
import TabSwitcher from "@/components/TabSwitcher"

const AuthenticatePage = () => {
  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <TabSwitcher
          SignUpTab={<SignUpForm />}
          SignInTab={<SignInForm />}
        />
      </div>
    </div>
  )
}

export default AuthenticatePage