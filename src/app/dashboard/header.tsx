import { useContext } from "react";
import { Loader } from "lucide-react";

// import { getInitialsFromFullName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthContext from "@/components/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signout, signingOut } = useContext(AuthContext);
  return (
    <>
      {/* <span className="relative">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full uppercase text-muted-foreground"
        >
          <Bell className="size-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
        <span className="size-4 bg-destructive text-destructive-foreground rounded-full absolute flex items-center justify-center top-0 left-7 text-xs">
          19
        </span>
      </span> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full uppercase text-muted-foreground"
          >
            {/* <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            {/* {getInitialsFromFullName(user?.firstName + " " + user?.lastName)} */}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="capitalize">
            {user?.firstName} {user?.lastName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
          {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signout} disabled={signingOut}>
            {signingOut ? <Loader className="animate-spin" /> : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Header;
