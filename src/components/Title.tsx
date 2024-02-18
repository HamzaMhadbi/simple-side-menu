import React, { isValidElement, useMemo } from 'react';

interface Props {
  baseClassName: string;
  className?: string;
  title?: string | React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
}

export const Title = ({
  baseClassName,
  className,
  title,
  children,
}: Readonly<Props>): JSX.Element | null => {
  if (isValidElement(title)) return title;
  if (typeof title !== 'string') return null;

  const fullClassName = useMemo(() => {
    return `${baseClassName}${className ? ` ${className}` : ''}`;
  }, []);

  return (
    <span className={fullClassName}>
      {title}
      {children}
    </span>
  );
};
