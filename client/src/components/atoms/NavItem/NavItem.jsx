import Link from "next/link";

export const NavItem = ({ label, href = "/", ...props }) => {
  return (
    <li {...props}>
      <Link href={href}>{props.children}</Link>
    </li>
  );
};
