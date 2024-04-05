import { redirect, type MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader() {
  return redirect('/login');
}

export default function Index() {
  return (
    <h1 className="text-center font-extrabold">Welcome to the big show 📺</h1>
  );
}
