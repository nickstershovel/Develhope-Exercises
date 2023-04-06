"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_github2_1 = __importDefault(require("passport-github2"));
const config_1 = __importDefault(require("../validation/config"));
const gitHubStrategy = new passport_github2_1.default.Strategy({
    clientID: config_1.default.GITHUB_CLIENT_ID,
    clientSecret: config_1.default.GITHUB_CLIENT_SECRET,
    callbackURL: config_1.default.GITHUB_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    const user = {
        username: profile.username,
    };
    done(null, user);
});
passport_1.default.use(gitHubStrategy);
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
const checkAuthorization = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    }
    response.status(401).end();
};
exports.checkAuthorization = checkAuthorization;
