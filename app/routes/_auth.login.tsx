import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Link } from '@remix-run/react';
import { loginUser } from '~/utils/auth.server';
import { isLoggedIn } from '~/utils/guards.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  console.log(formData);

  return await loginUser(username, password);
}

export async function loader({ request }: LoaderFunctionArgs) {
  if (await isLoggedIn(request)) {
    return redirect('/success');
  } else {
    return null;
  }
}

export default function LoginPage() {
  return (
    <form className="grid gap-4" method="POST">
      <div>
        <p className="text-2xl font-bold ">{`Welcome : )`}</p>
        <p className="text-sm text-gray-600">
          New here?{' '}
          <Link
            to="/signup"
            className="text-blue-600 visited:text-purple-700 underline"
          >
            Create an account
          </Link>
        </p>
      </div>
      <label>
        <p>Username</p>
        <input
          className="border border-gray-400 rounded px-2 py-1"
          type="text"
          name="username"
          required
        />
      </label>
      <label>
        <p>Password</p>
        <input
          className="border border-gray-400 rounded px-2 py-1"
          type="password"
          name="password"
          required
        />
      </label>
      <button
        className="bg-blue-500 rounded p-2 text-white hover:bg-blue-400"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
}
