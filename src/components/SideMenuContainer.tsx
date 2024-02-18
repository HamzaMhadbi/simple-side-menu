import React, { memo } from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const SideMenuContainer = memo(({ className, children }: Readonly<Props>) => {
  return <div className={`container${className ? ` ${className}` : ""}`}>{children}</div>;
});