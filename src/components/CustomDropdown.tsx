import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Link} from "react-router-dom";

export function CustomDropdown({trigger, items}: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? trigger : <Button variant="outline">Open</Button>}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[200px] max-sm:min-w-[300px]">
        {items.map((item: any) => (
          <Link target="_blank" to={item.pdf_link} key={item.$id}>
            <DropdownMenuItem>{item.title}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
