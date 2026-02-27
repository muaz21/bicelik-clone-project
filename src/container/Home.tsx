import CallUs from "../components/CallUs";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import {HomeCarousel} from "../components/HomeCarousel";
import Services from "../components/Services";
import Supporter from "../components/Supporter";
import Team from "../components/Team";

const Home = () => {
  return (
    <div>
      <div>
        <section id="home" className="relative h-max">
          <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="space-y-12 w-full mx-auto text-center">
              <HomeCarousel />
              <div className="justify-center items-center gap-x-3 sm:flex">
                <a href="/#services">
                  <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-black hover:bg-red-700 active:bg-red-700 duration-150 rounded-lg sm:mt-0 sm:w-auto">
                    Browse our services
                  </button>{" "}
                </a>
                <a href="/#contact">
                  <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-black hover:bg-red-700 active:bg-red-700 duration-150 rounded-lg sm:mt-0 sm:w-auto">
                    Contact us
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
            style={{
              background:
                "linear-gradient(106.89deg,rgba(255, 0, 0, 0.2) 0%,rgba(255, 50, 50, 0.4) 50%,rgba(255, 100, 100, 0.6) 100%)",
            }}></div>
        </section>
      </div>
      <Services />
      <Categories />
      <Team />
      <Supporter />
      <div className="text-center">There are no pictures</div>
      <CallUs />
      <Footer />
    </div>
  );
};

export default Home;
