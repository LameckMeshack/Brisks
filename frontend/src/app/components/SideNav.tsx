// import Link from "next/link";

// const SideNav = () => {
//   return (
//     <div className="h-screen bg-gray-200 w-64 fixed left-0 top-0 overflow-auto">
//       <nav className="mt-10 px-6 ">
//         <Link href="/">
//           <p className="text-gray-700 text-3xl font-semibold py-4 block hover:text-gray-900">
//             Home
//           </p>
//         </Link>
//         <Link href="/sales">
//           <p className="text-gray-700 text-3xl font-semibold py-4 block hover:text-gray-900">
//             Sales
//           </p>
//         </Link>
//         <Link href="/monthly">
//           <p className="text-gray-700 text-3xl font-semibold py-4 block hover:text-gray-900">
//             Monthly
//           </p>
//         </Link>
//       </nav>
//     </div>
//   );
// };


// export default SideNav;
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SideNav = () => {
  const router = useRouter();

  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <div className="h-screen bg-gray-200 w-64 fixed left-0 top-0 overflow-auto">
      <nav className="mt-10 px-6 ">
        <Link href="/">
          <p
            className={`text-gray-700 text-3xl font-semibold py-4 block hover:text-gray-900 ${
              isActive("/") ? "text-blue-500" : ""
            }`}
          >
            Home
          </p>
        </Link>
        <Link href="/dashboard">
          <p
            className={`text-gray-700 text-3xl font-semibold py-4 block hover:text-gray-900 ${
              isActive("/dashboard") ? "text-blue-500  text-sm" : ""
            }`}
          >
            Dashboard
          </p>
        </Link>
        <Link href="/monthly">
          <p
            className={`text-gray-700 text-3xl font-semibold py-4 block hover:text-gray-900 ${
              isActive("/monthly") ? "text-blue-500" : ""
            }`}
          >
            Monthly
          </p>
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;

