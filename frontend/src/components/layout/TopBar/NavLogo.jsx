import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/Nutritiva-logo.png";

export default function NavLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
      <img
        src={logo}
        alt="Nutritva Logo"
        className="h-20 w-20 object-contain"
      />
    </Link>
  );
}
