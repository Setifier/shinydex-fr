import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="h-full w-full overflow-y-auto">
      <div className="my-3 divide-y">
        <Link href="/">
          <Image
            src="/logo_shinydex.png"
            alt="ShinyDex Logo"
            width={120}
            height={120}
            className="mx-auto w-32 p-3"
            style={{ height: "auto", width: "auto" }}
            priority
          />
        </Link>
      </div>
      <hr className="border-t-2 border-neutral-dark" />
      <nav className="ml-5 mt-5 flex flex-col space-y-6 p-2">
        <Link href="/guide" className="sidebar-link group flex items-center">
          Guide d&apos;utilisation
        </Link>
        <Link href="/support" className="sidebar-link group flex items-center">
          Nous soutenir
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
