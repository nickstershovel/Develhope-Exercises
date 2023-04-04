import session from "express-session";

import config from "../validation/config";

export function initSessionMiddleware() {
    return session({
        secret: config.SESSION_SECRET,
        resave: false,
		saveUninitialized: false,
    });
}
