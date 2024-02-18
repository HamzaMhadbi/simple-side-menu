import React, { useMemo } from 'react';

interface Props {
  baseClassName: string;
  className?: string;
  isOpen?: boolean;
  onToggle?(): void;
  isCollapsible?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export const CollapsibleItem = ({
  baseClassName,
  className,
  isOpen,
  onToggle,
  children,
  isCollapsible,
}: Readonly<Props>): JSX.Element | null => {
  const fullClassName = useMemo(() => {
    let clsName = baseClassName;
    if (className) clsName += ` ${className}`;
    return clsName;
  }, []);

  const iconClassName = useMemo(() => {
    let clsName = '';
    if (isOpen) clsName += 'rotate-down';
    return clsName;
  }, [isOpen]);

  return (
    <div className={fullClassName} onClick={onToggle}>
      {children}
      {isCollapsible && (
        <img className={iconClassName} src="/expand_more.svg" />
      )}
    </div>
  );
};
