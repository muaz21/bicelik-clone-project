import {CustomDropdown} from "./CustomDropdown";
import {ChevronDown, LoaderCircle} from "lucide-react";
import {useUser} from "@/context/UserContext";

const Categories = () => {
  const {categories, isCategoriesLoading}: any = useUser();
  return (
    <section id="categories" className="py-28">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-semibold sm:text-4xl">Categories</h3>
        </div>
        <div className="mt-12">
          {isCategoriesLoading ? (
            <>
              <LoaderCircle className="animate-spin h-5 w-5 m-auto" />
            </>
          ) : (
            <ul className="flex flex-col gap-4 items-center justify-center sm:flex-row">
              {categories?.length > 0 ? (
                categories.map((category: any) => (
                  <CustomDropdown
                    items={category.subCategories}
                    key={category.$id}
                    trigger={
                      <li
                        key={category.$id}
                        className="w-full text-center cursor-pointer bg-red-800 font-bold px-4 py-4 rounded-lg flex items-center justify-between">
                        <div className="text-white font-medium">
                          {category.title}
                        </div>
                        <ChevronDown className="text-white" />
                      </li>
                    }
                  />

                  // </a>
                ))
              ) : (
                <>No Categories Found</>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
