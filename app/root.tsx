import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import reset from "~/styles/reset.css";
import main from "~/styles/main.css";
import utils from "~/styles/utils.css";
import button from "~/styles/button.css";
import clock from "~/styles/clock.css";
import loader from "~/styles/loader.css";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: reset,
    },
    {
      rel: "stylesheet",
      href: main,
    },
    {
      rel: "stylesheet",
      href: utils,
    },
    {
      rel: "stylesheet",
      href: button,
    },
    {
      rel: "stylesheet",
      href: loader,
    },
    {
      rel: "stylesheet",
      href: clock,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
