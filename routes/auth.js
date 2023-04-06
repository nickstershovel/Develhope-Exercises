"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/login", (request, response, next) => {
    if (typeof request.query.redirectTo !== "string" ||
        !request.query.redirectTo) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }
    request.session.redirectTo = request.query.redirectTo;
    response.redirect("/auth/github/login");
});
router.get("/github/login", passport_1.default.authenticate("github", {
    scope: ["user:email"],
}));
router.get("/github/callback", passport_1.default.authenticate("github", {
    failureRedirect: "/auth/github/login",
    keepSessionInfo: true,
}), (request, response) => {
    if (typeof request.session.redirectTo !== "string") {
        return response.status(500).end();
    }
    response.redirect(request.session.redirectTo);
});
router.get("/logout", (request, response, next) => {
    if (typeof request.query.redirectTo !== "string" ||
        !request.query.redirectTo) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }
    const redirectUrl = request.query.redirectTo;
    request.logout((error) => {
        if (error) {
            return next(error);
        }
        response.redirect(redirectUrl);
    });
});
exports.default = router;
