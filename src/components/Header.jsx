import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = {
  직원: [
    { label: "직원 가입", path: "/employee/register" },
    { label: "직원정보조회", path: "/employee/search" },
  ],
  문서: [
    { label: "문서 등록", path: "#" },
    { label: "문서 조회", path: "#" },
  ],
  일정: [
    { label: "일정 등록", path: "/schedule/register" },
    { label: "일정 조회", path: "/schedule/view" },
  ],
  업무: [
    { label: "업무 등록", path: "/task/register" },
    { label: "업무 조회", path: "/task/search" },
  ],
  교육: [
    { label: "교육 등록", path: "/education/enrol" },
    { label: "교육 검색", path: "/education/search" },
  ],
  동아리: [
    { label: "동아리 등록", path: "/stdClub/register" },
    { label: "동아리 조회", path: "/stdClub/search" },
  ],
  동호회: [
    { label: "동호회 등록", path: "/circle/register" },
    { label: "동호회 조회", path: "/circle/search" },
  ],
};

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuButtonMinWidth = "100px";

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
        padding: "6px 12px",
        userSelect: "none",
        width: "auto",
        minWidth: "120px",
      }}
    >
      <nav style={{ display: "flex", gap: "16px" }}>
        {Object.keys(menuItems).map((menu) => (
          <div key={menu} style={{ position: "relative" }}>
            <span
              onClick={() => toggleMenu(menu)}
              style={{
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: openMenu === menu ? "700" : "500",
                color: openMenu === menu ? "#111" : "#444",
                userSelect: "none",
                padding: "6px 4px",
                borderBottom: openMenu === menu ? "2px solid #333" : "none",
                transition: "color 0.2s ease, border-bottom 0.2s ease",
                display: "inline-block",
                minWidth: menuButtonMinWidth,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {menu}
            </span>

            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "4px",
                width: "max-content",
                backgroundColor: "#fff",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                borderRadius: "6px",
                overflow: "hidden",
                opacity: openMenu === menu ? 1 : 0,
                transform:
                  openMenu === menu ? "translateY(0)" : "translateY(-8px)",
                pointerEvents: openMenu === menu ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
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
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#222",
                    textDecoration: "none",
                    borderBottom:
                      idx !== arr.length - 1 ? "1px solid #eee" : "none",
                    backgroundColor: "white",
                    userSelect: "none",
                    transition: "background-color 0.15s ease",
                    whiteSpace: "nowrap",
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
