"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  blogItems,
  resumeBuilderItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { FaChrome } from "react-icons/fa";

const HeaderNavContent = () => {
  const pathname = usePathname(); // Store pathname in a variable

  return (
    <nav className="nav main-menu">
      <ul className="navigation" id="navbar">
        <li className={`${isActiveParent(homeItems, pathname) ? "current" : ""} dropdown`}>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/about">About us</Link>
        </li>
        <li className={`${isActiveParentChaild(resumeBuilderItems, pathname) ? "current" : ""} dropdown`}>
          <Link href="/resumebuilder">Resume Builder</Link>
        </li>
        <li>
          <Link href="/contact">Contact us</Link>
        </li>
        <li className="mt-0">
          <a
            href="https://chromewebstore.google.com/detail/fmmjbioialkffjgcdkdonhniomdfpapo?utm_source=item-share-cb"
            className="theme-btn btn rounded-pill"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#21286a", color: "white" }}

          >
            <FaChrome style={{ paddingRight: "8px", fontSize: "1.5rem" }} />
            Download Extension
          </a>
        </li>


      </ul>
    </nav>
  );
};

export default HeaderNavContent;
