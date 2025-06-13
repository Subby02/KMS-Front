import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = {
  동아리: [
    { label: "동아리 등록", path: "/register" },
    { label: "동아리 조회", path: "/search" },
  ],
  교육: [
    { label: "교육 등록", path: "/education/enrol" },
    { label: "교육 검색", path: "/education/search" },
  ],
  업무: [
    { label: "업무 등록", path: "/task/register" },
    { label: "업무 조회", path: "/task/search" },
  ],
};

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuButtonMinWidth = "140px";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "30px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        padding: "8px 20px",
        userSelect: "none",
        width: "auto",
        minWidth: "160px",
      }}
    >
      <nav style={{ display: "flex", gap: "24px" }}>
        {Object.keys(menuItems).map((menu) => (
          <div key={menu} style={{ position: "relative" }}>
            <span
              onClick={() => toggleMenu(menu)}
              style={{
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: openMenu === menu ? "700" : "500",
                color: openMenu === menu ? "#111" : "#444",
                userSelect: "none",
                padding: "6px 0",
                borderBottom: openMenu === menu ? "2px solid #333" : "none",
                transition: "color 0.2s ease, border-bottom 0.2s ease",
                display: "inline-block",
                minWidth: menuButtonMinWidth,
                textAlign: "center",
              }}
            >
              {menu}
            </span>

            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "6px",
                width: "max-content",
                backgroundColor: "#fff",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                borderRadius: "8px",
                overflow: "hidden",
                opacity: openMenu === menu ? 1 : 0,
                transform:
                  openMenu === menu ? "translateY(0)" : "translateY(-10px)",
                pointerEvents: openMenu === menu ? "auto" : "none",
                transition: "opacity 0.25s ease, transform 0.25s ease",
                textAlign: "center",
                zIndex: 1001,
                minWidth: menuButtonMinWidth,
              }}
            >
              {menuItems[menu].map(({ label, path }, idx, arr) => (
                <Link
                  to={path}
                  key={path}
                  onClick={() => setOpenMenu(null)}
                  style={{
                    display: "block",
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#222",
                    textDecoration: "none",
                    borderBottom:
                      idx !== arr.length - 1 ? "1px solid #eee" : "none",
                    backgroundColor: "white",
                    userSelect: "none",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Header;
