const Supporter = () => {
  return (
    <section
      id="sponsors"
      className="max-w-screen-xl mx-auto px-4 text-center md:px-8 py-14">
      <div className="max-w-xl mx-auto">
        <h3 className="text-3xl font-semibold sm:text-4xl">Supporters</h3>
        <p className="text-gray-600 mt-10 p-3 text-xl font-bold">
          The exclusive sponsor
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              <a
                target="_blank"
                className="mx-4 flex w-[150px] items-center justify-center p-5 hover:bg-red-300 rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer 2xl:w-[180px]"
                href="https://edutesla.com">
                <img
                  src="https://edutesla.com/_next/image/?url=%2Flogo.png&amp;w=128&amp;q=75"
                  alt="Edutesla"
                  className="w-full h-auto my-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <p className="text-gray-600 mt-7 p-3 text-xl font-bold">
          Project partners
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="flex flex-col md:flex-row items-center justify-center flex-wrap">
              <a
                target="_blank"
                className="mx-4 flex w-[150px] items-center justify-center p-5 hover:bg-red-300 rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer 2xl:w-[180px]"
                href="https://yiad.org/">
                <img
                  src="https://yiad.org/wp-content/uploads/2023/08/logo-02-1-300x150.png"
                  alt="YIAD"
                  className="w-full h-auto my-5"
                />
              </a>
              <a
                target="_blank"
                className="mx-4 flex w-[150px] items-center justify-center p-5 hover:bg-red-300 rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer 2xl:w-[180px]"
                href="https://yemenddd.org/">
                <img
                  src="https://yemenddd.org/wp-content/uploads/2021/07/YDT-logo-latest-small-removebg-preview.png"
                  alt="YDT"
                  className="w-full h-auto my-5"
                />
              </a>
              <a
                target="_blank"
                className="mx-4 flex w-[150px] items-center justify-center p-5 hover:bg-red-300 rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer 2xl:w-[180px]"
                href="https://veysvakfi.org/">
                <img
                  src="https://veysvakfi.org/wp-content/uploads/2023/06/cropped-cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D9%88%D9%82%D9%81-170x57-1.png"
                  alt="veysvakfi"
                  className="w-full h-auto my-5"
                />
              </a>
              <a
                target="_blank"
                className="mx-4 flex w-[150px] items-center justify-center p-5 hover:bg-red-300 rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer 2xl:w-[180px]"
                href="https://www.instagram.com/gsb_bilecikgm/">
                <img
                  src="/sponsors/bilgen.png"
                  alt="Bilecik Gençlik Merkezi"
                  className="w-full h-auto my-5"
                />
              </a>
              <a
                target="_blank"
                className="mx-4 flex w-[150px] items-center justify-center p-5 hover:bg-red-300 rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer 2xl:w-[180px]"
                href="https://www.bilecik.edu.tr/">
                <img
                  src="https://www.bilecik.edu.tr/dosya/25_b80c_Logo%206.png"
                  alt="Bilecik Şeyh Edebali Üniversity"
                  className="w-full h-auto my-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supporter;
