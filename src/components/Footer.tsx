const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-gray-500 bg-white px-10 py-5 mx-auto md:px-10">
      <div className="flex items-center justify-center">
        <img src="https://bilecik.yodt.me/yodt.png" className="w-32" />
      </div>
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <p className="leading-relaxed mt-6 text-[15px]">
          Yemeni Students Union in Turkey, Bilecik Branch
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4  sm:space-y-0 flex flex-col sm:flex-row">
        <li className="hover:text-red-800">
          <a href="/#home">About us</a>
        </li>
        <li className="hover:text-red-800">
          <a href="/#services">Services</a>
        </li>
        <li className="hover:text-red-800">
          <a href="/#stats">statistics</a>
        </li>
        <li className="hover:text-red-800">
          <a href="/#team">the team</a>
        </li>
        <li className="hover:text-red-800">
          <a href="/#gallery">Pictures library</a>
        </li>
        <li className="hover:text-red-800">
          <a href="/#sponsors">Supporters</a>
        </li>
        <li className="hover:text-red-800">
          <a href="/#contact">Connect with us</a>
        </li>
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <a
          className="mt-4 sm:mt-0 mx-auto hover:text-red-800"
          href="https://yodt.me">
          © All rights resernved to YODT-BILECIK 2024
        </a>
      </div>
    </footer>
  );
};

export default Footer;
