import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function Component() {
  return (
    <div className="min-w-[300px] relative z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full flex items-center justify-between bg-accent text-primary font-semibold border rounded-md border-primary hover:bg-secondary hover:text-primary-foreground">
            Select Option
            <ChevronDown
              className="-me-1 ms-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
          <DropdownMenuItem>Option 3</DropdownMenuItem>
          <DropdownMenuItem>Option 4</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { Component };
