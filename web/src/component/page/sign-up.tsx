import { useSignUp } from "./sign-up-hook";

export const SignUp = () => {
  const page = useSignUp();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        page.signUp();
      }}
    >
      <span>Username</span>
      <br />
      <input
        onChange={(e) => page.setUsername(e.target.value)}
        value={page.username}
      />

      <div>
        <span>Password</span>
      </div>
      <input
        onChange={(e) => page.setPassword(e.target.value)}
        type={"password"}
        value={page.password}
      />
      <br />

      <div>
        <span>Admin Password</span>
      </div>
      <input
        onChange={(e) => page.setAdminPassword(e.target.value)}
        type={"password"}
        value={page.adminPassword}
      />
      <br />

      <button type={"submit"}>submit</button>
    </form>
  );
};
