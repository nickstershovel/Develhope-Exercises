declare global {
    namespace Express {
        interface user {
            username: string;
        }
    }
}


declare module "express-session" {
    interface SessionData {
        redirectTo: string;
    }
}

export {};
