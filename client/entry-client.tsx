import "virtual:windi.css";
import { hydrate } from "preact";

import App from "./App";

hydrate(<App />, document.getElementById("app"));
