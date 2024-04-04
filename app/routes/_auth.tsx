import { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import stylesheet from '~/auth.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function AuthPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
