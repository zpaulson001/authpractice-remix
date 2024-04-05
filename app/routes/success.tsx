import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import comeOnIn from '~/images/come-on-in.gif';
import { requireUser } from '~/utils/guards.server';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🔓</text></svg>',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  return null;
}

export default function SuccessPage() {
  return <img className="mx-auto block" src={comeOnIn} alt="Come on in" />;
}
