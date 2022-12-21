import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChartIcon } from '../components/icons';

export default () => {

  const { data: session } = useSession();

  return (
    <header className="flex bg-gray-800 text-base font-medium text-gray-50">
      <div className="w-full flex items-center justify-between border-b-2 border-gray-100 p-6">
        <div className="flex justify-start items-center">
          <Link href="/">
            <span className="sr-only">Project Florida</span>
            <ChartIcon className="h-8 w-auto" />
          </Link>
          <nav className="space-x-10 ml-10">
            <Link href="/chart" className="hover:text-gray-200">Chart</Link>
            <a href="https://github.com/polatengin/florida" className="hover:text-gray-200">GitHub Repo</a>
            <a href="https://github.com/polatengin/florida" className="hover:text-gray-200">Docs</a>
          </nav>
        </div>
        <div className="items-center justify-end">
        {session && session.user ? (
          <button className="whitespace-nowrap hover:text-gray-200" onClick={() => signOut()}>Sign out</button>
        ) : (
          <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 shadow-sm hover:bg-indigo-700" onClick={() => signIn()}>Sign in</button>
        )}
        </div>
      </div>
    </header>
  );
};
