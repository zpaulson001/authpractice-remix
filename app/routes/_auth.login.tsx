import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { loginUser } from '~/utils/auth.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const loginType = formData.get('login-type');
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  console.log(formData);

  const user = await loginUser(username, password);

  if (user) {
    return redirect('/succes');
  } else {
    return null;
  }
}

function CreateAccount() {
  return (
    <div>
      <form method="POST">
        <div>
          <p>Create an account</p>
        </div>
        <input type="hidden" name="login-type" value="createAccount" />
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

function Login() {
  return (
    <div>
      <form method="POST">
        <div>
          <p>Create an account</p>
        </div>
        <input type="hidden" name="login-type" value="login" />
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div>
      <h3>Welcome!</h3>
      {/* <div>
        <div>
          <p>New here?</p>
          <button>Create an account</button>
        </div>
        <div>
          <p>Old Friend?</p>
          <button>Log in</button>
        </div>
      </div> */}
      <Login />
    </div>
  );
}
