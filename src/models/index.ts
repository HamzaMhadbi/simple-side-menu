export interface SideMenuItemProps {
  className?: string;
  icon?: string | React.ReactNode;
  iconClassName?: string;
  title: string | React.ReactNode;
  titleClassName?: string;
  isCollapsible?: boolean;
  path?: string;
  subItems?: SideMenuItemProps[];
  onClick?(): void | Promise<void>;
}

export interface SideMenuHeaderProps {
  title: string | React.ReactNode;
  logo?: string | React.ReactNode;
  className?: string;
  titleClassName?: string;
  logoClassName?: string;
  path?: string;
  onClick?(): void | Promise<void>;
}

export interface SideMenuOptions {
  defaultIconClassName: string;
}
