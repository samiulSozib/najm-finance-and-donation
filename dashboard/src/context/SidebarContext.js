import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Detect if the screen size is mobile (width <= 600px)
  const isMobile = useMediaQuery('(max-width: 600px)');

  // Update isCollapsed based on whether it's mobile or not
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true); // Automatically collapse on mobile
    }else{
      setIsCollapsed(false)
    }
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
