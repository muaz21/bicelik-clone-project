import {logoutAccount} from "@/lib/appwrite/actions";
import {Button} from "./ui";
import {useNavigate} from "react-router-dom";
import {LoaderCircle, LogOut} from "lucide-react";
import {useUser} from "@/context/UserContext";
import {useState} from "react";
import {toast} from "sonner";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser}: any = useUser();
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await logoutAccount();
          toast.success("Logged out successfully", {id: "logout"});
          setIsLoading(false);
          setUser(null);
          navigate("/");
        }}>
        {isLoading ? (
          <>
            <LoaderCircle className="h-4 w-4 mr-1 animate-spin" />
            Logging Out...
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4 mr-1" />
            Log Out
          </>
        )}
      </Button>
    </>
  );
};

export default LogoutButton;
