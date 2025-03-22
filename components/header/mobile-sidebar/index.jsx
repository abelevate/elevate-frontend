"use client";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import { isActiveLink } from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />

      <Sidebar>
        <Menu>
          {mobileMenuData.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => router.push(item.routepath)}
              className={isActiveLink(item.routepath, pathname) ? "menu-active-link" : ""}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;
