import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-primary text-white shadow">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Drinks App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="link-hover link" href="/submit-drink">
              Submit Drink
            </Link>
          </li>
          <li>
            <Link className="link-hover link" href="/drinks">
              All Drinks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
