import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { SideMenuContainer } from './SideMenuContainer';
import { SideMenuHeader } from './SideMenuHeader';
import { SideMenuFooter } from './SideMenuFooter';
import { SideMenuItem } from './SideMenuItem';

import { SideMenuHeaderProps, SideMenuItemProps } from '../models';

interface Props {
  className?: string;
  navClassName?: string;
  isOpen: boolean;
  isExpandable?: boolean;
  header?: SideMenuHeaderProps;
  items: SideMenuItemProps[];
  children: React.ReactNode;
}

const SideMenuComp = ({
  className,
  navClassName,
  isOpen,
  isExpandable,
  header,
  items,
  children,
}: Readonly<Props>): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<string>();

  const separatorClassName = useMemo(() => {
    let sepClassName = 'nav-container__separator';
    if (expanded) sepClassName += ` nav-container__separator--expanded`;
    else if (!isOpen) sepClassName += ` nav-container__separator--hidden`;
    return sepClassName;
  }, [expanded, isOpen]);

  const containerClassName = useMemo(() => {
    let clsName = 'nav-container';
    if (isExpandable) {
      clsName += expanded
        ? ' nav-container--expanded'
        : !isOpen
          ? ' nav-container--closed'
          : '';
      return clsName;
    } else if (!isOpen) clsName += ' nav-container--closed';
    clsName += `${navClassName ? ` ${navClassName}` : ''}`;
    return clsName;
  }, [expanded, isOpen, isExpandable]);

  const onExpand = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, [setExpanded]);

  const onNavigate = useCallback(
    (route: string) => {
      setCurrentRoute(route);
    },
    [setCurrentRoute],
  );

  return (
    <SideMenuContainer className={className}>
      <nav key="nav-container" className={containerClassName}>
        <SideMenuHeader
          className={header?.className}
          logo={header?.logo}
          logoClassName={header?.logoClassName}
          title={header?.title}
          titleClassName={header?.titleClassName}
          path={header?.path}
          onClick={header?.onClick}
        />
        <ul className="side-menu">
          {items.map((item, index) => (
            <SideMenuItem
              key={`${index}`}
              index={index}
              className={item.className}
              title={item.title}
              titleClassName={item.titleClassName}
              icon={item.icon}
              iconClassName={item.iconClassName}
              isCollapsible={item.isCollapsible}
              path={item.path}
              subItems={item.subItems}
              currentRoute={currentRoute}
              onClick={item.onClick}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
        {isExpandable && (
          <SideMenuFooter onExpand={onExpand} expanded={expanded} />
        )}
      </nav>
      <div key="nav-container__separator" className={separatorClassName} />
      {children}
    </SideMenuContainer>
  );
};

export const SideMenu = memo(SideMenuComp);
