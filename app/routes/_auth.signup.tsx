import { redirect, ActionFunctionArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { createUser } from '~/utils/auth.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  console.log(formData);

  const user = await createUser(username, password);

  if (user) {
    return redirect('/success');
  } else {
    return null;
  }
}

export default function Signup() {
  return (
    <form className="grid gap-4" method="POST">
      <div>
        <p className="text-2xl font-bold ">Create an account</p>
        <p className="text-sm text-gray-600">
          {`Already have an account? `}
          <Link
            to="/login"
            className="text-blue-600 visited:text-purple-700 underline"
          >
            Log in
          </Link>
        </p>
      </div>
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
