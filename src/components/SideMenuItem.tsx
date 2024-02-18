import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { SubMenuItems } from './SubMenuItems';
import { CollapsibleItem } from './CollapsibleItem';
import { Title } from './Title';
import { Icon } from './Icon';

import { usePrevious } from '../utils';
import { SideMenuItemProps } from '../models';

interface Props extends SideMenuItemProps {
  index: number;
  currentRoute?: string;
  onNavigate(route: string): void;
}

const SideMenuItemComp = ({
  index,
  className,
  icon,
  iconClassName,
  title,
  titleClassName,
  isCollapsible,
  path,
  subItems,
  onClick,
  currentRoute,
  onNavigate,
}: Readonly<Props>): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(isCollapsible ? false : true);
  const previousPath = usePrevious<string>(currentRoute ?? '/');

  const toggleMenuItem = useCallback(() => {
    if (isCollapsible) setIsOpen((prevValue) => !prevValue);
  }, [isCollapsible]);

  const setCurrentRoute = useCallback(() => {
    if (path) onNavigate(path);
    if (onClick) onClick();
  }, [onNavigate, onClick, path]);

  const fullClassName = useMemo(() => {
    let clsName = `menu-item${path && path === currentRoute ? ' menu-item--active' : ''}`;
    if (className) clsName += ` ${className}`;
    return clsName;
  }, [path, currentRoute]);

  const _renderItem = useCallback(() => {
    return path ? (
      <Link className="menu-item__link" to={path}>
        <Icon
          baseClassName="menu-item__icon"
          className={iconClassName}
          icon={icon}
        />
        <Title
          baseClassName="menu-item__title"
          className={titleClassName}
          title={title}
        />
      </Link>
    ) : (
      <CollapsibleItem
        baseClassName="menu-item__container"
        isCollapsible={isCollapsible}
        className={isCollapsible ? 'menu-item--collapsible' : ''}
        isOpen={isOpen}
        onToggle={toggleMenuItem}>
        <Icon
          baseClassName="menu-item__icon"
          className={iconClassName}
          icon={icon}
        />
        <Title
          baseClassName="menu-item__title"
          className={titleClassName}
          title={title}
        />
      </CollapsibleItem>
    );
  }, [{ icon, title, iconClassName, titleClassName, isCollapsible, isOpen }]);

  useEffect(() => {
    if (path && !currentRoute) {
      const { pathname } = window.location;
      onNavigate(pathname);
    }
  }, [path, currentRoute]);

  useEffect(() => {
    if (
      typeof previousPath !== 'string' &&
      subItems &&
      subItems.length > 0 &&
      currentRoute &&
      currentRoute !== previousPath &&
      subItems?.find((subItem) => subItem.path === currentRoute)
    )
      toggleMenuItem();
  }, [previousPath, subItems, currentRoute, toggleMenuItem]);

  return (
    <li
      className={fullClassName}
      onClickCapture={path ? setCurrentRoute : undefined}>
      {_renderItem()}
      <SubMenuItems
        parentIndex={index}
        items={subItems}
        isOpen={isOpen}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
      />
    </li>
  );
};

SideMenuItemComp.defaultProps = {
  subItems: [],
  isCollapsible: false,
};

export const SideMenuItem = memo(SideMenuItemComp);
