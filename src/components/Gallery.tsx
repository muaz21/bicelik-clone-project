import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import GalleryTabContent from "./GalleryTabContent";
import {useUser} from "@/context/UserContext";

const Gallery = () => {
  const {categories}: any = useUser();
  if (!categories) return null;
  return (
    <>
      <div className="flex flex-col gap-3 justify-start mx-auto px-4 md:px-8 max-w-screen-xl">
        <Tabs defaultValue={categories[0]?.$id} className="w-full mt-4">
          <TabsList className="flex items-center mx-auto max-sm:justify-start mb-4 overflow-hidden overflow-x-auto w-max max-w-full scrollbar-none">
            {categories.map((category: any) => (
              <TabsTrigger
                className={
                  "text-[16px] data-[state=active]:bg-primary data-[state=active]:text-white"
                }
                key={category?.$id}
                value={category?.$id}>
                {category?.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category: any) => (
            <TabsContent value={category?.$id} key={category?.$id}>
              <GalleryTabContent category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default Gallery;
