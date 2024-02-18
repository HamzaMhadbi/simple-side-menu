import React, { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

import { SideMenuHeaderProps } from '../models';


 const SideMenuHeaderComp = ({
  path,  
  logo,
  title,
  className,
  logoClassName,
  titleClassName,
  onClick
}: Readonly<SideMenuHeaderProps>): JSX.Element | null=> {  
  // return null if no header items found
  if(!logo && !title)
    return null;

  // Logo component
  const Logo = useMemo(()=> {
    if(typeof logo !== "string")
      return logo;
    return <img className={`nav-container__logo${logoClassName ? ` ${logoClassName}` : ""}`} src={logo} alt="logo"/>;

  },[logo, logoClassName]);

  // Title component
  const Title = useMemo(() => {
    if(typeof title !== "string")
      return title;
    return <h2 className={`nav-container__title${titleClassName ? ` ${titleClassName}` : ""}`}>{title}</h2>
  },[title, titleClassName]);

  const containerClassName = useMemo(() => `nav-container__header${className ? ` ${className}`: ""}${onClick ? ` cursor-pointer` : ``}`,[className, onClick])

  return (path ?
    <Link className={containerClassName} to={path ?? '/'}>
      {Logo}
      {Title}
    </Link>
  : <div className={containerClassName} onClick={onClick}>
    {Logo}
    {Title}
  </div>);
};

export const SideMenuHeader = memo(SideMenuHeaderComp);