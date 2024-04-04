import { redirect, ActionFunctionArgs } from '@remix-run/node';
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

export default function Signup() {
  return (
    <form className="grid gap-4" method="POST">
      <input type="hidden" name="login-type" value="signup" />
      <label>
        <p>Username</p>
        <input
          className="border border-gray-400 rounded px-2 py-1"
          type="text"
          name="username"
        />
      </label>
      <label>
        <p>Password</p>
        <input
          className="border border-gray-400 rounded px-2 py-1"
          type="password"
          name="password"
        />
      </label>
      <button
        className="bg-blue-500 rounded p-2 text-white hover:bg-blue-400"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}
