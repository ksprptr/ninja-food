export interface NavbarLink {
  label: string;
  href: string;
  icon?: string;
  children?: NavbarLink[];
}
