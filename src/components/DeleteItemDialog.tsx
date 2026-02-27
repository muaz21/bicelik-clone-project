import {LoaderCircle} from "lucide-react";
import {Button} from "./ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DeleteItemDialog = ({
  trigger,
  onSubmit,
  isLoading,
  loadingText,
  setIsDeletModalOpen,
  isDeletModalOpen,
}: {
  trigger: any;
  onSubmit: any;
  isLoading: boolean;
  loadingText: string;
  setIsDeletModalOpen: any;
  isDeletModalOpen: any;
}) => {
  return (
    <Dialog open={isDeletModalOpen} onOpenChange={setIsDeletModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure to delete the item. This can't be undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} type="button" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={onSubmit}
            type="submit"
            variant={"destructive"}>
            {isLoading ? (
              <>
                <LoaderCircle className="mr-1 animate-spin" /> {loadingText}
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemDialog;
