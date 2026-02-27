import Gallery from "@/components/Gallery";
import {useUser} from "@/context/UserContext";
import {LoaderCircle} from "lucide-react";

const ManageGallery = () => {
  const {isCategoriesLoading} = useUser();

  if (isCategoriesLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }
  return <Gallery />;
};

export default ManageGallery;
