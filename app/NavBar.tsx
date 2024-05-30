"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "DashBoard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex flex-row gap-5 h-14 px-5 items-center border-b border-zinc-700 mb-5">
      <div>
        <Link className="font-bold text-2xl" href="/">
          Logo
        </Link>
      </div>
      <ul className="flex flex-row items-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "font-bold": link.href === currentPath,
              "text-zinc-300": link.href !== currentPath,
              "transition-all hover:text-zinc-400": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
