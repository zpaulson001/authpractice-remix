import { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import stylesheet from '~/auth.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function AuthPage() {
  return (
    <div className="flex flex-col justify-around items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}
