import React, { useMemo } from 'react';

interface Props {
  expanded: boolean;
  onExpand(): void;
}

export const SideMenuFooter = ({ expanded, onExpand }: Readonly<Props>) => {
  const className = useMemo(() => {
    return `material-icons nav-container__expand-icon ${
      expanded ? 'rotate-down' : ''
    }`.trim();
  }, [expanded]);
  return (
    <div className="nav-container__footer" onClick={onExpand}>
      <i className={className}>chevron_left</i>
    </div>
  );
};
