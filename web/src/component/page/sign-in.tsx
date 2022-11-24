// import * as s from "../../index.css";
import { Link } from "react-router-dom";
// import { logo } from "../../logo";
import { useSignIn } from "./sign-in-hook";

export const SignIn = () => {
  const page = useSignIn();

  //   if (page.loading) {
  //     return (
  //       <div
  //         style={{
  //           height: "338px",
  //         }}
  //       />
  //     );
  //   }

  return (
    // <div className={s.formContainer}>
    <div>
      <form
        // className={s.formContainer__form}
        onSubmit={async (e) => {
          e.preventDefault();
          page.signIn();
        }}
      >
        {/* todo: use label tag */}
        <span>E-mail</span>
        <br />
        <input
          //   className={s.formContainer__form__field}
          onChange={(e) => page.setUsername(e.target.value)}
          //   type={"email"}
          value={page.username}
        />

        {/* <div className={s.formContainer__form__passwordLabel}> */}
        <div>
          <span>Password</span>
          {/* <Link to={"/forgot-password"}>Forgot password?</Link> */}
        </div>
        <input
          //   className={s.formContainer__form__field}
          onChange={(e) => page.setPassword(e.target.value)}
          type={"password"}
          value={page.password}
        />
        <br />
        <button type={"submit"}>submit</button>
        {/* todo: randomized text */}
        {/* <p className={s.formContainer__form__p}> */}
        <p>
          <Link to={"/sign-up"}>Create an account</Link>.
        </p>
      </form>
    </div>
  );
};
