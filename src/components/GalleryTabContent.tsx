import {Button} from "./ui/button";
import {Card, CardContent} from "./ui/card";
import {Facebook, Instagram, LoaderCircle, Pencil, Trash2} from "lucide-react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUser} from "@/context/UserContext";
import {convertToLocalTime} from "@/lib/utils";
import DeleteItemDialog from "./DeleteItemDialog";
import {deleteGalleryPost} from "@/lib/appwrite/actions";
import {toast} from "sonner";

const GalleryTabContent = ({category}: any) => {
  const {
    galleryData,
    getGalleryData,
    user,
    isGalleryLoading,
    deleteGalleryItemById,
  }: any = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletModalOpen, setIsDeletModalOpen] = useState(false);
  useEffect(() => {
    if (!galleryData || !galleryData[category?.$id]) {
      getGalleryData(category?.$id);
    }
  }, [category, galleryData]);

  if (isGalleryLoading && isGalleryLoading[category?.$id]) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }
  if (!galleryData || !galleryData[category?.$id]) return null;

  const handleDelete = async (docId: string, imageId: string) => {
    setIsDeleting(true);
    const isDeleted = await deleteGalleryPost(docId, imageId);
    if (isDeleted.success) {
      toast.success(isDeleted.message, {
        id: "delete-item",
      });
      deleteGalleryItemById(docId, category?.$id);
      setIsDeletModalOpen(false);
    } else {
      toast.error(isDeleted.message, {
        id: "delete-item",
      });
    }
    setIsDeleting(false);
  };
  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">{category?.name}</div>
      </div>
      <div className="bg-secondary rounded p-2 flex items-center justify-evenly gap-2 flex-wrap w-full">
        {galleryData[category?.$id]?.length > 0 ? (
          galleryData[category?.$id].map((item: any) => (
            <div key={item?.$id} className="w-full">
              <Card className="w-[350px] max-w-full p-4 group relative">
                <div className="absolute top-1 left-1 bg-secondary flex items-center text-sm justify-center rounded-xl px-2 p-0.5">
                  {convertToLocalTime(item?.$createdAt)}
                </div>
                <CardContent className="p-0">
                  <img
                    src={item?.imageUrl}
                    className="w-full  rounded object-cover h-[250px]"
                  />
                  <div className="pt-2 flex items-center justify-between  gap-3">
                    <div className="text-lg font-medium text-wrap">
                      {item?.title}
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      {item?.fb_url && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-base">
                          <Link to={item?.fb_url}>
                            <Facebook />
                          </Link>
                        </Button>
                      )}
                      {item?.insta_url && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-base">
                          <Link to={item?.insta_url}>
                            <Instagram />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
                {user && (
                  <div className="absolute top-0 right-0 opacity-0 flex-col group-hover:opacity-100 flex items-center gap-2">
                    <Link to={`/gallery/edit/${item?.$id}`}>
                      <Button
                        className="h-8 w-8 shadow-xl"
                        size="icon"
                        variant="default">
                        <Pencil className="h-5 w-5" />
                      </Button>
                    </Link>
                    <DeleteItemDialog
                      setIsDeletModalOpen={setIsDeletModalOpen}
                      isDeletModalOpen={isDeletModalOpen}
                      onSubmit={() => {
                        handleDelete(item?.$id, item?.imageId);
                      }}
                      isLoading={isDeleting}
                      loadingText={"Deleting..."}
                      trigger={
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8 shadow-xl">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      }
                    />
                  </div>
                )}
              </Card>
            </div>
          ))
        ) : (
          <div className="h-20 flex items-center justify-center font-medium">
            No data found
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryTabContent;
