import { useSignIn } from "./sign-in-hook";

export const SignIn = () => {
  const page = useSignIn();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        page.signIn();
      }}
    >
      {/* todo: use label tag */}
      <span>E-mail</span>
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
      <button type={"submit"}>submit</button>
    </form>
  );
};
