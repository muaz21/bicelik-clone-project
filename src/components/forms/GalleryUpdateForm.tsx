import * as z from "zod";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
} from "@/components/ui";
import {galleryValidation} from "@/lib/validation";
import FileUploader from "@/components/FileUploader";
import CustomInput from "@/components/CustomInput";
import {useUser} from "@/context/UserContext";
import {toast} from "sonner";
import {LoaderCircle} from "lucide-react";
import {useEffect, useState} from "react";
import {getSingleItemById, updateGalleryPost} from "@/lib/appwrite/actions";
import LogoutButton from "../LogoutButton";

const GalleryUpdateForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    user,
    isUserLoading,
    categories,
    isCategoriesLoading,
    setGalleryData,
  }: any = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [galleryDataFromDb, setGalleryDataFromDb] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState<any>(null);
  const form = useForm<z.infer<typeof galleryValidation>>({
    resolver: zodResolver(galleryValidation),
    defaultValues: {
      title: "",
      file: [],
      fb_url: "",
      insta_url: "",
    },
  });

  useEffect(() => {
    if (params && params?.id) {
      getGalleryDataById(params?.id);
    }
  }, [params]);

  const getGalleryDataById = async (id: string) => {
    setIsDataLoading(true);
    const data = await getSingleItemById(id);
    if (data.success) {
      form.reset({
        categoryId: data?.data?.categoryId || "",
        title: data?.data?.title || "",
        fb_url: data?.data?.fb_url || "",
        insta_url: data?.data?.insta_url || "",
      });
      setGalleryDataFromDb(data.data);
      setIsDataLoading(false);
    }
  };

  // Handler
  const handleSubmit = async (value: z.infer<typeof galleryValidation>) => {
    if (!galleryDataFromDb) return;
    if (value?.file?.length == 0 && !galleryDataFromDb?.imageUrl) {
      toast.error("Please select image to proceed", {id: "update-gallery"});
      return;
    }
    setIsUpdating(true);
    const createdPost = await updateGalleryPost(galleryDataFromDb, value);
    if (createdPost.success) {
      toast.success(createdPost.message, {id: "update-gallery"});
      setGalleryData(null);
      navigate("/gallery");
    } else {
      toast.error(createdPost.message, {id: "update-gallery"});
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    if (!user?.$id && !isUserLoading) {
      navigate("/login");
    }
  }, [user, isUserLoading]);

  return (
    <div className="flex flex-col gap-2 w-full p-5 max-w-screen-xl">
      {isUserLoading || isDataLoading ? (
        <div className="h-72 flex items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <>
          <div className=" font-medium text-xl my-3 text-center">
            Update Gallery Item
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-9 w-full max-w-lg mx-auto">
              <div className="flex gap-3 flex-col">
                <FormField
                  control={form.control}
                  name="file"
                  render={({field}) => (
                    <FormItem className="w-max flex flex-col items-start">
                      <FormLabel className="whitespace-nowrap">Image</FormLabel>
                      <FormControl>
                        <FileUploader
                          height="30"
                          width="30"
                          fieldChange={field.onChange}
                          mediaUrl={galleryDataFromDb?.imageUrl}
                        />
                      </FormControl>
                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  disabled={isCategoriesLoading}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-400">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.length > 0 &&
                            categories.map((category: any) => (
                              <SelectItem
                                key={category?.$id}
                                value={category?.$id}>
                                {category?.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CustomInput
                  placeholder="Enter Title"
                  control={form.control}
                  className="max-sm:!max-h-12 !max-h-10 !mt-[2px] border-gray-400"
                  name="title"
                  label="Title"
                />
                <CustomInput
                  placeholder="Enter URL"
                  control={form.control}
                  className="max-sm:!max-h-12 !max-h-10 !mt-[2px] border-gray-400"
                  name="fb_url"
                  label="Facebook URL"
                />
                <CustomInput
                  placeholder="Enter URL"
                  control={form.control}
                  className="max-sm:!max-h-12 !max-h-10 !mt-[2px] border-gray-400"
                  name="insta_url"
                  label="Instagram URL"
                />
              </div>
              <div className="flex gap-4 items-center justify-end">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                  disabled={isUpdating || !form.formState.isDirty}>
                  {isUpdating ? (
                    <>
                      <LoaderCircle className="animate-spin mr-1" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center justify-center mt-5">
            <LogoutButton />
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryUpdateForm;
