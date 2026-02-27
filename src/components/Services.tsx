import {services} from "../constants/home";

const Services = () => {
  return (
    <section id="services" className="py-14 pt-24" dir="rtl">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-2xl mx-auto sm:text-center">
          <div className="relative z-10">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Our services
            </h3>
          </div>
          <div
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg,rgba(192, 132, 252, 0.2) 4.54%,rgba(232, 121, 249, 0.26) 34.2%,rgba(192, 132, 252, 0.1) 77.55%)",
            }}></div>
        </div>
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <a
                key={service.name}
                target="_blank"
                href="https://yodt.me/services/">
                <li className="card bg-white space-y-3 p-4 hover:bg-red-700 border rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer group">
                  <div
                    className="text-red-700 pb-3 group-hover:text-white"
                    dangerouslySetInnerHTML={{__html: service.icon}}></div>
                  <h4 className="text-lg text-black group-hover:text-white font-semibold">
                    {service.name}
                  </h4>
                  <p className="text-red-900 group-hover:text-white">
                    {service.description}
                  </p>
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
