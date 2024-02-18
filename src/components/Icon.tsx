import React, { isValidElement, useMemo } from 'react';

interface Props {
  baseClassName: string;
  className?: string;
  icon?: string | React.ReactNode;
}

export const Icon = ({
  baseClassName,
  className,
  icon,
}: Readonly<Props>): JSX.Element | null => {
  if (isValidElement(icon)) return icon;
  if (typeof icon !== 'string') return null;

  const fullClassName = useMemo(() => {
    return `${baseClassName}${className ? ` ${className}` : ''}`;
  }, []);

  return <i className={fullClassName}>{icon}</i>;
};
