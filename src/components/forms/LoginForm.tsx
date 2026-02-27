import {useEffect, useState} from "react";
import CustomInput from "../CustomInput";
import {Button, Form} from "../ui";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {signInAccount} from "@/lib/appwrite/actions";
import {toast} from "sonner";
import {loginUserValidation} from "@/lib/validation";
import * as z from "zod";
import {useUser} from "@/context/UserContext";
import {LoaderCircle} from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const {user, isUserLoading, setUser}: any = useUser();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const form = useForm<z.infer<typeof loginUserValidation>>({
    resolver: zodResolver(loginUserValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user?.$id) {
      navigate("/");
    }
  }, [user, isUserLoading]);

  // Handler
  const handleSubmit = async (value: z.infer<typeof loginUserValidation>) => {
    setIsSubmitLoading(true);
    const signedInUser = await signInAccount(value);
    if (signedInUser.success) {
      setUser(signedInUser.data);
      navigate("/gallery");
      toast.success(signedInUser.message, {id: "login"});
    } else {
      toast.error(signedInUser.message, {id: "login"});
    }
    setIsSubmitLoading(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full p-5 max-w-screen-xl">
        <div className=" font-medium text-xl my-3 text-center">Admin Login</div>
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-9 w-full max-w-lg mx-auto">
              <div className="flex gap-3 flex-col">
                <CustomInput
                  placeholder="Enter email"
                  control={form.control}
                  className="max-sm:!max-h-12 !max-h-10 !mt-[2px] border-gray-400"
                  name="email"
                  label="Email"
                />
                <CustomInput
                  placeholder="Enter password"
                  control={form.control}
                  className="max-sm:!max-h-12 !max-h-10 !mt-[2px] border-gray-400"
                  name="password"
                  type="password"
                  label="Password"
                />
              </div>

              <div className="flex gap-4 items-center justify-end">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                  disabled={isSubmitLoading || !form.formState.isDirty}>
                  {isSubmitLoading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-1" />
                      Please wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </>
      </div>
    </>
  );
};

export default LoginForm;
