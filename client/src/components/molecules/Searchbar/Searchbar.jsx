import { FaSearch } from "react-icons/fa";
import { forwardRef } from "react";
import { Input } from "@/components/atoms/Input/Input";

export const Searchbar = forwardRef(({ ...props }, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      icon={<FaSearch />}
      placeholder="Search for campaign"
    />
  );
});
