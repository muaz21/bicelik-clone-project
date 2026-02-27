import {useState} from "react";
import {navigation} from "../constants/home";
import {Link} from "react-router-dom";

const Header = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  return (
    <header dir="rtl" className="min-h-[122px]">
      <nav className="pb-5 md:text-sm">
        <div
          className={`gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8 ${
            isNavOpened &&
            "pb-5 md:text-sm absolute z-20 top-0 inset-x-0 bg-white rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"
          }`}>
          <div className="flex items-center justify-between py-5 md:block">
            <Link
              to="/#home"
              onClick={() => {
                setIsNavOpened(false);
              }}>
              <img
                src="https://bilecik.yodt.me/yodt.png"
                width="120"
                height="50"
                alt="Float UI logo"
              />
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => {
                  setIsNavOpened(!isNavOpened);
                }}
                className="menu-btn text-black hover:text-black">
                {!isNavOpened ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
              isNavOpened ? "block" : "hidden"
            }`}>
            <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((nav) => (
                <li key={nav.link} className="text-black hover:text-black">
                  {nav.link.includes("#") ? (
                    <a
                      className="block"
                      onClick={() => {
                        setIsNavOpened(false);
                      }}
                      href={nav.link}>
                      {nav.label}
                    </a>
                  ) : (
                    <Link
                      className="block"
                      onClick={() => {
                        setIsNavOpened(false);
                      }}
                      to={nav.link}>
                      {nav.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-black hover:bg-red-700 active:bg-red-700 duration-150 rounded-full md:inline-flex"
                  to="/#contact">
                  Connect with us
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
