import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, usePage, Head, useForm, router, createInertiaApp } from "@inertiajs/react";
import React, { createContext, useState, useContext, useEffect, forwardRef, useRef, useImperativeHandle, useMemo, Fragment as Fragment$1 } from "react";
import { Transition, Dialog, TransitionChild, DialogPanel, Combobox, Menu } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { ChevronUpDownIcon, CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import axios$1 from "axios";
import { debounce } from "lodash";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      viewBox: "0 0 316 316",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { d: "M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z" })
    }
  );
}
const DropDownContext = createContext();
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setOpen(false)
      }
    )
  ] });
};
const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white dark:bg-gray-700",
  children
}) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses,
              children
            }
          )
        }
      )
    }
  ) });
};
const DropdownLink = ({ className = "", children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:outline-none " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || !savedTheme && prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors",
      "aria-label": "Toggle Dark Mode",
      children: isDark ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z", fillRule: "evenodd", clipRule: "evenodd" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" }) })
    }
  );
}
function AdminLayout({ children }) {
  const user = usePage().props.auth.user;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = [
    { name: "Dashboard", href: route("admin.dashboard"), icon: "HomeIcon" },
    { name: "Movies", href: route("admin.movies"), icon: "FilmIcon" },
    { name: "Series", href: route("admin.series"), icon: "TvIcon" },
    { name: "Genres", href: route("admin.genres"), icon: "TagIcon" },
    { name: "Persons", href: route("admin.persons"), icon: "UserGroupIcon" }
  ];
  const Icon = ({ name, className }) => {
    const icons = {
      HomeIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }),
      FilmIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" }),
      TvIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }),
      TagIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 011 12V7a4 4 0 014-4z" }),
      UserGroupIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }),
      DownloadIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }),
      PlayIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }),
      CollectionIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }),
      VideoCameraIcon: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" })
    };
    return /* @__PURE__ */ jsx("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: icons[name] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200", children: [
    /* @__PURE__ */ jsxs("aside", { className: `fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-8 w-auto fill-current text-indigo-600 dark:text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Admin" })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "mt-6 px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]", children: navigation.map((item) => /* @__PURE__ */ jsxs(
        Link,
        {
          href: item.href,
          className: `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${route().current(item.href.split(".").pop() === "dashboard" ? "admin.dashboard" : item.href.split("/").pop()) || window.location.href.includes(item.href) ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { name: item.icon, className: "w-5 h-5 mr-3" }),
            item.name
          ]
        },
        item.name
      )) })
    ] }),
    isSidebarOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm",
        onClick: () => setIsSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "md:ml-64 min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsSidebarOpen(!isSidebarOpen),
            className: "p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open sidebar" }),
              /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 ml-auto", children: [
          /* @__PURE__ */ jsx(DarkModeToggle, {}),
          /* @__PURE__ */ jsxs(Dropdown, { children: [
            /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("button", { className: "flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none transition duration-150 ease-in-out", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mr-2", children: user.name.charAt(0) }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: user.name }),
              /* @__PURE__ */ jsx("svg", { className: "ml-2 -mr-0.5 h-4 w-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }) })
            ] }) }),
            /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
              /* @__PURE__ */ jsx(Dropdown.Link, { href: route("profile.edit"), children: "Profile" }),
              /* @__PURE__ */ jsx(Dropdown.Link, { href: route("logout"), method: "post", as: "button", children: "Log Out" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-x-hidden", children })
    ] })
  ] });
}
function AdminDashboard({ auth, stats }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Admin Dashboard") }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white dark:bg-slate-900 rounded shadow-md", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-6 text-black dark:text-white ", children: t("Admin Dashboard") }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.movies"),
            className: "bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 transition",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t("Movies") }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", children: stats?.movies ?? "-" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm mt-2", children: t("Manage all movies") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.series"),
            className: "bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 transition",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t("Series") }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", children: stats?.series ?? "-" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm mt-2", children: t("Manage all series") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.genres"),
            className: "bg-yellow-500 text-white p-6 rounded shadow hover:bg-yellow-600 transition",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t("Genres") }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", children: stats?.genres ?? "-" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm mt-2", children: t("Manage genres") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.persons"),
            className: "bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 transition",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t("Persons") }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", children: stats?.persons ?? "-" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm mt-2", children: t("Manage persons") })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminDashboard
}, Symbol.toStringTag, { value: "Module" }));
function useFormPersistence(key, data, setData) {
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData((prevData) => ({ ...prevData, ...parsed }));
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, [key]);
  useEffect(() => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]);
  const clearStorage = () => {
    localStorage.removeItem(key);
  };
  return { clearStorage };
}
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-gray-900 dark:text-gray-300 ` + className,
      children: value ? value : children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));
  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "rounded-xl border text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500 transition-all duration-200 bg-white dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 " + className,
      ref: localRef
    }
  );
});
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `btn-primary w-full justify-center ${disabled && "opacity-25 cursor-not-allowed"} ` + className,
      disabled,
      children
    }
  );
}
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function GenreForm({ genre, onClose, onSuccess }) {
  const { t } = useTranslation();
  const { data, setData, post, put, processing, errors } = useForm({
    name: genre?.name || "",
    slug: genre?.slug || ""
  });
  const storageKey = genre?.id ? `genre_form_update_${genre.id}` : "genre_form_create";
  const { clearStorage } = useFormPersistence(storageKey, data, setData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (genre) {
      put(route("admin.genres.update", genre.id), {
        onSuccess: () => {
          clearStorage();
          onSuccess();
          onClose();
        }
      });
    } else {
      post(route("admin.genres.store"), {
        onSuccess: () => {
          clearStorage();
          onSuccess();
          onClose();
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t("Name") }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "name",
          type: "text",
          className: "mt-1 block w-full",
          value: data.name,
          onChange: (e) => setData("name", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "slug", value: t("Slug") }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "slug",
          type: "text",
          className: "mt-1 block w-full",
          value: data.slug,
          onChange: (e) => setData("slug", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.slug, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-4 border-t pt-4", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, disabled: processing, children: t("Cancel") }),
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: genre ? t("Update Genre") : t("Create Genre") })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GenreForm
}, Symbol.toStringTag, { value: "Module" }));
function Modal({
  children,
  show = false,
  maxWidth = "5xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    "6xl": "sm:max-w-6xl",
    "7xl": "sm:max-w-7xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-2 py-4 sm:px-4 sm:py-6 transition-all",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white dark:bg-[#1a1a1a] shadow-xl transition-all sm:mx-auto w-full lg:w-auto ${maxWidthClass} max-h-[90vh] overflow-y-auto`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function Genres({ genres }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const { t } = useTranslation();
  const openCreateModal = () => {
    setEditingGenre(null);
    setIsModalOpen(true);
  };
  const openEditModal = (genre) => {
    setEditingGenre(genre);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGenre(null);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this genre?")) {
      router.delete(route("admin.genres.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Genres" }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: t("Genres") }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: t("Search genres..."),
              className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64"
            }
          ),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: openCreateModal, children: t("Add Genre") })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: t("Name") }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: t("Slug") }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: t("Actions") })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: genres.map((genre) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: genre.name }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: genre.slug }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openEditModal(genre),
                    className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4",
                    children: t("Edit")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(
                      genre.id
                    ),
                    className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300",
                    children: t("Delete")
                  }
                )
              ] })
            ]
          },
          genre.id
        )) })
      ] }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, maxWidth: "md", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 bg-white dark:bg-gray-800", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: editingGenre ? `${t("Edit Genre")}: ${editingGenre.name}` : t("Create New Genre") }),
      /* @__PURE__ */ jsx(
        GenreForm,
        {
          genre: editingGenre,
          onClose: closeModal,
          onSuccess: () => {
          }
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Genres
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function PersonSelector({ value, onChange, persons: initialPersons = [] }) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [persons, setPersons] = useState(initialPersons);
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    if (value) {
      const found = persons.find((p) => p.id === parseInt(value));
      setSelectedPerson(found || null);
    } else {
      setSelectedPerson(null);
    }
  }, [value, persons]);
  const filteredPersons = query === "" ? persons : persons.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });
  const handleCreate = async () => {
    if (!query) return;
    setIsCreating(true);
    try {
      const response = await axios$1.post(route("admin.persons.store"), {
        name: query
      }, {
        headers: {
          "Accept": "application/json"
        }
      });
      const newPerson = response.data;
      setPersons([...persons, newPerson]);
      setSelectedPerson(newPerson);
      onChange(newPerson.id);
      setQuery("");
    } catch (error) {
      console.error("Failed to create person", error);
    } finally {
      setIsCreating(false);
    }
  };
  return /* @__PURE__ */ jsx(Combobox, { as: "div", value: selectedPerson, onChange: (person) => {
    if (person) {
      setSelectedPerson(person);
      onChange(person.id);
    }
  }, children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
    /* @__PURE__ */ jsx(
      Combobox.Input,
      {
        className: "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300",
        onChange: (event) => setQuery(event.target.value),
        displayValue: (person) => person?.name,
        placeholder: "Select or create a person..."
      }
    ),
    /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none", children: /* @__PURE__ */ jsx(ChevronUpDownIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }) }),
    filteredPersons.length > 0 && /* @__PURE__ */ jsx(Combobox.Options, { className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800", children: filteredPersons.map((person) => /* @__PURE__ */ jsx(
      Combobox.Option,
      {
        value: person,
        className: ({ active }) => `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-300"}`,
        children: ({ active, selected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            person.photo_url && /* @__PURE__ */ jsx("img", { src: person.photo_url, alt: "", className: "h-6 w-6 flex-shrink-0 rounded-full mr-2" }),
            /* @__PURE__ */ jsx("span", { className: `block truncate ${selected ? "font-semibold" : "font-normal"}`, children: person.name })
          ] }),
          selected && /* @__PURE__ */ jsx(
            "span",
            {
              className: `absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"}`,
              children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-5 w-5", "aria-hidden": "true" })
            }
          )
        ] })
      },
      person.id
    )) }),
    query !== "" && filteredPersons.length === 0 && /* @__PURE__ */ jsx("div", { className: "absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "relative cursor-pointer select-none py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-indigo-600 hover:text-white",
        onClick: handleCreate,
        children: isCreating ? "Creating..." : `Create "${query}"`
      }
    ) })
  ] }) });
}
function MovieForm({
  movie,
  genres = [],
  persons = [],
  onClose,
  onSuccess
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, setData, post, put, processing, errors } = useForm({
    title: movie?.title || "",
    slug: movie?.slug || "",
    original_title: movie?.original_title || "",
    description: movie?.description || "",
    release_date: movie?.release_date || "",
    runtime: movie?.runtime || "",
    language: movie?.language || "en",
    country: movie?.country || "",
    status: movie?.status || "released",
    visibility_status: movie?.visibility_status || "public",
    is_vip_only: movie?.is_vip_only || false,
    poster_url: movie?.poster_url || "",
    banner_url: movie?.banner_url || "",
    trailer_url: movie?.trailer_url || "",
    budget: movie?.budget || "",
    revenue: movie?.revenue || "",
    imdb_id: movie?.imdb_id || "",
    age_rating: movie?.age_rating || "",
    genres: movie?.genres?.map((g) => g.id) || [],
    persons: movie?.persons?.map((p) => ({
      person_id: p.person_id,
      role_type: p.role_type,
      character_name: p.character_name
    })) || [],
    watch_links: movie?.watch_links || [],
    download_links: movie?.download_links || []
  });
  const storageKey = movie?.id ? `movie_form_update_${movie.id}` : "movie_form_create";
  const { clearStorage } = useFormPersistence(storageKey, data, setData);
  const [showTmdbModal, setShowTmdbModal] = useState(false);
  const [tmdbQuery, setTmdbQuery] = useState("");
  const [tmdbResults, setTmdbResults] = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const searchTmdb = async (e) => {
    e.preventDefault();
    if (!tmdbQuery) return;
    setTmdbLoading(true);
    try {
      const response = await axios$1.post(route("admin.tmdb.search"), {
        query: tmdbQuery,
        type: "movie"
      });
      setTmdbResults(response.data.results || []);
    } catch (error) {
      console.error("TMDB Search Error:", error);
    } finally {
      setTmdbLoading(false);
    }
  };
  const fetchTmdbDetails = async (tmdbId) => {
    setTmdbLoading(true);
    try {
      const response = await axios$1.post(route("admin.tmdb.details"), {
        tmdb_id: tmdbId,
        type: "movie"
      });
      const details = response.data;
      setData((prev) => ({
        ...prev,
        title: details.title,
        original_title: details.original_title,
        description: details.description,
        release_date: details.release_date,
        runtime: details.runtime,
        language: details.language,
        status: details.status === "released" ? "released" : "upcoming",
        imdb_id: details.imdb_id,
        budget: details.budget,
        revenue: details.revenue,
        poster_url: details.poster_url,
        banner_url: details.banner_url,
        trailer_url: details.trailer_url,
        age_rating: details.age_rating
        // Note: Genres and Persons mapping would require more complex logic
        // to match existing DB records or create new ones.
        // For now, we'll just fill the text fields.
      }));
      setShowTmdbModal(false);
    } catch (error) {
      console.error("TMDB Details Error:", error);
    } finally {
      setTmdbLoading(false);
    }
  };
  const [slugError, setSlugError] = useState("");
  React.useEffect(() => {
    if (data.title && !movie?.id) {
      const slug = data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      setData("slug", slug);
    }
  }, [data.title]);
  React.useEffect(() => {
    const checkSlug = async () => {
      if (!data.slug) return;
      try {
        const response = await axios$1.get(
          route("admin.movies.check-slug"),
          {
            params: {
              slug: data.slug,
              id: movie?.id
            }
          }
        );
        if (response.data.exists) {
          setSlugError("This slug is already taken.");
        } else {
          setSlugError("");
        }
      } catch (error) {
        console.error("Error checking slug:", error);
      }
    };
    const timeoutId = setTimeout(() => {
      checkSlug();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [data.slug, movie?.id]);
  const handleGenreChange = (genreId) => {
    const currentGenres = data.genres;
    if (currentGenres.includes(genreId)) {
      setData(
        "genres",
        currentGenres.filter((id) => id !== genreId)
      );
    } else {
      setData("genres", [...currentGenres, genreId]);
    }
  };
  const addPerson = () => {
    setData("persons", [
      ...data.persons,
      { person_id: "", role_type: "actor", character_name: "" }
    ]);
  };
  const removePerson = (index) => {
    const newPersons = [...data.persons];
    newPersons.splice(index, 1);
    setData("persons", newPersons);
  };
  const updatePerson = (index, field, value) => {
    const newPersons = [...data.persons];
    newPersons[index][field] = value;
    setData("persons", newPersons);
  };
  const addWatchLink = () => {
    setData("watch_links", [
      ...data.watch_links,
      {
        server_name: "",
        url: "",
        embed_code: "",
        quality: "HD",
        type: "url",
        is_vip_only: false
      }
    ]);
  };
  const removeWatchLink = (index) => {
    const newLinks = [...data.watch_links];
    newLinks.splice(index, 1);
    setData("watch_links", newLinks);
  };
  const updateWatchLink = (index, field, value) => {
    const newLinks = [...data.watch_links];
    newLinks[index][field] = value;
    setData("watch_links", newLinks);
  };
  const addDownloadLink = () => {
    setData("download_links", [
      ...data.download_links,
      {
        server_name: "",
        url: "",
        quality: "HD",
        file_format: "MKV",
        file_size: "",
        is_vip_only: false
      }
    ]);
  };
  const removeDownloadLink = (index) => {
    const newLinks = [...data.download_links];
    newLinks.splice(index, 1);
    setData("download_links", newLinks);
  };
  const updateDownloadLink = (index, field, value) => {
    const newLinks = [...data.download_links];
    newLinks[index][field] = value;
    setData("download_links", newLinks);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie && movie.id) {
      put(route("admin.movies.update", movie.id), {
        onSuccess: () => {
          clearStorage();
          if (onSuccess) onSuccess();
          if (onClose) onClose();
        }
      });
    } else {
      post(route("admin.movies.store"), {
        onSuccess: () => {
          clearStorage();
          if (onSuccess) onSuccess();
          if (onClose) onClose();
        }
      });
    }
  };
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const renderStep1 = () => /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-5 h-5 text-indigo-500",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }
          )
        }
      ),
      "Basic Information"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Movie Title" }),
          /* @__PURE__ */ jsx(
            SecondaryButton,
            {
              size: "sm",
              onClick: () => setShowTmdbModal(true),
              type: "button",
              children: "Fetch from TMDB"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "title",
            type: "text",
            className: "mt-1 block w-full",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            required: true,
            placeholder: "e.g. Inception"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "original_title",
            value: "Original Title"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "original_title",
            type: "text",
            className: "mt-1 block w-full",
            value: data.original_title,
            onChange: (e) => setData("original_title", e.target.value),
            placeholder: "Original language title"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.original_title,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "slug", value: "Slug" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "slug",
            type: "text",
            className: "mt-1 block w-full",
            value: data.slug,
            onChange: (e) => setData("slug", e.target.value),
            placeholder: "e.g. inception"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.slug || slugError,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "imdb_id", value: "IMDb ID" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "imdb_id",
            type: "text",
            className: "mt-1 block w-full",
            value: data.imdb_id,
            onChange: (e) => setData("imdb_id", e.target.value),
            placeholder: "tt1375666"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.imdb_id, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Synopsis" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "description",
            className: "mt-1 block w-full text-black border-gray-300 dark:border-gray-300 dark:bg-gray-300 dark:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
            rows: "4",
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            placeholder: "Enter a detailed description of the movie..."
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.description,
            className: "mt-2"
          }
        )
      ] })
    ] })
  ] }) });
  const renderStep2 = () => /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Details & Settings" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "release_date",
            value: "Release Date"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "release_date",
            type: "date",
            className: "mt-1 block w-full",
            value: data.release_date.split("T")[0],
            onChange: (e) => setData("release_date", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.release_date,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "runtime",
            value: "Runtime (minutes)"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "runtime",
            type: "number",
            className: "mt-1 block w-full",
            value: data.runtime,
            onChange: (e) => setData("runtime", e.target.value),
            placeholder: "148"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.runtime, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "status",
            className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
            value: data.status,
            onChange: (e) => setData("status", e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "released", children: "Released" }),
              /* @__PURE__ */ jsx("option", { value: "upcoming", children: "Upcoming" }),
              /* @__PURE__ */ jsx("option", { value: "rumored", children: "Rumored" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "visibility_status",
            value: "Visibility"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "visibility_status",
            className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
            value: data.visibility_status,
            onChange: (e) => setData("visibility_status", e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "public", children: "Public" }),
              /* @__PURE__ */ jsx("option", { value: "hidden", children: "Hidden" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.visibility_status,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "age_rating", value: "Age Rating" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "age_rating",
            className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
            value: data.age_rating,
            onChange: (e) => setData("age_rating", e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "G", children: "Select Rating" }),
              /* @__PURE__ */ jsx("option", { value: "G", children: "G" }),
              /* @__PURE__ */ jsx("option", { value: "PG", children: "PG" }),
              /* @__PURE__ */ jsx("option", { value: "PG-13", children: "PG-13" }),
              /* @__PURE__ */ jsx("option", { value: "R", children: "R - Restricted" }),
              /* @__PURE__ */ jsx("option", { value: "18+", children: "18+" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.age_rating,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "language", value: "Language" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "language",
            type: "text",
            className: "mt-1 block w-full",
            value: data.language,
            onChange: (e) => setData("language", e.target.value),
            placeholder: "en"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.language,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "country", value: "Country" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "country",
            type: "text",
            className: "mt-1 block w-full",
            value: data.country,
            onChange: (e) => setData("country", e.target.value),
            placeholder: "USA"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.country, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "budget", value: "Budget" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "budget",
            type: "number",
            className: "mt-1 block w-full",
            value: data.budget,
            onChange: (e) => setData("budget", e.target.value),
            placeholder: "160000000"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.budget, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "revenue", value: "Revenue" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "revenue",
            type: "number",
            className: "mt-1 block w-full",
            value: data.revenue,
            onChange: (e) => setData("revenue", e.target.value),
            placeholder: "836800000"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.revenue, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "is_vip_only",
            checked: data.is_vip_only,
            onChange: (e) => setData("is_vip_only", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-gray-900 dark:text-gray-100", children: "VIP Exclusive" }),
          /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 dark:text-gray-400", children: "Only accessible to VIP members" })
        ] })
      ] }) })
    ] })
  ] }) });
  const renderStep3 = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-5 h-5 text-indigo-500",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            )
          }
        ),
        "Media Assets"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "poster_url", value: "Poster URL" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "poster_url",
                type: "url",
                className: "mt-1 block w-full",
                value: data.poster_url,
                onChange: (e) => setData("poster_url", e.target.value),
                placeholder: "https://..."
              }
            ),
            data.poster_url && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-8 bg-gray-100 rounded overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.poster_url,
                alt: "Preview",
                className: "w-full h-full object-cover"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.poster_url,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "banner_url",
              value: "Banner/Backdrop URL"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "banner_url",
                type: "url",
                className: "mt-1 block w-full",
                value: data.banner_url,
                onChange: (e) => setData("banner_url", e.target.value),
                placeholder: "https://..."
              }
            ),
            data.banner_url && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-16 bg-gray-100 rounded overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.banner_url,
                alt: "Preview",
                className: "w-full h-full object-cover"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.banner_url,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "trailer_url",
              value: "Trailer URL (YouTube/Embed)"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "trailer_url",
              type: "url",
              className: "mt-1 block w-full",
              value: data.trailer_url,
              onChange: (e) => setData("trailer_url", e.target.value),
              placeholder: "https://youtube.com/..."
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.trailer_url,
              className: "mt-2"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Genres" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: genres.map((genre) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: data.genres.includes(genre.id),
                onChange: () => handleGenreChange(genre.id)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300", children: genre.name })
          ]
        },
        genre.id
      )) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.genres, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Cast & Crew" }),
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: addPerson,
            type: "button",
            size: "sm",
            children: "+ Add Person"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.persons.map((person, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col md:flex-row gap-4 items-start border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Person" }),
              /* @__PURE__ */ jsx(
                PersonSelector,
                {
                  value: person.person_id,
                  onChange: (id) => updatePerson(index, "person_id", id),
                  persons
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/4", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Role" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  value: person.role_type,
                  onChange: (e) => updatePerson(
                    index,
                    "role_type",
                    e.target.value
                  ),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "actor", children: "Actor" }),
                    /* @__PURE__ */ jsx("option", { value: "director", children: "Director" }),
                    /* @__PURE__ */ jsx("option", { value: "writer", children: "Writer" }),
                    /* @__PURE__ */ jsx("option", { value: "producer", children: "Producer" })
                  ]
                }
              )
            ] }),
            person.role_type === "actor" && /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Character Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "mt-1 block w-full",
                  value: person.character_name,
                  onChange: (e) => updatePerson(
                    index,
                    "character_name",
                    e.target.value
                  ),
                  placeholder: "e.g. James Bond"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removePerson(index),
                className: "text-red-500 hover:text-red-700",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      }
                    )
                  }
                )
              }
            ) })
          ]
        },
        index
      )) }),
      data.persons.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center py-4", children: "No cast or crew added yet." })
    ] })
  ] });
  const renderStep4 = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Watch Links" }),
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: addWatchLink,
            type: "button",
            size: "sm",
            children: "+ Add Link"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.watch_links.map((link, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Server Name" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "mt-1 block w-full",
                    value: link.server_name,
                    onChange: (e) => updateWatchLink(
                      index,
                      "server_name",
                      e.target.value
                    ),
                    placeholder: "e.g. VidCloud"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Quality" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    className: "mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                    value: link.quality,
                    onChange: (e) => updateWatchLink(
                      index,
                      "quality",
                      e.target.value
                    ),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "4K", children: "4K" }),
                      /* @__PURE__ */ jsx("option", { value: "FHD", children: "1080p" }),
                      /* @__PURE__ */ jsx("option", { value: "HD", children: "720p" }),
                      /* @__PURE__ */ jsx("option", { value: "SD", children: "480p" }),
                      /* @__PURE__ */ jsx("option", { value: "CAM", children: "CAM" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Type" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-1", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      className: "text-indigo-600 focus:ring-indigo-500",
                      checked: link.type === "url",
                      onChange: () => updateWatchLink(
                        index,
                        "type",
                        "url"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: "Direct URL" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      className: "text-indigo-600 focus:ring-indigo-500",
                      checked: link.type === "embed",
                      onChange: () => updateWatchLink(
                        index,
                        "type",
                        "embed"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: "Embed Code" })
                ] })
              ] })
            ] }),
            link.type === "url" ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "URL" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "mt-1 block w-full",
                  value: link.url,
                  onChange: (e) => updateWatchLink(
                    index,
                    "url",
                    e.target.value
                  ),
                  placeholder: "https://..."
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Embed Code" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  rows: "3",
                  value: link.embed_code,
                  onChange: (e) => updateWatchLink(
                    index,
                    "embed_code",
                    e.target.value
                  ),
                  placeholder: "<iframe>...</iframe>"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    checked: link.is_vip_only,
                    onChange: (e) => updateWatchLink(
                      index,
                      "is_vip_only",
                      e.target.checked
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: "VIP Only" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeWatchLink(index),
                  className: "text-red-500 hover:text-red-700 text-sm",
                  children: "Remove"
                }
              )
            ] })
          ]
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Download Links" }),
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: addDownloadLink,
            type: "button",
            size: "sm",
            children: "+ Add Link"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.download_links.map((link, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Server Name" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "mt-1 block w-full",
                    value: link.server_name,
                    onChange: (e) => updateDownloadLink(
                      index,
                      "server_name",
                      e.target.value
                    ),
                    placeholder: "e.g. Mega"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Quality" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    className: "mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                    value: link.quality,
                    onChange: (e) => updateDownloadLink(
                      index,
                      "quality",
                      e.target.value
                    ),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "4K", children: "4K" }),
                      /* @__PURE__ */ jsx("option", { value: "FHD", children: "1080p" }),
                      /* @__PURE__ */ jsx("option", { value: "HD", children: "720p" }),
                      /* @__PURE__ */ jsx("option", { value: "SD", children: "480p" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "URL" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "mt-1 block w-full",
                  value: link.url,
                  onChange: (e) => updateDownloadLink(
                    index,
                    "url",
                    e.target.value
                  ),
                  placeholder: "https://..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "File Size" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "mt-1 block w-full",
                    value: link.file_size,
                    onChange: (e) => updateDownloadLink(
                      index,
                      "file_size",
                      e.target.value
                    ),
                    placeholder: "e.g. 1.2 GB"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Format" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "mt-1 block w-full",
                    value: link.file_format,
                    onChange: (e) => updateDownloadLink(
                      index,
                      "file_format",
                      e.target.value
                    ),
                    placeholder: "e.g. MKV"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    checked: link.is_vip_only,
                    onChange: (e) => updateDownloadLink(
                      index,
                      "is_vip_only",
                      e.target.checked
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: "VIP Only" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeDownloadLink(index),
                  className: "text-red-500 hover:text-red-700 text-sm",
                  children: "Remove"
                }
              )
            ] })
          ]
        },
        index
      )) })
    ] })
  ] });
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mb-8", children: [1, 2, 3, 4].map((step) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: ` w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= step ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`,
          children: step
        }
      ),
      step < 4 && /* @__PURE__ */ jsx(
        "div",
        {
          className: `relative w-16 sm:w-24 h-1 ${currentStep > step ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`
        }
      )
    ] }, step)) }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-[400px]", children: [
      currentStep === 1 && renderStep1(),
      currentStep === 2 && renderStep2(),
      currentStep === 3 && renderStep3(),
      currentStep === 4 && renderStep4()
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(
        SecondaryButton,
        {
          onClick: currentStep === 1 ? onClose : prevStep,
          type: "button",
          disabled: processing,
          children: currentStep === 1 ? "Cancel" : "Previous"
        }
      ),
      currentStep < 4 ? /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          type: "button",
          onClick: nextStep,
          children: "Next"
        },
        "next-btn"
      ) : /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          type: "submit",
          disabled: processing,
          className: " justify-center",
          children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "animate-spin h-4 w-4 text-white",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }
                  )
                ]
              }
            ),
            "Saving..."
          ] }) : movie ? "Update Movie" : "Create Movie"
        },
        "submit-btn"
      )
    ] }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        show: showTmdbModal,
        onClose: () => setShowTmdbModal(false),
        maxWidth: "2xl",
        children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "Search TMDB" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: searchTmdb, className: "flex gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                className: "w-full",
                placeholder: "Search for a movie...",
                value: tmdbQuery,
                onChange: (e) => setTmdbQuery(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: tmdbLoading, children: tmdbLoading ? "Searching..." : "Search" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: [
            tmdbResults.map((result) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer border border-gray-200 dark:border-gray-600",
                onClick: () => fetchTmdbDetails(result.id),
                children: [
                  result.poster_path ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `https://image.tmdb.org/t/p/w92${result.poster_path}`,
                      alt: result.title,
                      className: "w-12 h-18 object-cover rounded"
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-18 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "No Img" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: result.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: result.release_date })
                  ] })
                ]
              },
              result.id
            )),
            tmdbResults.length === 0 && !tmdbLoading && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "No results found." })
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MovieForm
}, Symbol.toStringTag, { value: "Module" }));
function AdminMovies({ movies, genres, persons, auth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isFirst = useRef(true);
  console.log(movies);
  const openCreateModal = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };
  const openEditModal = (movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMovie(null);
  };
  const debounceSearch = debounce((value) => {
    router.get(
      route("admin.movies"),
      { search: searchQuery },
      { preserveState: true, replace: true }
    );
  });
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    debounceSearch(searchQuery);
  }, [searchQuery]);
  const handleDelete = (movie) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      router.delete(route("admin.movies.destroy", movie.id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Movies" }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-6 gap-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Movies" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 w-full md:w-auto", children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              placeholder: "Search movies...",
              className: "w-full",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxs(PrimaryButton, { onClick: openCreateModal, children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 mr-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 4v16m8-8H4"
                  }
                )
              }
            ),
            "Add Movie"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Movie" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Release Info" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Stats" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: movies.data.map((movie) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-16 w-12 bg-gray-200 rounded overflow-hidden", children: movie.poster_url ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "h-16 w-12 object-cover",
                    src: movie.poster_url,
                    alt: ""
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center text-gray-400 text-xs", children: "N/A" }) }),
                /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: movie.title }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: movie.original_title })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900 dark:text-gray-300", children: movie.release_date ? new Date(
                  movie.release_date
                ).getFullYear() : "N/A" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: movie.runtime ? `${Math.floor(
                  movie.runtime / 60
                )}h ${movie.runtime % 60}m` : "" })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full w-fit ${movie.status === "released" ? "bg-green-100 text-green-800" : movie.status === "upcoming" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`,
                    children: movie.status
                  }
                ),
                movie.is_vip_only && /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 w-fit", children: "VIP Only" })
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 text-yellow-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                    }
                  ),
                  movie.rating_average || "0.0"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs mt-1", children: [
                  movie.view_count?.toLocaleString(),
                  " ",
                  "views"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openEditModal(movie),
                    className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4",
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(movie),
                    className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300",
                    children: "Delete"
                  }
                )
              ] })
            ]
          },
          movie.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex gap-1 flex-wrap", children: movies.links.map((link, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            if (link.url) {
              router.visit(link.url, {
                preserveState: true,
                preserveScroll: true
              });
            }
          },
          disabled: !link.url,
          className: `px-4 py-2 text-sm rounded-md ${link.active ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"} ${!link.url && "opacity-50 cursor-not-allowed"}`,
          dangerouslySetInnerHTML: {
            __html: link.label
          }
        },
        index
      )) }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, maxWidth: "5xl", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 dark:bg-gray-800", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: editingMovie ? `Edit Movie: ${editingMovie.title}` : "Create New Movie" }),
      /* @__PURE__ */ jsx(
        MovieForm,
        {
          movie: editingMovie,
          genres: genres || [],
          persons: persons || [],
          onClose: closeModal,
          onSuccess: () => {
          }
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminMovies
}, Symbol.toStringTag, { value: "Module" }));
function PersonForm({ person, onClose, onSuccess }) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: person?.name || "",
    biography: person?.biography || "",
    birth_date: person?.birth_date || "",
    death_date: person?.death_date || "",
    place_of_birth: person?.place_of_birth || "",
    avatar_url: person?.avatar_url || ""
  });
  const storageKey = person?.id ? `person_form_update_${person.id}` : "person_form_create";
  const { clearStorage } = useFormPersistence(storageKey, data, setData);
  const [showTmdbModal, setShowTmdbModal] = useState(false);
  const [tmdbQuery, setTmdbQuery] = useState("");
  const [tmdbResults, setTmdbResults] = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const searchTmdb = async (e) => {
    e.preventDefault();
    if (!tmdbQuery) return;
    setTmdbLoading(true);
    try {
      const response = await axios$1.post(route("admin.tmdb.search"), {
        query: tmdbQuery,
        type: "person"
      });
      setTmdbResults(response.data.results || []);
    } catch (error) {
      console.error("TMDB Search Error:", error);
    } finally {
      setTmdbLoading(false);
    }
  };
  const fetchTmdbDetails = async (tmdbId) => {
    setTmdbLoading(true);
    try {
      const response = await axios$1.post(route("admin.tmdb.details"), {
        tmdb_id: tmdbId,
        type: "person"
      });
      const details = response.data;
      setData((prev) => ({
        ...prev,
        name: details.name,
        biography: details.biography,
        birth_date: details.birth_date || "",
        death_date: details.death_date || "",
        place_of_birth: details.place_of_birth || "",
        avatar_url: details.avatar_url || ""
      }));
      setShowTmdbModal(false);
    } catch (error) {
      console.error("TMDB Details Error:", error);
    } finally {
      setTmdbLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person) {
      put(route("admin.persons.update", person.id), {
        onSuccess: () => {
          clearStorage();
          onSuccess();
          onClose();
        }
      });
    } else {
      post(route("admin.persons.store"), {
        onSuccess: () => {
          clearStorage();
          onSuccess();
          onClose();
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
              /* @__PURE__ */ jsx(SecondaryButton, { size: "sm", onClick: () => setShowTmdbModal(true), type: "button", children: "Fetch from TMDB" })
            ] }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                type: "text",
                className: "mt-1 block w-full",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "biography", value: "Biography" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "biography",
                className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                rows: "4",
                value: data.biography,
                onChange: (e) => setData("biography", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.biography, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "avatar_url", value: "Avatar URL" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "avatar_url",
                type: "url",
                className: "mt-1 block w-full",
                value: data.avatar_url,
                onChange: (e) => setData("avatar_url", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.avatar_url, className: "mt-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "place_of_birth", value: "Place of Birth" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "place_of_birth",
                type: "text",
                className: "mt-1 block w-full",
                value: data.place_of_birth,
                onChange: (e) => setData("place_of_birth", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.place_of_birth, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "birth_date", value: "Birth Date" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "birth_date",
                type: "date",
                className: "mt-1 block w-full",
                value: data.birth_date,
                onChange: (e) => setData("birth_date", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.birth_date, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "death_date", value: "Death Date" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "death_date",
                type: "date",
                className: "mt-1 block w-full",
                value: data.death_date,
                onChange: (e) => setData("death_date", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.death_date, className: "mt-2" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-4 border-t pt-4", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, disabled: processing, type: "button", children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, type: "submit", children: person ? "Update Person" : "Create Person" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: showTmdbModal, onClose: () => setShowTmdbModal(false), maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "Search TMDB for People" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: searchTmdb, className: "flex gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            className: "w-full",
            placeholder: "Search for an actor, director, or crew member...",
            value: tmdbQuery,
            onChange: (e) => setTmdbQuery(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: tmdbLoading, children: tmdbLoading ? "Searching..." : "Search" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: [
        tmdbResults.map((result) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer border border-gray-200 dark:border-gray-600 transition-colors text-left",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              fetchTmdbDetails(result.id);
            },
            children: [
              result.profile_path ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: `https://image.tmdb.org/t/p/w92${result.profile_path}`,
                  alt: result.name,
                  className: "w-16 h-16 object-cover rounded-full"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: result.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: result.known_for_department || "Actor" }),
                result.known_for && result.known_for.length > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 dark:text-gray-500 mt-1", children: [
                  "Known for: ",
                  result.known_for.slice(0, 2).map((item) => item.title || item.name).join(", ")
                ] })
              ] })
            ]
          },
          result.id
        )),
        tmdbResults.length === 0 && !tmdbLoading && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-8", children: "No results found. Try searching for an actor or director." })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PersonForm
}, Symbol.toStringTag, { value: "Module" }));
function Persons({ persons }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const openCreateModal = () => {
    setEditingPerson(null);
    setIsModalOpen(true);
  };
  const openEditModal = (person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this person?")) {
      router.delete(route("admin.persons.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Persons" }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Persons" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search persons...", className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64" }),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: openCreateModal, children: "Add Person" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Bio" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: persons.map((person) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden", children: person.avatar_url ? /* @__PURE__ */ jsx("img", { className: "h-10 w-10 object-cover", src: person.avatar_url, alt: "" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center text-gray-400 text-xs", children: "N/A" }) }),
            /* @__PURE__ */ jsx("div", { className: "ml-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: person.name }) })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate", children: person.biography || "No biography available" }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => openEditModal(person), className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(person.id), className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300", children: "Delete" })
          ] })
        ] }, person.id)) })
      ] }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: editingPerson ? `Edit Person: ${editingPerson.name}` : "Create New Person" }),
      /* @__PURE__ */ jsx(
        PersonForm,
        {
          person: editingPerson,
          onClose: closeModal,
          onSuccess: () => {
          }
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Persons
}, Symbol.toStringTag, { value: "Module" }));
function SeasonForm({ season, seriesList = [], onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("details");
  const { data, setData, post, put, processing, errors } = useForm({
    series_id: season?.series_id || "",
    season_number: season?.season_number || "",
    title: season?.title || "",
    description: season?.description || "",
    air_date: season?.air_date || "",
    // Changed from release_date to match DB
    poster_url: season?.poster_url || "",
    episodes: season?.episodes?.map((ep) => ({
      id: ep.id,
      episode_number: ep.episode_number,
      title: ep.title,
      description: ep.description || "",
      air_date: ep.air_date || "",
      runtime: ep.runtime || "",
      poster_url: ep.poster_url || "",
      is_new: false
    })) || []
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      },
      preserveScroll: true
    };
    if (season) {
      put(route("admin.seasons.update", season.id), options);
    } else {
      post(route("admin.seasons.store"), options);
    }
  };
  const addEpisode = () => {
    const nextEpisodeNumber = data.episodes.length > 0 ? Math.max(...data.episodes.map((e) => parseInt(e.episode_number) || 0)) + 1 : 1;
    setData("episodes", [
      ...data.episodes,
      {
        id: `new-${Date.now()}`,
        // Temporary ID for key
        episode_number: nextEpisodeNumber,
        title: "",
        description: "",
        air_date: "",
        runtime: "",
        poster_url: "",
        is_new: true
      }
    ]);
    setActiveTab("episodes");
  };
  const removeEpisode = (index) => {
    const newEpisodes = [...data.episodes];
    newEpisodes.splice(index, 1);
    setData("episodes", newEpisodes);
  };
  const updateEpisode = (index, field, value) => {
    const newEpisodes = [...data.episodes];
    newEpisodes[index][field] = value;
    setData("episodes", newEpisodes);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: season ? "Edit Season" : "New Season" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: season ? `Managing Season ${season.season_number}` : "Create a new season and add episodes" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("details"),
            className: `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "details" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,
            children: "Season Details"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("episodes"),
            className: `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "episodes" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,
            children: [
              "Episodes (",
              data.episodes.length,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex-1 overflow-y-auto p-6 custom-scrollbar", children: [
      activeTab === "details" && /* @__PURE__ */ jsx("div", { className: "space-y-6 animate-fadeIn", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "series_id", value: "Series" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "series_id",
              className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm transition-all duration-200",
              value: data.series_id,
              onChange: (e) => setData("series_id", e.target.value),
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select Series" }),
                seriesList.map((series) => /* @__PURE__ */ jsx("option", { value: series.id, children: series.title }, series.id))
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.series_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "season_number", value: "Season Number" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "season_number",
              type: "number",
              className: "mt-1 block w-full rounded-xl",
              value: data.season_number,
              onChange: (e) => setData("season_number", e.target.value),
              required: true,
              placeholder: "e.g. 1"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.season_number, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Season Title (Optional)" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "title",
              type: "text",
              className: "mt-1 block w-full rounded-xl",
              value: data.title,
              onChange: (e) => setData("title", e.target.value),
              placeholder: "e.g. Winter is Coming"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm transition-all duration-200",
              rows: "4",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              placeholder: "Enter season synopsis..."
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "air_date", value: "Air Date" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "air_date",
              type: "date",
              className: "mt-1 block w-full rounded-xl",
              value: data.air_date,
              onChange: (e) => setData("air_date", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.air_date, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "poster_url", value: "Poster URL" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "poster_url",
                type: "url",
                className: "mt-1 block w-full rounded-xl",
                value: data.poster_url,
                onChange: (e) => setData("poster_url", e.target.value),
                placeholder: "https://..."
              }
            ),
            data.poster_url && /* @__PURE__ */ jsx("div", { className: "mt-1 w-12 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("img", { src: data.poster_url, alt: "Preview", className: "w-full h-full object-cover" }) })
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.poster_url, className: "mt-2" })
        ] })
      ] }) }),
      activeTab === "episodes" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Episode List" }),
          /* @__PURE__ */ jsxs(SecondaryButton, { onClick: addEpisode, type: "button", className: "!rounded-xl", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 -ml-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
            "Add Episode"
          ] })
        ] }),
        data.episodes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: "No episodes added yet." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: addEpisode,
              className: "mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium",
              children: "Add your first episode"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.episodes.map((episode, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-200 group",
            children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-1 flex items-start justify-center pt-2", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm", children: episode.episode_number || "#" }) }),
              /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-11 space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Episode Number", className: "text-xs uppercase tracking-wider text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "number",
                        className: "mt-1 block w-full text-sm rounded-lg",
                        value: episode.episode_number,
                        onChange: (e) => updateEpisode(index, "episode_number", e.target.value),
                        placeholder: "1"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Title", className: "text-xs uppercase tracking-wider text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "text",
                        className: "mt-1 block w-full text-sm rounded-lg",
                        value: episode.title,
                        onChange: (e) => updateEpisode(index, "title", e.target.value),
                        placeholder: "Episode Title"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Air Date", className: "text-xs uppercase tracking-wider text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "date",
                        className: "mt-1 block w-full text-sm rounded-lg",
                        value: episode.air_date,
                        onChange: (e) => updateEpisode(index, "air_date", e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Runtime (mins)", className: "text-xs uppercase tracking-wider text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "number",
                        className: "mt-1 block w-full text-sm rounded-lg",
                        value: episode.runtime,
                        onChange: (e) => updateEpisode(index, "runtime", e.target.value),
                        placeholder: "45"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Poster URL", className: "text-xs uppercase tracking-wider text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "url",
                        className: "mt-1 block w-full text-sm rounded-lg",
                        value: episode.poster_url,
                        onChange: (e) => updateEpisode(index, "poster_url", e.target.value),
                        placeholder: "https://..."
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Description", className: "text-xs uppercase tracking-wider text-gray-500" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm text-sm",
                      rows: "2",
                      value: episode.description,
                      onChange: (e) => updateEpisode(index, "description", e.target.value),
                      placeholder: "Episode synopsis..."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeEpisode(index),
                    className: "text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition-colors",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }),
                      "Remove Episode"
                    ]
                  }
                ) })
              ] })
            ] })
          },
          episode.id || index
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm flex justify-end space-x-3", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, disabled: processing, className: "!rounded-xl", children: "Cancel" }),
      /* @__PURE__ */ jsx(PrimaryButton, { onClick: handleSubmit, disabled: processing, className: "!rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500", children: processing ? "Saving..." : season ? "Update Season" : "Create Season" })
    ] })
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SeasonForm
}, Symbol.toStringTag, { value: "Module" }));
function AdminSeasons({ seasons, seriesList, auth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);
  const openCreateModal = () => {
    setEditingSeason(null);
    setIsModalOpen(true);
  };
  const openEditModal = (season) => {
    setEditingSeason(season);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSeason(null);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this season?")) {
      router.delete(route("admin.seasons.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Seasons" }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Seasons" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search seasons...", className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64" }),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: openCreateModal, children: "Add Season" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Series" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Season Number" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Episodes" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: seasons.data.map((season) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: season.series?.title || "N/A" }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
            "Season ",
            season.season_number
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
            season.episodes?.length || 0,
            " Episodes"
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => openEditModal(season), className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(season.id), className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300", children: "Delete" })
          ] })
        ] }, season.id)) })
      ] }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, maxWidth: "4xl", children: /* @__PURE__ */ jsx(
      SeasonForm,
      {
        season: editingSeason,
        seriesList: seriesList || [],
        onClose: closeModal,
        onSuccess: () => {
        }
      }
    ) })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminSeasons
}, Symbol.toStringTag, { value: "Module" }));
function SeriesForm({
  series,
  genres = [],
  persons = [],
  onClose,
  onSuccess
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const getInitialEpisodeLinks = () => {
    if (!series?.seasons) return [];
    const links = [];
    series.seasons.forEach((season) => {
      season.episodes?.forEach((episode) => {
        episode.watch_links?.forEach((link) => {
          links.push({
            id: link.id,
            season_number: season.season_number,
            episode_number: episode.episode_number,
            link_category: "watch",
            server_name: link.server_name,
            quality: link.quality,
            type: link.type || (link.embed_code ? "embed" : "url"),
            url: link.url || "",
            embed_code: link.embed_code || "",
            is_vip_only: Boolean(link.is_vip_only),
            file_size: "",
            file_format: ""
          });
        });
        episode.download_links?.forEach((link) => {
          links.push({
            id: link.id,
            season_number: season.season_number,
            episode_number: episode.episode_number,
            link_category: "download",
            server_name: link.server_name,
            quality: link.quality,
            type: "url",
            url: link.url || "",
            embed_code: "",
            is_vip_only: Boolean(link.is_vip_only),
            file_size: link.file_size || "",
            file_format: link.file_format || ""
          });
        });
      });
    });
    return links;
  };
  const getInitialEpisodeMetadata = () => {
    if (!series?.seasons) return [];
    const metadata = [];
    series.seasons.forEach((season) => {
      season.episodes?.forEach((episode) => {
        metadata.push({
          season_number: season.season_number,
          episode_number: episode.episode_number,
          description: episode.description || "",
          air_date: episode.air_date || "",
          poster_url: episode.poster_url || ""
        });
      });
    });
    return metadata;
  };
  const { data, setData, post, put, processing, errors } = useForm({
    title: series?.title || "",
    slug: series?.slug || "",
    original_title: series?.original_title || "",
    description: series?.description || "",
    release_year_start: series?.release_year_start || "",
    release_year_end: series?.release_year_end || "",
    status: series?.status || "ongoing",
    language: series?.language || "en",
    country: series?.country || "",
    age_rating: series?.age_rating || "",
    is_vip_only: series?.is_vip_only || false,
    poster_url: series?.poster_url || "",
    banner_url: series?.banner_url || "",
    trailer_url: series?.trailer_url || "",
    imdb_id: series?.imdb_id || "",
    genres: series?.genres?.map((g) => g.id) || [],
    persons: series?.persons?.map((p) => ({
      person_id: p.person_id,
      role_type: p.role_type,
      character_name: p.character_name
    })) || [],
    episode_links: getInitialEpisodeLinks(),
    episodes_data: getInitialEpisodeMetadata()
  });
  const storageKey = series?.id ? `series_form_update_${series.id}` : "series_form_create";
  const { clearStorage } = useFormPersistence(storageKey, data, setData);
  const [showTmdbModal, setShowTmdbModal] = useState(false);
  const [tmdbQuery, setTmdbQuery] = useState("");
  const [tmdbResults, setTmdbResults] = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const searchTmdb = async (e) => {
    e.preventDefault();
    if (!tmdbQuery) return;
    setTmdbLoading(true);
    try {
      const response = await axios$1.post(route("admin.tmdb.search"), {
        query: tmdbQuery,
        type: "series"
      });
      setTmdbResults(response.data.results || []);
    } catch (error) {
      console.error("TMDB Search Error:", error);
    } finally {
      setTmdbLoading(false);
    }
  };
  const fetchTmdbDetails = async (tmdbId) => {
    setTmdbLoading(true);
    try {
      const response = await axios$1.post(route("admin.tmdb.details"), {
        tmdb_id: tmdbId,
        type: "series"
      });
      const details = response.data;
      setData((prev) => ({
        ...prev,
        title: details.title,
        original_title: details.original_title,
        description: details.description,
        release_year_start: details.release_year_start,
        release_year_end: details.release_year_end || "",
        status: details.status,
        language: details.language,
        country: details.country,
        poster_url: details.poster_url,
        banner_url: details.banner_url,
        trailer_url: details.trailer_url,
        imdb_id: details.imdb_id
        // Note: Genres and Persons mapping would require more complex logic
      }));
      setShowTmdbModal(false);
    } catch (error) {
      console.error("TMDB Details Error:", error);
    } finally {
      setTmdbLoading(false);
    }
  };
  const [slugError, setSlugError] = useState("");
  useEffect(() => {
    if (data.title && !series?.id) {
      const slug = data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      setData("slug", slug);
    }
  }, [data.title]);
  useEffect(() => {
    const checkSlug = async () => {
      if (!data.slug) return;
      try {
        const response = await axios$1.get(
          route("admin.series.check-slug"),
          {
            params: {
              slug: data.slug,
              id: series?.id
            }
          }
        );
        if (response.data.exists) {
          setSlugError("This slug is already taken.");
        } else {
          setSlugError("");
        }
      } catch (error) {
        console.error("Error checking slug:", error);
      }
    };
    const timeoutId = setTimeout(() => {
      checkSlug();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [data.slug, series?.id]);
  const handleGenreChange = (genreId) => {
    const currentGenres = data.genres;
    if (currentGenres.includes(genreId)) {
      setData(
        "genres",
        currentGenres.filter((id) => id !== genreId)
      );
    } else {
      setData("genres", [...currentGenres, genreId]);
    }
  };
  const addPerson = () => {
    setData("persons", [
      ...data.persons,
      { person_id: "", role_type: "actor", character_name: "" }
    ]);
  };
  const removePerson = (index) => {
    const newPersons = [...data.persons];
    newPersons.splice(index, 1);
    setData("persons", newPersons);
  };
  const updatePerson = (index, field, value) => {
    const newPersons = [...data.persons];
    newPersons[index][field] = value;
    setData("persons", newPersons);
  };
  const hierarchy = useMemo(() => {
    const tree = {};
    data.episode_links.forEach((link, index) => {
      const s = link.season_number || 0;
      const e = link.episode_number || 0;
      if (!tree[s]) tree[s] = {};
      if (!tree[s][e]) tree[s][e] = [];
      tree[s][e].push({ ...link, originalIndex: index });
    });
    data.episodes_data.forEach((meta) => {
      const s = meta.season_number || 0;
      const e = meta.episode_number || 0;
      if (!tree[s]) tree[s] = {};
      if (!tree[s][e]) tree[s][e] = tree[s][e] || [];
    });
    return tree;
  }, [data.episode_links, data.episodes_data]);
  const updateEpisodeMetadata = (seasonNum, episodeNum, field, value) => {
    const newMetadata = [...data.episodes_data];
    const index = newMetadata.findIndex(
      (m) => m.season_number === seasonNum && m.episode_number === episodeNum
    );
    if (index > -1) {
      newMetadata[index][field] = value;
    } else {
      newMetadata.push({
        season_number: seasonNum,
        episode_number: episodeNum,
        description: "",
        air_date: "",
        poster_url: "",
        [field]: value
      });
    }
    setData("episodes_data", newMetadata);
  };
  const [expandedSeasons, setExpandedSeasons] = useState({});
  const [expandedEpisodes, setExpandedEpisodes] = useState({});
  const toggleEpisode = (s, e) => setExpandedEpisodes((prev) => ({
    ...prev,
    [`${s}-${e}`]: !prev[`${s}-${e}`]
  }));
  const addLinkToEpisode = (seasonNum, episodeNum) => {
    setData("episode_links", [
      ...data.episode_links,
      {
        season_number: seasonNum,
        episode_number: episodeNum,
        link_category: "watch",
        server_name: "",
        url: "",
        embed_code: "",
        quality: "HD",
        type: "url",
        file_format: "MKV",
        file_size: "",
        is_vip_only: false
      }
    ]);
    setExpandedSeasons((prev) => ({ ...prev, [seasonNum]: true }));
    setExpandedEpisodes((prev) => ({
      ...prev,
      [`${seasonNum}-${episodeNum}`]: true
    }));
  };
  const removeLink = (originalIndex) => {
    const newLinks = [...data.episode_links];
    newLinks.splice(originalIndex, 1);
    setData("episode_links", newLinks);
  };
  const updateLink = (originalIndex, field, value) => {
    const newLinks = [...data.episode_links];
    newLinks[originalIndex][field] = value;
    setData("episode_links", newLinks);
  };
  const [newSeasonNum, setNewSeasonNum] = useState("");
  const [newEpisodeNum, setNewEpisodeNum] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      onSuccess: () => {
        clearStorage();
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    };
    if (series && series.id) {
      put(route("admin.series.update", series.id), options);
    } else {
      post(route("admin.series.store"), options);
    }
  };
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const renderStep1 = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-5 h-5 text-blue-600 dark:text-blue-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              }
            )
          }
        ),
        "Basic Information"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Series Title" }),
            /* @__PURE__ */ jsx(SecondaryButton, { size: "sm", onClick: () => setShowTmdbModal(true), type: "button", children: "Fetch from TMDB" })
          ] }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "title",
              type: "text",
              className: "mt-1 block w-full",
              value: data.title,
              onChange: (e) => setData("title", e.target.value),
              required: true,
              placeholder: "e.g. Breaking Bad"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "original_title",
              value: "Original Title"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "original_title",
              type: "text",
              className: "mt-1 block w-full",
              value: data.original_title,
              onChange: (e) => setData("original_title", e.target.value),
              placeholder: "Original language title"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.original_title,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "slug", value: "Slug" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "slug",
              type: "text",
              className: "mt-1 block w-full",
              value: data.slug,
              onChange: (e) => setData("slug", e.target.value),
              placeholder: "e.g. breaking-bad"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.slug || slugError,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "imdb_id", value: "IMDb ID" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "imdb_id",
              type: "text",
              className: "mt-1 block w-full",
              value: data.imdb_id,
              onChange: (e) => setData("imdb_id", e.target.value),
              placeholder: "tt0903747"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.imdb_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Synopsis" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              className: "mt-1 block w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm",
              rows: "4",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              placeholder: "Enter a detailed description of the series..."
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.description,
              className: "mt-2"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4", children: "Genres" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: genres.map((genre) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700",
          children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: data.genres.includes(genre.id),
                onChange: () => handleGenreChange(genre.id)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300", children: genre.name })
          ]
        },
        genre.id
      )) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.genres, className: "mt-2" })
    ] })
  ] });
  const renderStep2 = () => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4", children: "Details & Settings" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "status",
            className: "mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm",
            value: data.status,
            onChange: (e) => setData("status", e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "ongoing", children: "Ongoing" }),
              /* @__PURE__ */ jsx("option", { value: "ended", children: "Ended" }),
              /* @__PURE__ */ jsx("option", { value: "canceled", children: "Canceled" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "release_year_start",
              value: "Start Year"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "release_year_start",
              type: "number",
              className: "mt-1 block w-full",
              value: data.release_year_start,
              onChange: (e) => setData("release_year_start", e.target.value),
              placeholder: "2008"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.release_year_start,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "release_year_end",
              value: "End Year"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "release_year_end",
              type: "number",
              className: "mt-1 block w-full",
              value: data.release_year_end,
              onChange: (e) => setData("release_year_end", e.target.value),
              placeholder: "2013"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.release_year_end,
              className: "mt-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "language", value: "Language" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "language",
            type: "text",
            className: "mt-1 block w-full",
            value: data.language,
            onChange: (e) => setData("language", e.target.value),
            placeholder: "en"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.language, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "country", value: "Country" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "country",
            type: "text",
            className: "mt-1 block w-full",
            value: data.country,
            onChange: (e) => setData("country", e.target.value),
            placeholder: "USA"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.country, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "age_rating", value: "Age Rating" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "age_rating",
            className: "mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm",
            value: data.age_rating,
            onChange: (e) => setData("age_rating", e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "G", children: "Select Rating" }),
              /* @__PURE__ */ jsx("option", { value: "G", children: "G - General Audiences" }),
              /* @__PURE__ */ jsx("option", { value: "PG", children: "PG - Parental Guidance" }),
              /* @__PURE__ */ jsx("option", { value: "PG-13", children: "PG-13" }),
              /* @__PURE__ */ jsx("option", { value: "18+", children: "18+" }),
              /* @__PURE__ */ jsx("option", { value: "R", children: "R - Restricted" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.age_rating, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "is_vip_only",
            checked: data.is_vip_only,
            onChange: (e) => setData("is_vip_only", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-gray-800 dark:text-gray-200", children: "VIP Exclusive" }),
          /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 dark:text-gray-400", children: "Only accessible to VIP members" })
        ] })
      ] }) })
    ] })
  ] });
  const renderStep3 = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-5 h-5 text-blue-600 dark:text-blue-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            )
          }
        ),
        "Media Assets"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "poster_url", value: "Poster URL" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "poster_url",
                type: "url",
                className: "mt-1 block w-full",
                value: data.poster_url,
                onChange: (e) => setData("poster_url", e.target.value),
                placeholder: "https://..."
              }
            ),
            data.poster_url && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-8 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.poster_url,
                alt: "Preview",
                className: "w-full h-full object-cover"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.poster_url,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "banner_url",
              value: "Banner/Backdrop URL"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "banner_url",
                type: "url",
                className: "mt-1 block w-full",
                value: data.banner_url,
                onChange: (e) => setData("banner_url", e.target.value),
                placeholder: "https://..."
              }
            ),
            data.banner_url && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.banner_url,
                alt: "Preview",
                className: "w-full h-full object-cover"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.banner_url,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "trailer_url",
              value: "Trailer URL (YouTube/Embed)"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "trailer_url",
              type: "url",
              className: "mt-1 block w-full",
              value: data.trailer_url,
              onChange: (e) => setData("trailer_url", e.target.value),
              placeholder: "https://youtube.com/..."
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.trailer_url,
              className: "mt-2"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-gray-100", children: "Cast & Crew" }),
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: addPerson,
            type: "button",
            size: "sm",
            children: "+ Add Person"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.persons.map((person, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col md:flex-row gap-4 items-start border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Person" }),
              /* @__PURE__ */ jsx(
                PersonSelector,
                {
                  value: person.person_id,
                  onChange: (id) => updatePerson(index, "person_id", id),
                  persons
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/4", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Role" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "mt-1 block w-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm",
                  value: person.role_type,
                  onChange: (e) => updatePerson(
                    index,
                    "role_type",
                    e.target.value
                  ),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "actor", children: "Actor" }),
                    /* @__PURE__ */ jsx("option", { value: "director", children: "Director" }),
                    /* @__PURE__ */ jsx("option", { value: "writer", children: "Writer" }),
                    /* @__PURE__ */ jsx("option", { value: "producer", children: "Producer" })
                  ]
                }
              )
            ] }),
            person.role_type === "actor" && /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Character Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "mt-1 block w-full",
                  value: person.character_name,
                  onChange: (e) => updatePerson(
                    index,
                    "character_name",
                    e.target.value
                  ),
                  placeholder: "e.g. Walter White"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removePerson(index),
                className: "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      }
                    )
                  }
                )
              }
            ) })
          ]
        },
        index
      )) }),
      data.persons.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 text-center py-4", children: "No cast or crew added yet." })
    ] })
  ] });
  const getInitialActiveSeason = () => {
    if (series?.seasons && series.seasons.length > 0) {
      const lastSeason = Math.max(
        ...series.seasons.map((s) => s.season_number)
      );
      return lastSeason;
    }
    return 1;
  };
  const [activeSeasonTab, setActiveSeasonTab] = useState(getInitialActiveSeason());
  useEffect(() => {
    const seasons = Object.keys(hierarchy).map(Number).sort((a, b) => a - b);
    if (seasons.length > 0) {
      if (!seasons.includes(activeSeasonTab)) {
        setActiveSeasonTab(seasons[seasons.length - 1]);
      }
    } else {
      setActiveSeasonTab(1);
    }
  }, [hierarchy]);
  const handleAddSeason = () => {
    const seasons = Object.keys(hierarchy).map(Number);
    const nextSeason = seasons.length > 0 ? Math.max(...seasons) + 1 : 1;
    setActiveSeasonTab(nextSeason);
  };
  const handleAddEpisodeToActiveSeason = () => {
    const episodes = hierarchy[activeSeasonTab] ? Object.keys(hierarchy[activeSeasonTab]).map(Number) : [];
    const nextEpisode = episodes.length > 0 ? Math.max(...episodes) + 1 : 1;
    addLinkToEpisode(activeSeasonTab, nextEpisode);
  };
  const renderStep4 = () => {
    const seasons = Object.keys(hierarchy).map(Number).sort((a, b) => a - b);
    const activeEpisodes = hierarchy[activeSeasonTab] ? Object.keys(hierarchy[activeSeasonTab]).map(Number).sort((a, b) => a - b) : [];
    return /* @__PURE__ */ jsx("div", { className: "space-y-6 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-gray-100", children: "Episode Manager" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Manage seasons, episodes, and streaming links." })
        ] }),
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: handleAddSeason,
            className: "w-full sm:w-auto justify-center",
            children: "+ Add Season"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex overflow-x-auto gap-3 pb-2 custom-scrollbar snap-x", children: [
        seasons.slice().reverse().map((season) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveSeasonTab(season),
            className: `flex-shrink-0 snap-start px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeSeasonTab === season ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-800" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md"}`,
            children: [
              "Season ",
              season
            ]
          },
          season
        )),
        !seasons.includes(activeSeasonTab) && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "flex-shrink-0 px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-800",
            children: [
              "Season ",
              activeSeasonTab,
              " (New)"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800 min-h-[400px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-gray-700 dark:text-gray-200", children: [
            "Season ",
            activeSeasonTab,
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500 dark:text-gray-400 font-normal text-sm ml-2", children: [
              "(",
              activeEpisodes.length,
              " Episodes)"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            PrimaryButton,
            {
              onClick: handleAddEpisodeToActiveSeason,
              type: "button",
              className: "w-full sm:w-auto justify-center",
              children: [
                "+ Add Episode",
                " ",
                activeEpisodes.length > 0 ? Math.max(...activeEpisodes) + 1 : 1
              ]
            }
          )
        ] }),
        activeEpisodes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-8 h-8 text-gray-400 dark:text-gray-500",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("h5", { className: "text-lg font-medium text-gray-800 dark:text-gray-200 mb-2", children: "No episodes yet" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto", children: [
            "Add the first episode to Season",
            " ",
            activeSeasonTab,
            "."
          ] }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              onClick: handleAddEpisodeToActiveSeason,
              type: "button",
              children: "Create Episode 1"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: activeEpisodes.slice().reverse().map((episodeNum) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md",
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50",
                  onClick: () => toggleEpisode(
                    activeSeasonTab,
                    episodeNum
                  ),
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold", children: episodeNum }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("h5", { className: "font-semibold text-gray-800 dark:text-gray-200", children: [
                          "Episode ",
                          episodeNum
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
                          hierarchy[activeSeasonTab][episodeNum].length,
                          " ",
                          "Links"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `p-2 rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-400 transition-transform duration-200 ${expandedEpisodes[`${activeSeasonTab}-${episodeNum}`] ? "rotate-180 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400" : ""}`,
                        children: /* @__PURE__ */ jsx(
                          "svg",
                          {
                            className: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /* @__PURE__ */ jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M19 9l-7 7-7-7"
                              }
                            )
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              expandedEpisodes[`${activeSeasonTab}-${episodeNum}`] && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-4 space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4", children: [
                  /* @__PURE__ */ jsx("h6", { className: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2", children: "Episode Details" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Description" }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          className: "mt-1 block w-full text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500",
                          rows: "2",
                          value: data.episodes_data.find(
                            (m) => m.season_number === activeSeasonTab && m.episode_number === episodeNum
                          )?.description || "",
                          onChange: (e) => updateEpisodeMetadata(
                            activeSeasonTab,
                            episodeNum,
                            "description",
                            e.target.value
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Air Date" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          type: "date",
                          className: "mt-1 block w-full text-sm",
                          value: data.episodes_data.find(
                            (m) => m.season_number === activeSeasonTab && m.episode_number === episodeNum
                          )?.air_date || "",
                          onChange: (e) => updateEpisodeMetadata(
                            activeSeasonTab,
                            episodeNum,
                            "air_date",
                            e.target.value
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Poster URL" }),
                      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          type: "url",
                          className: "mt-1 block w-full text-sm",
                          value: data.episodes_data.find(
                            (m) => m.season_number === activeSeasonTab && m.episode_number === episodeNum
                          )?.poster_url || "",
                          onChange: (e) => updateEpisodeMetadata(
                            activeSeasonTab,
                            episodeNum,
                            "poster_url",
                            e.target.value
                          ),
                          placeholder: "https://..."
                        }
                      ) })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("h6", { className: "text-sm font-semibold text-gray-700 dark:text-gray-300", children: "Streaming & Download Links" }),
                  hierarchy[activeSeasonTab][episodeNum].map(
                    (link) => /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm relative",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: `px-2.5 py-1 rounded-md text-xs font-medium ${link.link_category === "watch" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"}`,
                                  children: link.link_category === "watch" ? "Stream" : "Download"
                                }
                              ),
                              link.server_name && /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md", children: link.server_name })
                            ] }),
                            /* @__PURE__ */ jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => removeLink(
                                  link.originalIndex
                                ),
                                className: "p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400",
                                children: /* @__PURE__ */ jsx(
                                  "svg",
                                  {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /* @__PURE__ */ jsx(
                                      "path",
                                      {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      }
                                    )
                                  }
                                )
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx(InputLabel, { value: "Category" }),
                              /* @__PURE__ */ jsxs(
                                "select",
                                {
                                  className: "w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                  value: link.link_category,
                                  onChange: (e) => updateLink(
                                    link.originalIndex,
                                    "link_category",
                                    e.target.value
                                  ),
                                  children: [
                                    /* @__PURE__ */ jsx("option", { value: "watch", children: "Stream" }),
                                    /* @__PURE__ */ jsx("option", { value: "download", children: "Download" })
                                  ]
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx(InputLabel, { value: "Server Name" }),
                              /* @__PURE__ */ jsx(
                                TextInput,
                                {
                                  className: "w-full text-sm",
                                  value: link.server_name,
                                  onChange: (e) => updateLink(
                                    link.originalIndex,
                                    "server_name",
                                    e.target.value
                                  ),
                                  placeholder: "VidCloud"
                                }
                              )
                            ] })
                          ] }),
                          link.link_category === "watch" ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-1 bg-gray-50 dark:bg-gray-900/50 rounded-lg w-fit", children: [
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => updateLink(
                                    link.originalIndex,
                                    "type",
                                    "url"
                                  ),
                                  className: `px-3 py-1.5 text-xs font-medium rounded-md ${link.type === "url" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`,
                                  children: "Direct URL"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => updateLink(
                                    link.originalIndex,
                                    "type",
                                    "embed"
                                  ),
                                  className: `px-3 py-1.5 text-xs font-medium rounded-md ${link.type === "embed" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`,
                                  children: "Embed Code"
                                }
                              )
                            ] }),
                            link.type === "url" ? /* @__PURE__ */ jsx(
                              TextInput,
                              {
                                className: "w-full text-sm font-mono",
                                value: link.url,
                                onChange: (e) => updateLink(
                                  link.originalIndex,
                                  "url",
                                  e.target.value
                                )
                              }
                            ) : /* @__PURE__ */ jsx(
                              "textarea",
                              {
                                className: "w-full text-sm font-mono rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500",
                                rows: "3",
                                value: link.embed_code,
                                onChange: (e) => updateLink(
                                  link.originalIndex,
                                  "embed_code",
                                  e.target.value
                                )
                              }
                            )
                          ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx(InputLabel, { value: "Download URL" }),
                              /* @__PURE__ */ jsx(
                                TextInput,
                                {
                                  className: "w-full text-sm font-mono",
                                  value: link.url,
                                  onChange: (e) => updateLink(
                                    link.originalIndex,
                                    "url",
                                    e.target.value
                                  )
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                              /* @__PURE__ */ jsxs("div", { children: [
                                /* @__PURE__ */ jsx(InputLabel, { value: "Quality" }),
                                /* @__PURE__ */ jsx(
                                  TextInput,
                                  {
                                    className: "w-full text-sm",
                                    value: link.quality,
                                    onChange: (e) => updateLink(
                                      link.originalIndex,
                                      "quality",
                                      e.target.value
                                    )
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxs("div", { children: [
                                /* @__PURE__ */ jsx(InputLabel, { value: "Format" }),
                                /* @__PURE__ */ jsx(
                                  TextInput,
                                  {
                                    className: "w-full text-sm",
                                    value: link.file_format,
                                    onChange: (e) => updateLink(
                                      link.originalIndex,
                                      "file_format",
                                      e.target.value
                                    )
                                  }
                                )
                              ] })
                            ] })
                          ] })
                        ]
                      },
                      link.originalIndex
                    )
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => addLinkToEpisode(
                        activeSeasonTab,
                        episodeNum
                      ),
                      className: "w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400",
                      children: "+ Add Another Link"
                    }
                  )
                ] })
              ] })
            ]
          },
          episodeNum
        )) })
      ] })
    ] }) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
      currentStep === 1 && renderStep1(),
      currentStep === 2 && renderStep2(),
      currentStep === 3 && renderStep3(),
      currentStep === 4 && renderStep4()
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex justify-between items-center sticky bottom-0 z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4].map((step) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `w-2.5 h-2.5 rounded-full transition-colors ${step === currentStep ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-800"}`
        },
        step
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: currentStep === 1 ? onClose : prevStep,
            type: "button",
            disabled: processing,
            children: currentStep === 1 ? "Cancel" : "Previous"
          }
        ),
        currentStep < 4 ? /* @__PURE__ */ jsx(PrimaryButton, { onClick: nextStep, children: "Next" }) : /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            onClick: handleSubmit,
            disabled: processing,
            children: series ? "Update Series" : "Create Series"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: showTmdbModal, onClose: () => setShowTmdbModal(false), maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "Search TMDB" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: searchTmdb, className: "flex gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            className: "w-full",
            placeholder: "Search for a series...",
            value: tmdbQuery,
            onChange: (e) => setTmdbQuery(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: tmdbLoading, children: tmdbLoading ? "Searching..." : "Search" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: [
        tmdbResults.map((result) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer border border-gray-200 dark:border-gray-600",
            onClick: () => fetchTmdbDetails(result.id),
            children: [
              result.poster_path ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: `https://image.tmdb.org/t/p/w92${result.poster_path}`,
                  alt: result.name,
                  className: "w-12 h-18 object-cover rounded"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-18 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "No Img" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: result.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: result.first_air_date })
              ] })
            ]
          },
          result.id
        )),
        tmdbResults.length === 0 && !tmdbLoading && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "No results found." })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SeriesForm
}, Symbol.toStringTag, { value: "Module" }));
function AdminSeries({ series, genres, persons, auth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isFirst = useRef(true);
  const debounceSearch = debounce((value) => {
    router.get(
      route("admin.series"),
      { search: searchQuery },
      { preserveState: true, replace: true }
    );
  });
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    debounceSearch(searchQuery);
  }, [searchQuery]);
  const openCreateModal = () => {
    setEditingSeries(null);
    setIsModalOpen(true);
  };
  const openEditModal = async (series2) => {
    try {
      const response = await axios.get(route("admin.series.show", series2.id));
      setEditingSeries(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch series details", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSeries(null);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this series?")) {
      router.delete(route("admin.series.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Series" }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-6 gap-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Series" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search series...",
              className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: openCreateModal, children: "Add Series" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Title" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Seasons" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: series.data.map((item) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden", children: item.poster_url ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "h-10 w-10 object-cover",
                    src: item.poster_url,
                    alt: ""
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center text-gray-400 text-xs", children: "N/A" }) }),
                /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: item.title }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: item.original_title })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
                item.seasons_count || 0,
                " ",
                "Seasons"
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === "ongoing" ? "bg-green-100 text-green-800" : item.status === "ended" ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"}`,
                  children: item.status
                }
              ) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openEditModal(item),
                    className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4",
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(
                      item.id
                    ),
                    className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300",
                    children: "Delete"
                  }
                )
              ] })
            ]
          },
          item.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex gap-1 flex-wrap", children: series.links.map((link, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            if (link.url) {
              router.visit(link.url, {
                preserveState: true,
                preserveScroll: true
              });
            }
          },
          disabled: !link.url,
          className: `px-4 py-2 text-sm rounded-md ${link.active ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"} ${!link.url && "opacity-50 cursor-not-allowed"}`,
          dangerouslySetInnerHTML: {
            __html: link.label
          }
        },
        index
      )) }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, maxWidth: "4xl", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 dark:bg-gray-800", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: editingSeries ? `Edit Series: ${editingSeries.title}` : "Create New Series" }),
      /* @__PURE__ */ jsx(
        SeriesForm,
        {
          series: editingSeries,
          genres: genres || [],
          persons: persons || [],
          onClose: closeModal,
          onSuccess: () => {
          }
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminSeries
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleTheme,
      className: `
                relative p-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${theme === "light" ? "bg-white/80 text-amber-500 hover:bg-white shadow-lg shadow-amber-500/20 border border-amber-100" : "bg-slate-800/80 text-indigo-400 hover:bg-slate-800 shadow-lg shadow-indigo-500/20 border border-slate-700"}
            `,
      "aria-label": "Toggle theme",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-6 h-6 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 transform transition-transform duration-500 ${theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`, children: /* @__PURE__ */ jsx(MoonIcon, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 transform transition-transform duration-500 ${theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`, children: /* @__PURE__ */ jsx(SunIcon, { className: "w-6 h-6" }) })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
      ]
    }
  );
}
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-[calc(1.5rem+env(safe-area-inset-top))] sm:pt-0 bg-gray-100 dark:bg-[#0a0e17] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] hidden dark:block" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px] hidden dark:block" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx(ThemeSwitcher, {}) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500 dark:text-gray-300" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-[#1f2937]/60 dark:backdrop-blur-lg dark:border dark:border-white/5 shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
function ConfirmPassword() {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Confirm Password") }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: t("This is a secure area of the application. Please confirm your password before continuing.") }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("Password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: t("Confirm") }) })
    ] })
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Forgot Password") }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: t("Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.") }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600 dark:text-green-400", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value),
          placeholder: t("Enter your email")
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: t("Email Password Reset Link") }) })
    ] })
  ] });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function TelegramLoginWidget({ botName, buttonSize = "large", cornerRadius = 20, requestAccess = "write" }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!botName) return;
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-radius", cornerRadius);
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-auth-url", route("auth.telegram.callback"));
    script.async = true;
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, [botName, buttonSize, cornerRadius, requestAccess]);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: "flex justify-center mt-4" });
}
function Login({ status, canResetPassword }) {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Log in") }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white", children: t("Welcome Back") }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: t("Please sign in to your account") })
    ] }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400 border border-green-500/20", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t("Email") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            placeholder: t("Enter your email"),
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("Password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            placeholder: t("Enter your password"),
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              name: "remember",
              checked: data.remember,
              onChange: (e) => setData("remember", e.target.checked),
              className: "rounded border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-blue-600 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600 dark:text-gray-400", children: t("Remember me") })
        ] }),
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors",
            children: t("Forgot password?")
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("Sign in") }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-gray-300 dark:border-gray-700" }) }),
          /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsx("span", { className: "bg-white dark:bg-[#1f2937] px-2 text-gray-500", children: t("Or continue with") }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(TelegramLoginWidget, { botName: usePage().props.telegramBotUsername }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center text-sm text-gray-600 dark:text-gray-400", children: [
        t("Don't have an account?"),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors",
            children: t("Sign up")
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Register") }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white", children: t("Create Account") }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: t("Join us and start your journey") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t("Name") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            placeholder: t("Enter your full name"),
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t("Email") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            placeholder: t("Enter your email"),
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("Password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            placeholder: t("Create a password"),
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: t("Confirm Password")
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            placeholder: t("Confirm your password"),
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("Create Account") }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center text-sm text-gray-600 dark:text-gray-400", children: [
        t("Already have an account?"),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors",
            children: t("Sign in")
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Reset Password") }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t("Email") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("Password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: t("Confirm Password")
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            id: "password_confirmation",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: t("Reset Password") }) })
    ] })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
const Loader = ({ title, status }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center flex-col text-center w-full h-[100vh]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold dark:text-gray-400 text-center mb-4", children: title }),
    /* @__PURE__ */ jsx("p", { className: "dark:text-gray-400", children: status })
  ] });
};
function TgAuth({ user }) {
  const loginAttempted = useRef(false);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("Initializing...");
  const addLog = (message, type = "info") => {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, message, type }]);
    console.log(`[${timestamp}] ${message}`);
  };
  useEffect(() => {
    addLog("TgAuth page mounted", "info");
    addLog(`User authenticated: ${!!user}`, "info");
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      addLog("Telegram WebApp detected", "success");
      addLog(`initData present: ${!!tg.initData}`, "info");
      if (tg.initData) {
        addLog(`initData: ${tg.initData.substring(0, 50)}...`, "info");
      }
      tg.ready();
      addLog("Telegram WebApp ready", "success");
      if (user) {
        addLog(
          "User already authenticated, redirecting to home...",
          "success"
        );
        setStatus("Already logged in! Redirecting...");
        setTimeout(() => {
          router.visit(route("home"));
        }, 1500);
        return;
      }
      if (!user && tg.initData && !loginAttempted.current) {
        loginAttempted.current = true;
        setStatus("Authenticating with Telegram...");
        addLog("Attempting to login via Mini App...", "info");
        axios$1.post(route("auth.telegram.mini-app"), {
          initData: tg.initData
        }).then((response) => {
          addLog("Login successful!", "success");
          addLog(
            `Response: ${JSON.stringify(response.data)}`,
            "info"
          );
          setStatus("Redirecting to home...");
          setTimeout(() => {
            router.visit(route("home"));
          }, 1e3);
        }).catch((error) => {
          addLog("Login failed!", "error");
          setStatus("Authentication failed");
          if (error.response) {
            addLog(
              `Error status: ${error.response.status}`,
              "error"
            );
            addLog(
              `Error data: ${JSON.stringify(
                error.response.data
              )}`,
              "error"
            );
          } else if (error.request) {
            addLog("No response received from server", "error");
          } else {
            addLog(`Error: ${error.message}`, "error");
          }
          loginAttempted.current = false;
        });
      } else {
        if (!tg.initData) {
          addLog(
            "No initData available - cannot authenticate",
            "warning"
          );
          setStatus("Loading ...");
          setTimeout(() => {
            addLog("Redirecting to home page...", "info");
            router.visit(route("home"));
          }, 1e3);
        } else if (loginAttempted.current) {
          addLog("Login already attempted", "info");
          setStatus("Authenticate success");
          setTimeout(() => {
            addLog("Redirecting to home page...", "info");
            router.visit(route("home"));
          }, 1e3);
        }
      }
    } else {
      addLog("Not running in Telegram WebApp environment", "warning");
      setStatus("Loading ....");
      setTimeout(() => {
        addLog("Redirecting to home page...", "info");
        router.visit(route("home"));
      }, 1e3);
    }
  }, [user]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Loader, { title: "Authentication", status }),
    user && /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-green-400", children: [
      "✓ Logged in as: ",
      user.name || user.email
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => router.visit(route("home")),
        className: "px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded",
        children: "Go to Home"
      }
    ) })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TgAuth
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { t } = useTranslation();
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Email Verification") }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: t("Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.") }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600 dark:text-green-400", children: t("A new verification link has been sent to the email address you provided during registration.") }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("Resend Verification Email") }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
          children: t("Log Out")
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "my", name: "Myanmar", flag: "🇲🇲" }
  ];
  const currentLanguage = languages.find((lang) => i18n.language.startsWith(lang.code)) || languages[0];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative inline-block text-left", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Menu.Button, { className: "inline-flex w-full items-center justify-center gap-x-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-lg shadow-gray-200/50 dark:shadow-black/20 ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200", children: [
      /* @__PURE__ */ jsx(GlobeAltIcon, { className: "h-5 w-5 text-gray-500 dark:text-gray-400", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { className: "uppercase", children: currentLanguage.code }),
      /* @__PURE__ */ jsx(ChevronDownIcon, { className: "-mr-1 h-5 w-5 text-gray-400", "aria-hidden": "true" })
    ] }) }),
    /* @__PURE__ */ jsx(
      Transition,
      {
        as: Fragment$1,
        enter: "transition ease-out duration-100",
        enterFrom: "transform opacity-0 scale-95",
        enterTo: "transform opacity-100 scale-100",
        leave: "transition ease-in duration-75",
        leaveFrom: "transform opacity-100 scale-100",
        leaveTo: "transform opacity-0 scale-95",
        children: /* @__PURE__ */ jsx(Menu.Items, { className: "absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-slate-700", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: languages.map((language) => /* @__PURE__ */ jsx(Menu.Item, { children: ({ active }) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => changeLanguage(language.code),
            className: `
                                            ${active ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}
                                            group flex w-full items-center px-4 py-2 text-sm transition-colors duration-150
                                        `,
            children: [
              /* @__PURE__ */ jsx("span", { className: "mr-3 text-lg", children: language.flag }),
              language.name,
              currentLanguage.code === language.code && /* @__PURE__ */ jsx("span", { className: "ml-auto text-indigo-600 dark:text-indigo-400", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", strokeWidth: "3", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }) }) })
            ]
          }
        ) }, language.code)) }) })
      }
    )
  ] });
}
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { data, setData } = useForm({
    q: ""
  });
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      route("search"),
      { q: data.q },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true
      }
    );
    setIsMobileMenuOpen(false);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "nav",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-black/90 backdrop-blur-md pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] shadow-lg" : "bg-transparent pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] md:pb-6 md:pt-[calc(1.5rem+env(safe-area-inset-top))]"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 md:px-12 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("home"),
              className: "text-2xl font-serif font-bold tracking-tighter text-gray-800 dark:text-white z-50",
              children: [
                "CINE",
                /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "VERSE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-8", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("home"),
                className: "text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors",
                children: t("Home")
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("movies.index"),
                className: "text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors",
                children: t("Movies")
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("series.index"),
                className: "text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors",
                children: t("Series")
              }
            ),
            /* @__PURE__ */ jsx(LanguageSwitcher, {}),
            /* @__PURE__ */ jsx(ThemeSwitcher, {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `hidden md:flex relative items-center transition-all duration-300 ${isSearchOpen ? "w-64" : "w-8"}`,
                children: [
                  /* @__PURE__ */ jsx("form", { onSubmit: handleSearch, className: "w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.q,
                      onChange: (e) => setData("q", e.target.value),
                      placeholder: t("Search titles..."),
                      className: `w-full p-5 bg-transparent border-b border-gray-800/30 dark:border-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-800 dark:focus:border-white py-1 pl-8 pr-2 transition-all duration-300 ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible w-0"}`,
                      onBlur: () => !data.q && setIsSearchOpen(false)
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setIsSearchOpen(!isSearchOpen);
                        if (!isSearchOpen) {
                          setTimeout(
                            () => document.querySelector(
                              'input[name="q"]'
                            )?.focus(),
                            100
                          );
                        }
                      },
                      className: "absolute left-0 p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
                      children: /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-6 h-6 ",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex md:hidden", children: [
              /* @__PURE__ */ jsx(
                "form",
                {
                  onSubmit: handleSearch,
                  className: "w-full ml-3",
                  children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.q,
                      onChange: (e) => setData("q", e.target.value),
                      placeholder: t("Search titles..."),
                      className: `w-full p-5 bg-transparent border-b border-gray-800/30 dark:border-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-800 dark:focus:border-white py-1 pr-2 transition-all duration-300 ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible w-0"}`,
                      onBlur: () => !data.q && setIsSearchOpen(false)
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setIsSearchOpen(!isSearchOpen);
                    if (!isSearchOpen) {
                      setTimeout(
                        () => document.querySelector(
                          'input[name="q"]'
                        )?.focus(),
                        100
                      );
                    }
                  },
                  className: `${isSearchOpen ? "hidden" : ""} ${isMobileMenuOpen ? "hidden" : ""} left-0 p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors`,
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-6 h-6 ",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
                className: "md:hidden text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-50",
                "aria-label": "Toggle menu",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-7 h-7",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: isMobileMenuOpen ? /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    ) : /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 6h16M4 12h16M4 18h16"
                      }
                    )
                  }
                )
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`,
        onClick: closeMobileMenu
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-black z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full pt-24 px-6 pb-6", children: [
          /* @__PURE__ */ jsx("form", { onSubmit: handleSearch, className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.q,
                onChange: (e) => setData("q", e.target.value),
                placeholder: t("Search titles..."),
                className: "w-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-800 dark:focus:border-white py-3 pl-4 pr-12 transition-colors"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      }
                    )
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("nav", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("home"),
                onClick: closeMobileMenu,
                className: "text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all py-4 px-4 rounded-lg",
                children: t("Home")
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("movies.index"),
                onClick: closeMobileMenu,
                className: "text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all py-4 px-4 rounded-lg",
                children: t("Movies")
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("series.index"),
                onClick: closeMobileMenu,
                className: "text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all py-4 px-4 rounded-lg",
                children: t("Series")
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-4 px-2", children: [
              /* @__PURE__ */ jsx(LanguageSwitcher, {}),
              /* @__PURE__ */ jsx(ThemeSwitcher, {})
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-6 border-t border-gray-200 dark:border-white/10", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 uppercase tracking-widest", children: [
            "CINE",
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "VERSE" })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 md:hidden pb-safe", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-around p-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("home"),
          className: `flex flex-col items-center gap-1 ${route().current("home") ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider font-medium", children: t("Home") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("movies.index"),
          className: `flex flex-col items-center gap-1 ${route().current("movies.*") ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider font-medium", children: t("Movies") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("series.index"),
          className: `flex flex-col items-center gap-1 ${route().current("series.*") ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider font-medium", children: t("Series") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: usePage().props.auth.user ? route("profile.edit") : route("login"),
          className: `flex flex-col items-center gap-1 ${route().current("profile.*") || route().current("login") ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider font-medium", children: t("Profile") })
          ]
        }
      )
    ] }) })
  ] });
}
function Footer() {
  const { t } = useTranslation();
  const { footerData } = usePage().props;
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-white/10 py-12 dark:bg-black dark:text-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-12", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-widest dark:text-gray-500 mb-6", children: t("Categories") }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: footerData?.categories?.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: route(
            "genre.show",
            category.slug
          ),
          className: "text-gray-400 dark:*:hover:text-white transition-colors flex justify-between text-sm group",
          children: [
            /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform", children: category.name }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-xs bg-white/5 px-2 py-0.5 rounded-full", children: category.count })
          ]
        }
      ) }, category.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-widest text-gray-500 mb-6", children: t("Top Actors") }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: footerData?.actors?.map((actor) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("person.show", actor.id),
          className: "text-gray-400 dark:hover:text-white transition-colors flex justify-between text-sm group",
          children: [
            /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform", children: actor.name }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-xs bg-white/5 px-2 py-0.5 rounded-full", children: actor.count })
          ]
        }
      ) }, actor.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-widest text-gray-500 mb-6", children: t("Quick Links") }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("about"),
            className: "text-gray-400 hover:text-white transition-colors text-sm group",
            children: /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform inline-block", children: t("About Us") })
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("contact"),
            className: "text-gray-400 hover:text-white transition-colors text-sm group",
            children: /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform inline-block", children: t("Contact") })
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("faq"),
            className: "text-gray-400 hover:text-white transition-colors text-sm group",
            children: /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform inline-block", children: t("FAQ") })
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("privacy"),
            className: "text-gray-400 hover:text-white transition-colors text-sm group",
            children: /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform inline-block", children: t("Privacy Policy") })
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("terms"),
            className: "text-gray-400 hover:text-white transition-colors text-sm group",
            children: /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform inline-block", children: t("Terms of Service") })
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-2xl font-serif font-bold tracking-tighter mb-4", children: [
        "CINE",
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "VERSE" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6", children: t("Your ultimate destination for movies and series.") }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600 uppercase tracking-widest", children: t("© 2025 Cineverse. All rights reserved.") })
    ] })
  ] }) }) });
}
const PlayIcon$2 = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) });
const StarIcon = ({ className = "w-3 h-3" }) => /* @__PURE__ */ jsx("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) });
function MediaCard({ item, type }) {
  console.log(item);
  const href = type === "movie" ? route("movies.show", item.slug) : route("series.show", item.slug);
  const year = item.release_year || item.release_year_start || (item.release_date ? new Date(item.release_date).getFullYear() : null) || (item.created_at ? new Date(item.created_at).getFullYear() : "N/A");
  const duration = type === "movie" && item.runtime ? `${item.runtime} min` : null;
  const seasons = type === "series" && item.seasons_count ? `${item.seasons_count} Seasons` : null;
  return /* @__PURE__ */ jsxs(Link, { href, className: "group block relative w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-900 mb-3 relative shadow-lg group-hover:shadow-2xl transition-all duration-500", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: item.poster_url,
          alt: item.title,
          loading: "lazy",
          className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" }),
      item.is_vip_only && /* @__PURE__ */ jsx("div", { className: "absolute top-1 left-1 px-1 md:top-3 md:left-3 md:px-3 py-0.5 bg-yellow-500 text-black text-[10px]  md:text-sm font-black uppercase tracking-wider rounded-sm shadow-md z-10", children: "VIP" }),
      item.rating_average > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute top-1 right-1 md:top-3 md:right-3 flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-xs md:text-sm  font-bold text-yellow-400 z-10", children: [
        /* @__PURE__ */ jsx(StarIcon, {}),
        /* @__PURE__ */ jsx("span", { children: Number(item.rating_average).toFixed(1) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100", children: /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl group-hover:bg-indigo-600/90 group-hover:border-indigo-500 transition-colors", children: /* @__PURE__ */ jsx(PlayIcon$2, { className: "w-6 h-6 text-white ml-1" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-gray-800 dark:text-white font-medium text-base leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate", children: item.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium flex-wrap", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300", children: year }),
        /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `uppercase tracking-wide text-[10px] border dark:border-gray-700 px-1 rounded text-gray-600 dark:text-gray-400 ${item.status === "ongoing" ? "bg-green-100 dark:bg-green-500/20" : "bg-red-100 dark:bg-red-800/20"}`,
            children: item.status
          }
        ),
        (duration || seasons) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600" }),
          /* @__PURE__ */ jsx("span", { children: duration || seasons })
        ] })
      ] }),
      item.genres && item.genres.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 truncate", children: item.genres.map((g) => g.name).join(", ") })
    ] })
  ] });
}
function SeoHead({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  structuredData = null,
  author = null,
  publishedTime = null,
  modifiedTime = null
}) {
  const appName = "Cineverse";
  const fullTitle = title ? `${title} - ${appName}` : appName;
  const defaultDescription = "Your Ultimate Movie & Series Destination - Stream and download the latest movies and TV series";
  const metaDescription = description || defaultDescription;
  const canonicalUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    author && /* @__PURE__ */ jsx("meta", { name: "author", content: author }),
    canonicalUrl && /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    canonicalUrl && /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    image && /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: title || appName }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: appName }),
    publishedTime && /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: publishedTime }),
    modifiedTime && /* @__PURE__ */ jsx("meta", { property: "article:modified_time", content: modifiedTime }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: image ? "summary_large_image" : "summary" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: metaDescription }),
    image && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }),
    /* @__PURE__ */ jsx("meta", { name: "googlebot", content: "index, follow" }),
    structuredData && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) })
  ] });
}
function LoadingLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const { props } = usePage();
  useEffect(() => {
    const minSplashTime = 500;
    const timeout = setTimeout(() => {
      setLoading(false);
    }, minSplashTime);
    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Loader, {}) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function GenreShow({ genre, movies, series, seo }) {
  const [activeTab, setActiveTab] = useState("movies");
  const { t } = useTranslation();
  const handlePageChange = (url, type) => {
    router.get(url, {}, { preserveState: true, preserveScroll: true });
  };
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  const PaginationControls = ({ data, type }) => {
    if (!data.links || data.links.length <= 3) return null;
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center gap-2 mt-12", children: data.links.map((link, index) => {
      if (!link.url) {
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-4 py-2 text-gray-600 cursor-not-allowed",
            dangerouslySetInnerHTML: { __html: link.label }
          },
          index
        );
      }
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(link.url),
          className: `px-4 py-2 transition-colors ${link.active ? "bg-white text-black font-bold" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        index
      );
    }) });
  };
  return /* @__PURE__ */ jsx(LoadingLayout, { children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        type: "website"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative h-[30vh] md:h-[40vh] w-full overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-purple-200 via-white to-blue-200 dark:from-purple-900/30 dark:via-black dark:to-blue-900/30", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block px-3 py-1 border border-gray-800/30 dark:border-white/30 text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-white mb-4 backdrop-blur-sm", children: t("Genre") }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-serif text-gray-800 dark:text-white leading-tight mb-4", children: genre.name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto", children: t(`Explore ${movies.total + series.total} movies and series in this genre`, { count: movies.total + series.total }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-12 border-b border-gray-200 dark:border-white/10", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab("movies"),
              className: `px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${activeTab === "movies" ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
              children: [
                t(`Movies (${movies.total})`, { count: movies.total }),
                activeTab === "movies" && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab("series"),
              className: `px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${activeTab === "series" ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
              children: [
                t(`Series (${series.total})`, { count: series.total }),
                activeTab === "series" && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white" })
              ]
            }
          )
        ] }),
        activeTab === "movies" && /* @__PURE__ */ jsx("div", { children: movies.data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8", children: movies.data.map((movie) => /* @__PURE__ */ jsx(
            MediaCard,
            {
              item: movie,
              type: "movie"
            },
            movie.id
          )) }),
          /* @__PURE__ */ jsx(
            PaginationControls,
            {
              data: movies,
              type: "movies"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: t("No movies found in this genre.") }) }) }),
        activeTab === "series" && /* @__PURE__ */ jsx("div", { children: series.data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8", children: series.data.map((item) => /* @__PURE__ */ jsx(
            MediaCard,
            {
              item,
              type: "series"
            },
            item.id
          )) }),
          /* @__PURE__ */ jsx(
            PaginationControls,
            {
              data: series,
              type: "series"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: t("No series found in this genre.") }) }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] }) });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GenreShow
}, Symbol.toStringTag, { value: "Module" }));
const SectionTitle = ({ title, subtitle, href }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-end justify-between border-b border-gray-200 dark:border-white/10 pb-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-serif text-gray-800 dark:text-white", children: t(title) }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1 uppercase tracking-widest", children: t(subtitle) })
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        href,
        className: "text-xs font-bold text-gray-500 hover:text-gray-800 dark:hover:text-white uppercase tracking-widest transition-colors",
        children: t("View All")
      }
    )
  ] });
};
function Home({ featured, latestMovies, latestSeries, seo }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  useEffect(() => {
    if (!featured || featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => prevIndex === featured.length - 1 ? 0 : prevIndex + 1
      );
    }, 6e3);
    return () => clearInterval(interval);
  }, [featured]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        url: seo?.url,
        image: seo?.image,
        type: "website",
        structuredData: seo?.structuredData
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen mt-0 bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      featured && featured.length > 0 && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative h-[85vh] w-full overflow-hidden group",
          onTouchStart: (e) => {
            const touch = e.touches[0];
            setTouchStart(touch.clientX);
          },
          onTouchMove: (e) => {
            const touch = e.touches[0];
            setTouchEnd(touch.clientX);
          },
          onTouchEnd: () => {
            if (!touchStart || !touchEnd) return;
            const distance = touchStart - touchEnd;
            const isLeftSwipe = distance > 50;
            const isRightSwipe = distance < -50;
            if (isLeftSwipe) {
              setCurrentIndex((prev) => prev === featured.length - 1 ? 0 : prev + 1);
            }
            if (isRightSwipe) {
              setCurrentIndex((prev) => prev === 0 ? featured.length - 1 : prev - 1);
            }
            setTouchStart(null);
            setTouchEnd(null);
          },
          children: [
            featured.map((item, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: item.poster_url,
                      alt: item.title,
                      className: "block md:hidden w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: item.banner_url,
                      alt: item.title,
                      className: "hidden md:block w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#050505] via-gray-100/40 dark:via-[#050505]/40 to-transparent" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-100 dark:from-[#050505] via-gray-100/60 dark:via-[#050505]/60 to-transparent" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
                    /* @__PURE__ */ jsxs("span", { className: "inline-block px-2 py-1 border border-gray-800/30 dark:border-white/30 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 dark:text-white mb-6 backdrop-blur-sm", children: [
                      t("Featured"),
                      " ",
                      item.type === "series" ? t("Series") : t("Film")
                    ] }),
                    /* @__PURE__ */ jsx("h1", { className: "text-4xl line-clamp-1  md:text-7xl lg:text-8xl font-serif text-gray-800 dark:text-white leading-[0.9] mb-6", children: item.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm md:text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed mb-8 line-clamp-3 max-w-xl", children: item.description }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: item.type === "series" ? route(
                          "series.show",
                          item.slug
                        ) : route(
                          "movies.show",
                          item.slug
                        ),
                        className: "px-2 md:px-8 text-sm md:text-lg py-3 bg-gray-800 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors",
                        children: t("Watch Now")
                      }
                    ) })
                  ] }) }) })
                ]
              },
              `${item.type}-${item.id}`
            )),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3", children: featured.map((_, index) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCurrentIndex(index),
                className: `w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gray-800 dark:bg-white scale-125" : "bg-gray-800/30 dark:bg-white/30 hover:bg-gray-800/50 dark:hover:bg-white/50"}`,
                "aria-label": `${t("Go to slide")} ${index + 1}`
              },
              index
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 md:px-12 py-20 space-y-10", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx(
            SectionTitle,
            {
              title: "New Releases",
              subtitle: "Fresh from the cinema",
              href: route("movies.index")
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8", children: latestMovies.map((movie) => /* @__PURE__ */ jsx(
            MediaCard,
            {
              item: movie,
              type: "movie"
            },
            movie.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-0", children: [
          /* @__PURE__ */ jsx(
            SectionTitle,
            {
              title: "Latest Series",
              subtitle: "Binge-worthy collections",
              href: route("series.index")
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8", children: latestSeries.map((series) => /* @__PURE__ */ jsx(
            MediaCard,
            {
              item: series,
              type: "series"
            },
            series.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
function RatingWidget({
  ratingAverage,
  ratingCount,
  userRating,
  onRate
}) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(
    userRating?.rating || 0
  );
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    if (onRate) {
      onRate(rating);
    }
  };
  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      let isFilled;
      if (interactive) {
        const currentDisplayRating = hoveredStar > 0 ? hoveredStar : selectedRating / 2;
        isFilled = starValue <= Math.ceil(currentDisplayRating);
      } else {
        isFilled = starValue <= Math.round(rating / 2);
      }
      return /* @__PURE__ */ jsx(
        "svg",
        {
          className: `star  text-yellow-500 ${isFilled ? "filled" : ""}`,
          onMouseEnter: () => interactive && setHoveredStar(starValue),
          onMouseLeave: () => interactive && setHoveredStar(0),
          onClick: () => interactive && handleStarClick(starValue * 2),
          fill: isFilled ? "currentColor" : "none",
          stroke: "currentColor",
          strokeWidth: "2",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            }
          )
        },
        index
      );
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center sm:items-end sm:flex-row gap-2 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "text-4xl sm:text-5xl font-bold gradient-text text-center sm:text-right w-full sm:w-auto", children: ratingAverage.toFixed(1) }),
      /* @__PURE__ */ jsx("div", { className: "star-rating flex flex-row items-center justify-center sm:justify-start mt-2 sm:mt-0", children: renderStars(ratingAverage) }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm dark:text-gray-400 mt-1 text-center sm:text-left w-full sm:w-auto", children: [
        ratingCount.toLocaleString(),
        " ",
        ratingCount === 1 ? "rating" : "ratings"
      ] })
    ] }) }),
    onRate && /* @__PURE__ */ jsxs("div", { className: "glass-card-dark p-4 rounded-lg flex flex-col items-center w-full", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium dark:text-gray-300 mb-2 text-center w-full", children: "Rate this movie" }),
      /* @__PURE__ */ jsx("div", { className: "star-rating flex flex-row items-center justify-center w-full", children: renderStars(selectedRating, true) }),
      selectedRating > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs dark:text-gray-400 mt-2 text-center w-full", children: [
        "You rated this ",
        selectedRating / 2,
        " ",
        selectedRating / 2 === 1 ? "star" : "stars"
      ] })
    ] })
  ] });
}
const PlayIcon$1 = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) });
const LinkItem$1 = ({ link, type, isVip }) => {
  const { t } = useTranslation();
  const isLocked = link.is_vip_only && !isVip;
  const [copied, setCopied] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `group flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-2 ${isLocked ? "opacity-50" : ""}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx("span", { className: "dark:text-white font-serif text-lg leading-none", children: link.server_name }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${type === "download" ? "border-blue-500 text-blue-500" : "border-red-500 text-red-500"}`,
            children: link.quality?.replace("p", "") || "HD"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: isLocked ? /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-yellow-500 border border-yellow-500 px-2 py-1 uppercase tracking-widest", children: t("VIP") }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `w-10 h-10 rounded-full flex items-center justify-center transition-all ${type === "download" ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-red-600 hover:bg-red-500 text-white"}`,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
                    clipRule: "evenodd"
                  }
                )
              }
            )
          }
        ) }) })
      ]
    }
  );
};
const TrailerModal$1 = ({ url, onClose }) => {
  if (!url) return null;
  const videoId = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )?.[1];
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  if (!embedUrl) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-fade-in",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-6 right-6 text-white/50 hover:text-white transition-colors",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-10 h-10",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1,
                    d: "M6 18L18 6M6 6l12 12"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-full max-w-6xl aspect-video bg-black shadow-2xl", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: embedUrl,
            className: "w-full h-full",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        ) })
      ]
    }
  );
};
function MovieDetails({
  movie,
  watchLinksByQuality,
  downloadLinksByQuality,
  relatedMovies,
  userRating,
  isVip,
  seo
}) {
  console.log(movie);
  const { t } = useTranslation();
  const { auth } = usePage().props;
  const [showTrailer, setShowTrailer] = useState(false);
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  const scrollToWatch = () => {
    document.getElementById("watch-section")?.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        url: seo?.url,
        image: seo?.image,
        type: seo?.type,
        structuredData: seo?.structuredData
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0e17] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full min-h-[85vh] md:min-h-[100vh] flex items-end pb-12 md:pb-24 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: movie.banner_url || movie.poster_url,
              alt: movie.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0a0e17] via-gray-50/60 dark:via-[#0a0e17]/60 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-[#0a0e17] via-gray-50/40 dark:via-[#0a0e17]/40 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/10 dark:bg-black/20" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 container-custom w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-64 lg:w-72 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 transform hover:scale-105 transition-transform duration-500", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: movie.poster_url,
              alt: movie.title,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full text-center md:text-left", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "mb-4 animate-slide-up",
                style: { animationDelay: "0.1s" },
                children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-2 font-serif leading-tight drop-shadow-lg", children: movie.title }),
                  movie.original_title && /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-500 dark:text-gray-400 font-serif italic", children: movie.original_title })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mb-8 text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 animate-slide-up",
                style: { animationDelay: "0.2s" },
                children: [
                  movie.rating_average > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-yellow-500 dark:text-yellow-400", children: [
                    /* @__PURE__ */ jsx("span", { children: "★" }),
                    /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-white", children: movie.rating_average })
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: new Date(
                    movie.release_date
                  ).getFullYear() }),
                  /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 border border-gray-300 dark:border-white/20 rounded text-xs uppercase tracking-wider bg-gray-200 dark:bg-white/5", children: movie.age_rating || "PG-13" }),
                  /* @__PURE__ */ jsx("span", { children: movie.formatted_runtime }),
                  movie.country && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "•" }),
                    /* @__PURE__ */ jsx("span", { children: movie.country })
                  ] }),
                  movie.view_count > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs", children: [
                    /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: [
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: movie.view_count })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex flex-wrap justify-center md:justify-start gap-2 mb-8 animate-slide-up",
                style: { animationDelay: "0.3s" },
                children: movie.genres?.map((genre) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "genre-pill",
                    children: genre.name
                  },
                  genre.id
                ))
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-wrap justify-center md:justify-start gap-4 animate-slide-up",
                style: { animationDelay: "0.4s" },
                children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: scrollToWatch,
                      className: "btn-primary group",
                      children: [
                        /* @__PURE__ */ jsx(PlayIcon$1, { className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform" }),
                        t("Watch Now")
                      ]
                    }
                  ),
                  movie.trailer_url && /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => setShowTrailer(true),
                      className: "btn-secondary group",
                      children: [
                        /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: [
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                }
                              )
                            ]
                          }
                        ),
                        t("Trailer")
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "container-custom py-12 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-[2px] bg-blue-500" }),
              t("Storyline")
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed opacity-90", children: movie.description })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              id: "watch-section",
              className: "mb-16 scroll-mt-24",
              children: /* @__PURE__ */ jsxs("div", { className: "glass-card-adaptive p-6 md:p-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-serif text-gray-900 dark:text-white flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(PlayIcon$1, { className: "w-6 h-6 text-blue-500" }),
                    t("Watch & Download")
                  ] }),
                  movie.is_vip_only && /* @__PURE__ */ jsx("span", { className: "badge-vip", children: t("VIP ACCESS") })
                ] }),
                auth.user ? /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `${watchLinksByQuality && Object.keys(
                        watchLinksByQuality
                      ).length > 0 ? "" : "hidden"}`,
                      children: [
                        /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-500 uppercase tracking-widest mb-4", children: t("Streaming Sources") }),
                        /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: watchLinksByQuality && Object.keys(
                          watchLinksByQuality
                        ).length > 0 ? Object.values(
                          watchLinksByQuality
                        ).flat().map((link) => /* @__PURE__ */ jsx(
                          LinkItem$1,
                          {
                            link,
                            type: "watch",
                            isVip
                          },
                          link.id
                        )) : /* @__PURE__ */ jsx("div", { className: "text-gray-500 italic", children: t(
                          "No streaming links available."
                        ) }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `${downloadLinksByQuality && Object.keys(
                        downloadLinksByQuality
                      ).length > 0 ? "" : "hidden"}`,
                      children: [
                        /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-500 uppercase tracking-widest mb-4", children: t("Download Files") }),
                        /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: downloadLinksByQuality && Object.keys(
                          downloadLinksByQuality
                        ).length > 0 ? Object.values(
                          downloadLinksByQuality
                        ).flat().map((link) => /* @__PURE__ */ jsx(
                          LinkItem$1,
                          {
                            link,
                            type: "download",
                            isVip
                          },
                          link.id
                        )) : /* @__PURE__ */ jsx("div", { className: "text-gray-500 italic", children: t(
                          "No download links available."
                        ) }) })
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: t(
                    "Please log in to access streaming and download links."
                  ) }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: route("login"),
                      className: "btn-primary",
                      children: t("Log In to Watch")
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-[2px] bg-blue-500" }),
              t("Top Cast")
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6", children: movie.actors?.slice(0, 8).map((actor) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: route(
                  "person.show",
                  actor.person?.id
                ),
                className: "group block",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-200 dark:bg-gray-800", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: actor.person?.avatar_url || "/images/placeholder-avatar.jpg",
                      alt: actor.person?.name,
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("h4", { className: "text-gray-900 dark:text-white font-medium truncate group-hover:text-blue-400 transition-colors", children: actor.person?.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 truncate", children: actor.character_name })
                ]
              },
              actor.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 flex-shrink-0 space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass-card-adaptive p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center", children: t("Rate this Movie") }),
            auth.user ? /* @__PURE__ */ jsx(
              RatingWidget,
              {
                ratingAverage: movie.rating_average || 0,
                ratingCount: movie.rating_count || 0,
                userRating,
                onRate: (rating) => {
                  if (userRating) {
                    router.put(
                      route(
                        "admin.ratings.update",
                        userRating.id
                      ),
                      { rating },
                      { preserveScroll: true }
                    );
                  } else {
                    router.post(
                      route(
                        "admin.ratings.store"
                      ),
                      {
                        movie_id: movie.id,
                        rating
                      },
                      { preserveScroll: true }
                    );
                  }
                }
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: route("login"),
                  className: "text-blue-400 hover:underline",
                  children: t("Log in")
                }
              ),
              " ",
              t("to rate.")
            ] })
          ] }),
          relatedMovies && relatedMovies.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-l-4 border-blue-500 pl-3", children: t("You May Also Like") }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-2 gap-4", children: relatedMovies.slice(0, 6).map((rel) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: route(
                  "movies.show",
                  rel.slug
                ),
                className: "group block",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "aspect-[2/3] rounded-lg overflow-hidden mb-2 relative", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: rel.poster_url,
                        alt: rel.title,
                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" })
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "text-sm text-gray-600 dark:text-gray-300 font-medium truncate group-hover:text-blue-600 dark:group-hover:text-white transition-colors", children: rel.title }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { children: new Date(
                      rel.release_date
                    ).getFullYear() }),
                    /* @__PURE__ */ jsxs("span", { className: "text-yellow-500", children: [
                      "★",
                      " ",
                      rel.rating_average
                    ] })
                  ] })
                ]
              },
              rel.id
            )) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }),
    showTrailer && /* @__PURE__ */ jsx(
      TrailerModal$1,
      {
        url: movie.trailer_url,
        onClose: () => setShowTrailer(false)
      }
    )
  ] });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MovieDetails
}, Symbol.toStringTag, { value: "Module" }));
const Pagination$1 = ({ links }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-8 mb-5 gap-2", children: links.map((link, index) => /* @__PURE__ */ jsx(
    Link,
    {
      href: link.url ? link.url : "#",
      className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${link.active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
      dangerouslySetInnerHTML: { __html: link.label },
      disabled: !link.url
    },
    index
  )) });
};
function Index$1({ movies }) {
  const { t } = useTranslation();
  console.log(movies);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Movies") }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen py-16  bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black pb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 md:px-12", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 border-b border-gray-200 dark:border-white/10 pt-2", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-serif text-gray-800 dark:text-white", children: t("Movies") }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 md:gap-x-4 gap-y-8", children: movies.data.map((movie) => /* @__PURE__ */ jsx(
          MediaCard,
          {
            item: movie,
            type: "movie"
          },
          movie.id
        )) }),
        movies.links && movies.links.length > 3 && /* @__PURE__ */ jsx(Pagination$1, { links: movies.links })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function StaticPageLayout({ title, description, children }) {
  return /* @__PURE__ */ jsx(LoadingLayout, { children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title,
        description,
        type: "website"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative h-[30vh] md:h-[40vh] w-full overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight", children: title?.replace(" - Cineverse", "") }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 h-1 w-24 bg-white mx-auto" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 py-16 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] }) });
}
function About({ title, description }) {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsx(StaticPageLayout, { title, description, children: /* @__PURE__ */ jsxs("div", { className: "prose prose-invert prose-lg max-w-none", children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Welcome to Cineverse" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: "Cineverse is your ultimate destination for discovering and enjoying the best movies and series from around the world. We are passionate about cinema and dedicated to bringing you a seamless streaming experience with a vast collection of content across all genres." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "Founded with the vision of making quality entertainment accessible to everyone, we continuously update our library with the latest releases, timeless classics, and hidden gems waiting to be discovered." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Our Mission" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: "Our mission is to provide a premium streaming platform that combines cutting-edge technology with an extensive content library. We believe that everyone deserves access to quality entertainment, and we're committed to delivering an exceptional viewing experience." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "What We Offer" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-lg border border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Extensive Library" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Thousands of movies and series across all genres, from action and drama to comedy and documentaries." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-lg border border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "High Quality" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Stream in HD and 4K quality for an immersive viewing experience on any device." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-lg border border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Regular Updates" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "New content added regularly, keeping you up to date with the latest releases and trending shows." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-lg border border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "User-Friendly" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Intuitive interface designed for easy navigation and discovery of your next favorite watch." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Join Our Community" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: "Become part of the Cineverse community and never miss out on the latest entertainment. Whether you're a casual viewer or a dedicated cinephile, we have something for everyone." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm italic", children: "Thank you for choosing Cineverse. Happy watching!" })
    ] })
  ] }) });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
function Contact({ title, description }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return /* @__PURE__ */ jsx(StaticPageLayout, { title, description, children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Get in Touch" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-8", children: "Have questions, suggestions, or feedback? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-white", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold mb-1", children: "Email" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "support@cineverse.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-white", children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold mb-1", children: "Address" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
              "123 Cinema Street",
              /* @__PURE__ */ jsx("br", {}),
              "Entertainment City, EC 12345"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-white", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold mb-1", children: "Business Hours" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
              "Monday - Friday: 9:00 AM - 6:00 PM",
              /* @__PURE__ */ jsx("br", {}),
              "Saturday - Sunday: Closed"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Send Us a Message" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "name",
              className: "block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "name",
              name: "name",
              value: formData.name,
              onChange: handleChange,
              required: true,
              className: "w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors",
              placeholder: "Your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "email",
              className: "block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
              required: true,
              className: "w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors",
              placeholder: "your.email@example.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "subject",
              className: "block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest",
              children: "Subject"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "subject",
              name: "subject",
              value: formData.subject,
              onChange: handleChange,
              required: true,
              className: "w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors",
              placeholder: "How can we help?"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "message",
              className: "block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest",
              children: "Message"
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "message",
              name: "message",
              value: formData.message,
              onChange: handleChange,
              required: true,
              rows: "6",
              className: "w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none",
              placeholder: "Your message here..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors",
            children: "Send Message"
          }
        )
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "border-b border-white/10", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick,
        className: "w-full py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors px-4",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white pr-8", children: question }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-6 h-6 text-white transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M19 9l-7 7-7-7"
                }
              )
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "px-4 pb-6 text-gray-300 leading-relaxed", children: answer })
  ] });
};
function FAQ({ title, description }) {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "What is Cineverse?",
      answer: "Cineverse is a comprehensive streaming platform that offers a vast collection of movies and series across all genres. We provide high-quality content with a user-friendly interface designed to enhance your viewing experience."
    },
    {
      question: "How do I watch content on Cineverse?",
      answer: "Simply browse our extensive library, select the movie or series you want to watch, and click the 'Watch Now' button. You can stream content directly in your browser without any additional downloads or plugins required."
    },
    {
      question: "Is there a subscription fee?",
      answer: "Please check our pricing page for current subscription options and plans. We offer various packages to suit different viewing needs and budgets."
    },
    {
      question: "What devices can I use to watch?",
      answer: "Cineverse is accessible on multiple devices including desktop computers, laptops, tablets, and smartphones. Our responsive design ensures a seamless experience across all screen sizes."
    },
    {
      question: "How often is new content added?",
      answer: "We regularly update our library with new movies and series. New content is added weekly, ensuring you always have fresh entertainment options to explore."
    },
    {
      question: "Can I download content for offline viewing?",
      answer: "Download availability depends on your subscription plan and content licensing agreements. Please check the specific title or your account settings for download options."
    },
    {
      question: "What video quality is available?",
      answer: "We offer multiple streaming qualities including SD, HD, and 4K where available. The quality can be adjusted based on your internet connection speed and device capabilities."
    },
    {
      question: "How do I report a technical issue?",
      answer: "If you encounter any technical issues, please visit our Contact page and fill out the support form with details about the problem. Our technical team will assist you as soon as possible."
    },
    {
      question: "Can I request specific titles?",
      answer: "Yes! We value user feedback and content requests. Please contact us through our Contact page with your suggestions, and we'll do our best to add requested titles to our library."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We take privacy and security seriously. All personal information is encrypted and stored securely. Please review our Privacy Policy for detailed information about how we protect your data."
    }
  ];
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsx(StaticPageLayout, { title, description, children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-4 border-b border-white/10 pb-4", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "Find answers to common questions about Cineverse. If you don't see your question here, feel free to contact us directly." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white/5 border border-white/10", children: faqs.map((faq, index) => /* @__PURE__ */ jsx(
      FAQItem,
      {
        question: faq.question,
        answer: faq.answer,
        isOpen: openIndex === index,
        onClick: () => toggleFAQ(index)
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 p-6 bg-white/5 border border-white/10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Still have questions?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "If you couldn't find the answer you were looking for, our support team is here to help." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/contact",
          className: "inline-block px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm",
          children: "Contact Support"
        }
      )
    ] })
  ] }) });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FAQ
}, Symbol.toStringTag, { value: "Module" }));
function Privacy({ title, description }) {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsx(StaticPageLayout, { title, description, children: /* @__PURE__ */ jsxs("div", { className: "prose prose-invert prose-lg max-w-none", children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mb-8", children: [
        /* @__PURE__ */ jsx("strong", { children: "Last Updated:" }),
        " November 30, 2025"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: "At Cineverse, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Information We Collect" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Personal Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "We collect information that you provide directly to us, including:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6", children: [
        /* @__PURE__ */ jsx("li", { children: "Name and email address when you create an account" }),
        /* @__PURE__ */ jsx("li", { children: "Payment information for subscription services" }),
        /* @__PURE__ */ jsx("li", { children: "Communication preferences and feedback" }),
        /* @__PURE__ */ jsx("li", { children: "Profile information and viewing preferences" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Usage Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "We automatically collect certain information about your device and how you interact with our platform:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Viewing history and watch time" }),
        /* @__PURE__ */ jsx("li", { children: "Search queries and content interactions" }),
        /* @__PURE__ */ jsx("li", { children: "Device information and IP address" }),
        /* @__PURE__ */ jsx("li", { children: "Browser type and operating system" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "How We Use Your Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "We use the collected information for various purposes:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsx("li", { children: "To provide and maintain our streaming service" }),
        /* @__PURE__ */ jsx("li", { children: "To personalize your viewing experience and recommend content" }),
        /* @__PURE__ */ jsx("li", { children: "To process your transactions and manage subscriptions" }),
        /* @__PURE__ */ jsx("li", { children: "To communicate with you about updates, promotions, and support" }),
        /* @__PURE__ */ jsx("li", { children: "To improve our platform and develop new features" }),
        /* @__PURE__ */ jsx("li", { children: "To detect, prevent, and address technical issues and security threats" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Information Sharing and Disclosure" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "We do not sell your personal information. We may share your information in the following circumstances:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Service Providers:" }),
          " With trusted third parties who assist in operating our platform"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Legal Requirements:" }),
          " When required by law or to protect our rights"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Business Transfers:" }),
          " In connection with mergers, acquisitions, or asset sales"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "With Your Consent:" }),
          " When you explicitly agree to share your information"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Data Security" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Encryption of data in transit and at rest" }),
        /* @__PURE__ */ jsx("li", { children: "Regular security assessments and updates" }),
        /* @__PURE__ */ jsx("li", { children: "Restricted access to personal information" }),
        /* @__PURE__ */ jsx("li", { children: "Secure payment processing systems" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Your Rights and Choices" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "You have certain rights regarding your personal information:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Access:" }),
          " Request access to your personal data"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Correction:" }),
          " Update or correct inaccurate information"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Deletion:" }),
          " Request deletion of your personal data"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Opt-out:" }),
          " Unsubscribe from marketing communications"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Data Portability:" }),
          " Request a copy of your data in a portable format"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Cookies and Tracking Technologies" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser preferences." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Children's Privacy" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Changes to This Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.' })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "Contact Us" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 border border-white/10", children: [
        /* @__PURE__ */ jsx("p", { className: "text-white", children: "Email: privacy@cineverse.com" }),
        /* @__PURE__ */ jsx("p", { className: "text-white", children: "Address: 123 Cinema Street, Entertainment City, EC 12345" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Privacy
}, Symbol.toStringTag, { value: "Module" }));
function Terms({ title, description }) {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsx(StaticPageLayout, { title, description, children: /* @__PURE__ */ jsxs("div", { className: "prose prose-invert prose-lg max-w-none", children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mb-8", children: [
        /* @__PURE__ */ jsx("strong", { children: "Last Updated:" }),
        " November 30, 2025"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: "Welcome to Cineverse. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "1. Acceptance of Terms" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "By creating an account or using Cineverse, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "2. User Accounts" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Account Creation" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "To access certain features, you must create an account. You agree to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6", children: [
        /* @__PURE__ */ jsx("li", { children: "Provide accurate and complete information" }),
        /* @__PURE__ */ jsx("li", { children: "Maintain the security of your account credentials" }),
        /* @__PURE__ */ jsx("li", { children: "Notify us immediately of any unauthorized use" }),
        /* @__PURE__ */ jsx("li", { children: "Be responsible for all activities under your account" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Age Restrictions" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "You must be at least 13 years old to use Cineverse. Users under 18 must have parental or guardian consent." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "3. Subscription and Payment" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "Subscription terms include:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Billing:" }),
          " Subscriptions are billed on a recurring basis"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Cancellation:" }),
          " You may cancel your subscription at any time"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Refunds:" }),
          " No refunds for partial subscription periods"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Price Changes:" }),
          " We reserve the right to modify pricing with advance notice"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Payment Methods:" }),
          " You must provide a valid payment method"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "4. Content and Usage" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "License to Use" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: "We grant you a limited, non-exclusive, non-transferable license to access and view content on Cineverse for personal, non-commercial use only." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Prohibited Activities" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "You agree not to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Download, copy, or redistribute content without authorization" }),
        /* @__PURE__ */ jsx("li", { children: "Use automated systems or bots to access the service" }),
        /* @__PURE__ */ jsx("li", { children: "Circumvent any security or access control measures" }),
        /* @__PURE__ */ jsx("li", { children: "Share account credentials with others" }),
        /* @__PURE__ */ jsx("li", { children: "Use the service for any illegal or unauthorized purpose" }),
        /* @__PURE__ */ jsx("li", { children: "Attempt to interfere with the proper functioning of the platform" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "5. Intellectual Property" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "All content on Cineverse, including but not limited to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6", children: [
        /* @__PURE__ */ jsx("li", { children: "Movies, series, and video content" }),
        /* @__PURE__ */ jsx("li", { children: "Graphics, logos, and design elements" }),
        /* @__PURE__ */ jsx("li", { children: "Text, software, and code" }),
        /* @__PURE__ */ jsx("li", { children: "Trademarks and service marks" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "are owned by or licensed to Cineverse and are protected by copyright, trademark, and other intellectual property laws." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "6. User Conduct" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "You agree to use Cineverse in a manner that:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-300 space-y-2 ml-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Complies with all applicable laws and regulations" }),
        /* @__PURE__ */ jsx("li", { children: "Respects the rights of other users and content creators" }),
        /* @__PURE__ */ jsx("li", { children: "Does not involve harassment, abuse, or hate speech" }),
        /* @__PURE__ */ jsx("li", { children: "Does not transmit viruses or malicious code" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "7. Termination" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "We reserve the right to suspend or terminate your account at any time, with or without notice, for conduct that violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason at our sole discretion." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "8. Disclaimers and Limitation of Liability" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Service Availability" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-6", children: 'We provide the service "as is" and make no warranties regarding availability, reliability, or quality. We do not guarantee uninterrupted or error-free service.' }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Limitation of Liability" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "To the fullest extent permitted by law, Cineverse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "9. Content Accuracy" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "While we strive to provide accurate content information, we do not guarantee the accuracy, completeness, or reliability of any content descriptions, metadata, or related information." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "10. Modifications to Terms" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes by posting the updated terms on this page. Your continued use of the service after such changes constitutes acceptance of the new terms." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "11. Governing Law" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: "These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Cineverse operates, without regard to its conflict of law provisions." })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4", children: "12. Contact Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed mb-4", children: "For questions about these Terms of Service, please contact us:" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 border border-white/10", children: [
        /* @__PURE__ */ jsx("p", { className: "text-white", children: "Email: legal@cineverse.com" }),
        /* @__PURE__ */ jsx("p", { className: "text-white", children: "Address: 123 Cinema Street, Entertainment City, EC 12345" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Terms
}, Symbol.toStringTag, { value: "Module" }));
function PersonShow({ person, movies, series, seo }) {
  const { t } = useTranslation();
  console.log(person);
  const [activeTab, setActiveTab] = useState("movies");
  const handlePageChange = (url, type) => {
    router.get(url, {}, { preserveState: true, preserveScroll: true });
  };
  const PaginationControls = ({ data, type }) => {
    if (!data.links || data.links.length <= 3) return null;
    useEffect(() => {
      const tg = window.Telegram?.WebApp;
      if (!tg) return;
      tg.BackButton.show();
      tg.onEvent("backButtonClicked", () => {
        const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
        router.visit(prevRoute);
      });
    }, []);
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center gap-2 mt-12", children: data.links.map((link, index) => {
      if (!link.url) {
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-4 py-2 text-gray-600 cursor-not-allowed",
            dangerouslySetInnerHTML: { __html: link.label }
          },
          index
        );
      }
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(link.url),
          className: `px-4 py-2 transition-colors ${link.active ? "bg-white text-black font-bold" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        index
      );
    }) });
  };
  return /* @__PURE__ */ jsx(LoadingLayout, { children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        type: "profile"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative h-[45vh] md:h-[60vh] w-full overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-orange-200 via-white to-red-200 dark:from-orange-900/30 dark:via-black dark:to-red-900/30", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pt-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 text-center", children: [
          person.avatar_url && /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: person.avatar_url,
              alt: person.name,
              className: "w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "inline-block px-3 py-1 border border-gray-800/30 dark:border-white/30 text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-white mb-4 backdrop-blur-sm", children: t("Filmography") }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-serif text-gray-800 dark:text-white leading-tight mb-4", children: person.name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto", children: t("{count} titles featuring this talent", { count: movies.total + series.total }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-2", children: [
        person.biography && /* @__PURE__ */ jsx("div", { className: "mb-2 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-3", children: t("Biography") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: person.biography })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-12 border-b border-gray-200 dark:border-white/10", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab("movies"),
              className: `px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${activeTab === "movies" ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
              children: [
                t(`Movies (${movies.total})`, { count: movies.total }),
                activeTab === "movies" && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab("series"),
              className: `px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${activeTab === "series" ? "text-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`,
              children: [
                t(`Series (${series.total})`, { count: series.total }),
                activeTab === "series" && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white" })
              ]
            }
          )
        ] }),
        activeTab === "movies" && /* @__PURE__ */ jsx("div", { children: movies.data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8", children: movies.data.map((movie) => /* @__PURE__ */ jsx(
            MediaCard,
            {
              item: movie,
              type: "movie"
            },
            movie.id
          )) }),
          /* @__PURE__ */ jsx(
            PaginationControls,
            {
              data: movies,
              type: "movies"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: t("No movies found featuring this person.") }) }) }),
        activeTab === "series" && /* @__PURE__ */ jsx("div", { children: series.data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8", children: series.data.map((item) => /* @__PURE__ */ jsx(
            MediaCard,
            {
              item,
              type: "series"
            },
            item.id
          )) }),
          /* @__PURE__ */ jsx(
            PaginationControls,
            {
              data: series,
              type: "series"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: t("No series found featuring this person.") }) }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] }) });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PersonShow
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const { t } = useTranslation();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-red-600 dark:text-red-500", children: t("Delete Account") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.") })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: t("Delete Account") }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6 bg-white dark:bg-gray-800", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-white", children: t("Are you sure you want to delete your account?") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.") }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: t("Password"),
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: t("Password")
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: t("Cancel") }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: t("Delete Account") })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const { t } = useTranslation();
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-white", children: t("Update Password") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("Ensure your account is using a long, random password to stay secure.") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "current_password",
            value: t("Current Password")
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.current_password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("New Password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: t("Confirm Password")
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("Save") }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: t("Saved.") })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const { t } = useTranslation();
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-white", children: t("Profile Information") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("Update your account's profile information and email address.") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t("Name") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t("Email") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800 dark:text-gray-200", children: [
          t("Your email address is unverified."),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
              children: t("Click here to re-send the verification email.")
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600 dark:text-green-400", children: t("A new verification link has been sent to your email address.") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("Save") }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: t("Saved.") })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ mustVerifyEmail, status }) {
  const { t, i18n } = useTranslation();
  const user = usePage().props.auth.user;
  const getInitials = (name) => {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Profile") }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "pt-24 pb-12 md:pt-32 md:pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br from-indigo-400/40 via-purple-900/40 to-black border border-gray-200 dark:border-white/10 p-8 md:p-12 dark:backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl hidden dark:block" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-indigo-100 rounded-full blur-3xl hidden dark:block" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 border-4 border-white dark:border-black/50", children: [
              user?.avatar_url && /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: user?.avatar_url,
                  alt: user?.name,
                  className: "w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20"
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl font-bold text-white tracking-wider", children: getInitials(user.name) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left space-y-2", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight", children: user.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center gap-2 md:gap-4 text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-4 h-4", children: [
                    /* @__PURE__ */ jsx("path", { d: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" }),
                    /* @__PURE__ */ jsx("path", { d: "M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: user.email })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-gray-400 dark:text-gray-600", children: "•" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-4 h-4", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z", clipRule: "evenodd" }) }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    t("Member since"),
                    " ",
                    user.created_at ? formatDate(user.created_at) : t("Recently")
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-wrap justify-center md:justify-start gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-indigo-100 dark:bg-white/5 border border-indigo-200 dark:border-white/10 text-xs font-medium text-indigo-800 dark:text-indigo-300", children: t("Free Plan") }),
                user.email_verified_at ? /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-xs font-medium text-green-800 dark:text-green-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-3 h-3", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }) }),
                  t("Verified")
                ] }) : /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-xs font-medium text-yellow-800 dark:text-yellow-400", children: t("Unverified") })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 border-b border-gray-200 dark:border-white/10 pb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif text-gray-900 dark:text-white", children: t("Account Settings") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-500 text-sm mt-1", children: t("Manage your profile details and security") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-2xl dark:backdrop-blur-sm", children: /* @__PURE__ */ jsx(
              UpdateProfileInformation,
              {
                mustVerifyEmail,
                status,
                className: "max-w-xl"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-2xl dark:backdrop-blur-sm", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "bg-red-100 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 p-6 md:p-8 rounded-2xl dark:backdrop-blur-sm", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Search({ results, query, seo }) {
  const { t } = useTranslation();
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: seo?.title,
        description: seo?.description
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-serif text-gray-800 dark:text-white mb-4", children: t("Search Results") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-lg", children: results.length > 0 ? t('Found {count} results for "{query}"', { count: results.length, query }) : t('No results found for "{query}"', { query }) })
        ] }),
        results.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8", children: results.map((item) => /* @__PURE__ */ jsx(
          MediaCard,
          {
            item,
            type: item.type
          },
          `${item.type}-${item.id}`
        )) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-gray-400 dark:text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-serif text-gray-800 dark:text-white mb-2", children: t("No matches found") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-500 max-w-md", children: t("We couldn't find any movies or series matching your search. Try checking for typos or using different keywords.") }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("home"),
              className: "mt-8 px-8 py-3 bg-gray-800 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors",
              children: t("Back to Home")
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Search
}, Symbol.toStringTag, { value: "Module" }));
const Pagination = ({ links }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10 mb-8 gap-2", children: links.map((link, index) => /* @__PURE__ */ jsx(
    Link,
    {
      href: link.url ? link.url : "#",
      className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${link.active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
      dangerouslySetInnerHTML: { __html: link.label },
      disabled: !link.url
    },
    index
  )) });
};
function Index({ series }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("Series") }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen py-16 bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black pb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 md:px-12", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 border-b border-gray-200 dark:border-white/10 pt-2", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-serif text-gray-800 dark:text-white", children: t("Series") }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 md:gap-x-4 gap-y-8", children: series.data.map((item) => /* @__PURE__ */ jsx(
          MediaCard,
          {
            item,
            type: "series"
          },
          item.id
        )) }),
        series.links && series.links.length > 3 && /* @__PURE__ */ jsx(Pagination, { links: series.links })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const PlayIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) });
const DownloadIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      }
    )
  }
);
const LinkItem = ({ link, type, isVip }) => {
  const { t } = useTranslation();
  const isLocked = link.is_vip_only && !isVip;
  const [copied, setCopied] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `group flex items-center justify-around py-3 border-b border-white/5 hover:bg-white/5 transition-colors px-2 ${isLocked ? "opacity-50" : ""}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-3 min-w-0", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col min-w-0", children: /* @__PURE__ */ jsx("span", { className: "dark:text-gray-300 font-serif text-sm leading-none truncate", children: link.server_name }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${type === "download" ? "border-blue-500 text-blue-500" : "border-red-500 text-red-500"}`,
            children: link.quality?.replace("p", "") || "HD"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: isLocked ? /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-yellow-500 border border-yellow-500 px-1 uppercase", children: t("VIP") }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `w-8 h-8 rounded-full flex items-center justify-center transition-all ${type === "download" ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-red-600 hover:bg-red-500 text-white"}`,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-3 h-3",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
                    clipRule: "evenodd"
                  }
                )
              }
            )
          }
        ) }) })
      ]
    }
  );
};
const EpisodeRow = ({ episode, isActive, onClick, isVip, isAuthenticated }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "border-b border-white/10 last:border-0", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick,
        className: `w-full flex items-center justify-between p-4 text-left transition-colors ${isActive ? "bg-white/10" : "hover:bg-white/5"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-mono text-sm w-6", children: episode.episode_number.toString().padStart(2, "0") }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "h4",
                {
                  className: `font-serif text-lg leading-none ${isActive ? "dark:text-white" : "dark:text-gray-300"}`,
                  children: episode.title
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs dark:text-gray-600 mt-1 block", children: episode.air_date ? new Date(
                episode.air_date
              ).toLocaleDateString() : t("Unknown Date") })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transform transition-transform ${isActive ? "rotate-180" : ""}`,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5 text-gray-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M19 9l-7 7-7-7"
                    }
                  )
                }
              )
            }
          )
        ]
      }
    ),
    isActive && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-black/20 animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [
        episode.poster_url && /* @__PURE__ */ jsx("div", { className: "w-full md:w-32 aspect-video rounded overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: episode.poster_url,
            alt: "",
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm dark:text-gray-400 leading-relaxed font-serif", children: episode.description || t("No synopsis available for this episode.") })
      ] }),
      isAuthenticated ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h5", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(PlayIcon, { className: "w-3 h-3" }),
            " ",
            t("Stream")
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: episode.watch_links && episode.watch_links.length > 0 ? episode.watch_links.map((link) => /* @__PURE__ */ jsx(
            LinkItem,
            {
              link,
              type: "watch",
              isVip
            },
            link.id
          )) : /* @__PURE__ */ jsx("div", { className: "text-gray-600 text-xs italic", children: t("No sources.") }) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `${episode.download_links && episode.download_links.length > 0 ? "" : "hidden"}`,
            children: [
              /* @__PURE__ */ jsxs("h5", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(DownloadIcon, { className: "w-3 h-3" }),
                " ",
                t("Download")
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: episode.download_links && episode.download_links.length > 0 ? episode.download_links.map((link) => /* @__PURE__ */ jsx(
                LinkItem,
                {
                  link,
                  type: "download",
                  isVip
                },
                link.id
              )) : /* @__PURE__ */ jsx("div", { className: "text-gray-600 text-xs italic", children: t("No sources.") }) })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "p-4 border border-white/10 rounded bg-white/5 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: t("Please log in to access episode links.") }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: route("login"),
            className: "inline-block px-4 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors",
            children: t("Log In")
          }
        )
      ] })
    ] })
  ] });
};
const TrailerModal = ({ url, onClose }) => {
  if (!url) return null;
  const videoId = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )?.[1];
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  if (!embedUrl) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-fade-in",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-6 right-6 text-white/50 hover:text-white transition-colors",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-10 h-10",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1,
                    d: "M6 18L18 6M6 6l12 12"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-full max-w-6xl aspect-video bg-black shadow-2xl", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: embedUrl,
            className: "w-full h-full",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        ) })
      ]
    }
  );
};
function SeriesDetails({
  series,
  relatedSeries,
  userRating,
  isVip,
  seo
}) {
  const { t } = useTranslation();
  const { auth } = usePage().props;
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeSeason, setActiveSeason] = useState(
    series.seasons?.[series.seasons?.length - 1] || null
  );
  const [expandedEpisodeId, setExpandedEpisodeId] = useState(null);
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
      router.visit(prevRoute);
    });
  }, []);
  useEffect(() => {
    if (activeSeason && activeSeason.episodes?.length > 0) {
      setExpandedEpisodeId(
        activeSeason.episodes[activeSeason.episodes.length - 1].id
      );
    }
  }, [activeSeason]);
  const scrollToEpisodes = () => {
    document.getElementById("episodes-section")?.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        url: seo?.url,
        image: seo?.image,
        type: seo?.type,
        structuredData: seo?.structuredData
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0e17] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full min-h-[85vh] md:min-h-[100vh] flex items-end pb-12 md:pb-24 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: series.banner_url || series.poster_url,
              alt: series.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0a0e17] via-gray-50/60 dark:via-[#0a0e17]/60 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-[#0a0e17] via-gray-50/40 dark:via-[#0a0e17]/40 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/10 dark:bg-black/20" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 container-custom w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-64 lg:w-72 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 transform hover:scale-105 transition-transform duration-500", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: series.poster_url,
              alt: series.title,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full text-center md:text-left", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 animate-slide-up", style: { animationDelay: "0.1s" }, children: [
              /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-2 font-serif leading-tight drop-shadow-lg", children: series.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center md:justify-start gap-3 text-lg md:text-xl text-gray-500 dark:text-gray-400 font-serif italic", children: [
                /* @__PURE__ */ jsx("span", { children: series.release_year_start }),
                series.release_year_end && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("span", { children: "-" }),
                  /* @__PURE__ */ jsx("span", { children: series.release_year_end })
                ] }),
                !series.release_year_end && /* @__PURE__ */ jsx("span", { children: "- Present" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mb-8 text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 animate-slide-up", style: { animationDelay: "0.2s" }, children: [
              series.rating_average > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-yellow-500 dark:text-yellow-400", children: [
                /* @__PURE__ */ jsx("span", { children: "★" }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-white", children: series.rating_average })
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                series.seasons?.length,
                " ",
                t("Seasons")
              ] }),
              series.age_rating && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 border border-gray-300 dark:border-white/20 rounded text-xs uppercase tracking-wider bg-gray-200 dark:bg-white/5", children: series.age_rating }),
              series.country && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: series.country })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center md:justify-start gap-2 mb-8 animate-slide-up", style: { animationDelay: "0.3s" }, children: series.genres?.map((genre) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "genre-pill",
                children: genre.name
              },
              genre.id
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center md:justify-start gap-4 animate-slide-up", style: { animationDelay: "0.4s" }, children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: scrollToEpisodes,
                  className: "btn-primary group",
                  children: [
                    /* @__PURE__ */ jsx(PlayIcon, { className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform" }),
                    t("Watch Episodes")
                  ]
                }
              ),
              series.trailer_url && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setShowTrailer(true),
                  className: "btn-secondary group",
                  children: [
                    /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
                    ] }),
                    t("Trailer")
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "container-custom py-12 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-[2px] bg-blue-500" }),
              t("Storyline")
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed opacity-90", children: series.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "episodes-section", className: "mb-16 scroll-mt-24", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-serif text-gray-900 dark:text-white flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(PlayIcon, { className: "w-6 h-6 text-blue-500" }),
                t("Episode Guide")
              ] }),
              series.is_vip_only && /* @__PURE__ */ jsx("span", { className: "badge-vip", children: t("VIP ACCESS") })
            ] }),
            series.seasons && series.seasons.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "glass-card-adaptive overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto p-4 gap-2 border-b border-gray-200 dark:border-white/5 custom-scrollbar bg-gray-100 dark:bg-black/20", children: series.seasons.slice().reverse().map((season) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveSeason(season),
                  className: `whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${activeSeason?.id === season.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"}`,
                  children: t("Season {season_number}", { season_number: season.season_number })
                },
                season.id
              )) }),
              /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200 dark:divide-white/5", children: activeSeason?.episodes && activeSeason.episodes.length > 0 ? activeSeason.episodes.slice().reverse().map((episode) => /* @__PURE__ */ jsx(
                EpisodeRow,
                {
                  episode,
                  isActive: expandedEpisodeId === episode.id,
                  onClick: () => setExpandedEpisodeId(expandedEpisodeId === episode.id ? null : episode.id),
                  isVip,
                  isAuthenticated: !!auth.user
                },
                episode.id
              )) : /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-gray-500 italic", children: t("No episodes available for this season.") }) })
            ] }) : /* @__PURE__ */ jsx("div", { className: "text-gray-500 italic p-8 border border-gray-200 dark:border-white/10 rounded-lg text-center", children: t("No seasons available.") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-[2px] bg-blue-500" }),
              t("Top Cast")
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6", children: series.actors?.slice(0, 8).map((actor) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("person.show", actor.person?.id),
                className: "group block",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-200 dark:bg-gray-800", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: actor.person?.avatar_url || "/images/placeholder-avatar.jpg",
                      alt: actor.person?.name,
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("h4", { className: "text-gray-900 dark:text-white font-medium truncate group-hover:text-blue-400 transition-colors", children: actor.person?.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 truncate", children: actor.character_name })
                ]
              },
              actor.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 flex-shrink-0 space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass-card-adaptive p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center", children: t("Rate this Series") }),
            auth.user ? /* @__PURE__ */ jsx(
              RatingWidget,
              {
                ratingAverage: series.rating_average || 0,
                ratingCount: series.rating_count || 0,
                userRating,
                onRate: (rating) => {
                  if (userRating) {
                    router.put(route("admin.ratings.update", userRating.id), { rating }, { preserveScroll: true });
                  } else {
                    router.post(route("admin.ratings.store"), { series_id: series.id, rating }, { preserveScroll: true });
                  }
                }
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx("a", { href: route("login"), className: "text-blue-400 hover:underline", children: t("Log in") }),
              " ",
              t("to rate.")
            ] })
          ] }),
          relatedSeries && relatedSeries.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-l-4 border-blue-500 pl-3", children: t("You May Also Like") }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: relatedSeries.slice(0, 6).map((rel) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: route("series.show", rel.slug),
                className: "group block",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "aspect-[2/3] rounded-lg overflow-hidden mb-2 relative", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: rel.poster_url,
                        alt: rel.title,
                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" })
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "text-sm text-gray-600 dark:text-gray-300 font-medium truncate group-hover:text-blue-600 dark:group-hover:text-white transition-colors", children: rel.title }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { children: rel.release_year_start }),
                    /* @__PURE__ */ jsxs("span", { className: "text-yellow-500", children: [
                      "★ ",
                      rel.rating_average
                    ] })
                  ] })
                ]
              },
              rel.id
            )) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }),
    showTrailer && /* @__PURE__ */ jsx(
      TrailerModal,
      {
        url: series.trailer_url,
        onClose: () => setShowTrailer(false)
      }
    )
  ] });
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SeriesDetails
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 text-black/50 dark:bg-black dark:text-white/50", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          id: "background",
          className: "absolute -left-20 top-0 max-w-[877px]",
          src: "https://laravel.com/assets/img/welcome/background.svg"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl px-6 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("header", { className: "grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex lg:col-start-2 lg:justify-center", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]",
              viewBox: "0 0 62 65",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                  fill: "currentColor"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "-mx-3 flex flex-1 justify-end", children: auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
              children: "Dashboard"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Log in"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Register"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel.com/docs",
              id: "docs-card",
              className: "flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    id: "screenshot-container",
                    className: "relative flex w-full flex-1 items-stretch",
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-light.svg",
                          alt: "Laravel documentation screenshot",
                          className: "aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden",
                          onError: handleImageError
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-dark.svg",
                          alt: "Laravel documentation screenshot",
                          className: "hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-6 lg:items-end", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      id: "docs-card-content",
                      className: "flex items-start gap-6 lg:flex-col",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            className: "size-5 sm:size-6",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5 lg:pt-0", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Documentation" }),
                          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "size-6 shrink-0 stroke-[#FF2D20]",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laracasts.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" }) })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel-news.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsxs("g", { fill: "#FF2D20", children: [
                      /* @__PURE__ */ jsx("path", { d: "M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" })
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800", children: [
            /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "size-5 sm:size-6",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" }) })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Vibrant Ecosystem" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm/relaxed", children: [
                "Laravel's robust library of first-party tools and libraries, such as",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://forge.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white dark:focus-visible:ring-[#FF2D20]",
                    children: "Forge"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://vapor.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Vapor"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://nova.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Nova"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://envoyer.io",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Envoyer"
                  }
                ),
                ", and",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://herd.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Herd"
                  }
                ),
                " ",
                "help you take your projects to the next level. Pair them with powerful open source libraries like",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/billing",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Cashier"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/dusk",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Dusk"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/broadcasting",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Echo"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/horizon",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Horizon"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/sanctum",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Sanctum"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/telescope",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Telescope"
                  }
                ),
                ", and more."
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("footer", { className: "py-16 text-center text-sm text-black dark:text-white/70", children: [
          "Laravel v",
          laravelVersion,
          " (PHP v",
          phpVersion,
          ")"
        ] })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({
        "./Pages/Admin/Dashboard.jsx": __vite_glob_0_0,
        "./Pages/Admin/GenreForm.jsx": __vite_glob_0_1,
        "./Pages/Admin/Genres.jsx": __vite_glob_0_2,
        "./Pages/Admin/MovieForm.jsx": __vite_glob_0_3,
        "./Pages/Admin/Movies.jsx": __vite_glob_0_4,
        "./Pages/Admin/PersonForm.jsx": __vite_glob_0_5,
        "./Pages/Admin/Persons.jsx": __vite_glob_0_6,
        "./Pages/Admin/SeasonForm.jsx": __vite_glob_0_7,
        "./Pages/Admin/Seasons.jsx": __vite_glob_0_8,
        "./Pages/Admin/Series.jsx": __vite_glob_0_9,
        "./Pages/Admin/SeriesForm.jsx": __vite_glob_0_10,
        "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_11,
        "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_12,
        "./Pages/Auth/Login.jsx": __vite_glob_0_13,
        "./Pages/Auth/Register.jsx": __vite_glob_0_14,
        "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_15,
        "./Pages/Auth/TgAuth.jsx": __vite_glob_0_16,
        "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_17,
        "./Pages/Genre/Show.jsx": __vite_glob_0_18,
        "./Pages/Home.jsx": __vite_glob_0_19,
        "./Pages/MovieDetails.jsx": __vite_glob_0_20,
        "./Pages/Movies/Index.jsx": __vite_glob_0_21,
        "./Pages/Pages/About.jsx": __vite_glob_0_22,
        "./Pages/Pages/Contact.jsx": __vite_glob_0_23,
        "./Pages/Pages/FAQ.jsx": __vite_glob_0_24,
        "./Pages/Pages/Privacy.jsx": __vite_glob_0_25,
        "./Pages/Pages/Terms.jsx": __vite_glob_0_26,
        "./Pages/Person/Show.jsx": __vite_glob_0_27,
        "./Pages/Profile/Edit.jsx": __vite_glob_0_28,
        "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_29,
        "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_30,
        "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_31,
        "./Pages/Search.jsx": __vite_glob_0_32,
        "./Pages/Series/Index.jsx": __vite_glob_0_33,
        "./Pages/SeriesDetails.jsx": __vite_glob_0_34,
        "./Pages/Welcome.jsx": __vite_glob_0_35
      });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  }),
  { cluster: true }
);
