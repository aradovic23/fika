import Link from "next/link";

export const MobileNavbar = () => {
  return (
    <section className="dark:bg-dark border-royal/20 fixed inset-x-0 bottom-0 z-50 block border-t-2 bg-gray-700 bg-opacity-30 text-gray-800 shadow-lg backdrop-blur-lg dark:bg-opacity-30 dark:text-gray-400">
      <div id="tabs" className="flex justify-between">
        <Link
          className="focus:text-royal hover:text-royal inline-block w-full justify-center pt-2 pb-1 text-center hover:bg-white"
          href="/drinks"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1 inline-block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="tab block text-xs">Home</span>
        </Link>
        <Link
          href="#"
          className="focus:text-royal hover:text-royal inline-block w-full justify-center pt-2 pb-1 text-center hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1 inline-block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span className="tab block text-xs">Categories</span>
        </Link>
        <Link
          href="#"
          className="focus:text-royal hover:text-royal inline-block w-full justify-center pt-2 pb-1 text-center hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1 inline-block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="tab block text-xs">Gallery</span>
        </Link>
        <Link
          href="#"
          className="focus:text-royal hover:text-royal inline-block w-full justify-center pt-2 pb-1 text-center hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1 inline-block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="tab block text-xs">About</span>
        </Link>
      </div>
    </section>
  );
};
