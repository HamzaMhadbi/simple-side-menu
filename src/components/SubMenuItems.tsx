import React, { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from './Icon';
import { Title } from './Title';
import { SideMenuItem } from './SideMenuItem';

import { SideMenuItemProps } from '../models';

interface Props {
  parentIndex: number;
  items?: SideMenuItemProps[];
  isOpen: boolean;
  currentRoute?: string;
  onNavigate(route: string): void;
}

const SubMenuItemsComp = ({
  parentIndex,
  items,
  isOpen,
  currentRoute,
  onNavigate,
}: Readonly<Props>): JSX.Element | null => {
  if (!items || items.length === 0) return null;

  const containerClassName = useMemo(
    () => `sub-menu${!isOpen ? ' display-none' : ''}`,
    [isOpen],
  );

  const setCurrentRoute = useCallback(
    (item: SideMenuItemProps) => {
      if (item.path) onNavigate(item.path);
      if (item.onClick) item.onClick();
    },
    [onNavigate],
  );

  const getItemClassName = useCallback(
    (item: SideMenuItemProps) =>
      `sub-menu__item${item.path && currentRoute === item.path ? ' sub-menu__item--active' : ''}`,
    [currentRoute],
  );

  const _renderItem = useCallback(
    ({
      item,
      index,
    }: {
      index: number;
      item: SideMenuItemProps;
    }): JSX.Element => {
      const handleClickItem = useCallback(() => {
        setCurrentRoute(item);
      }, []);

      if (item.path)
        return (
          <li
            key={`${parentIndex}-${index}`}
            className={getItemClassName(item)}
            onClickCapture={handleClickItem}>
            <Link className="sub-menu__link" to={item.path}>
              <Icon
                baseClassName="sub-menu__icon"
                className={item.iconClassName}
                icon={item.icon}
              />
              <Title
                baseClassName="sub-menu__title"
                className={item.titleClassName}
                title={item.title}
              />
            </Link>
          </li>
        );
      if (item.subItems && item.subItems?.length > 0)
        return (
          <SideMenuItem
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
        );
      throw new Error(
        `Invalid side menu item at position ${parentIndex + 1}, ${index + 1}\nPlease use one of path or subItems not both !`,
      );
    },
    [parentIndex],
  );

  return (
    <ul className={containerClassName}>
      {items.map((item, index) => _renderItem({ item, index }))}
    </ul>
  );
};

export const SubMenuItems = memo(SubMenuItemsComp);
