"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
var z = require("zod");
exports.loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});
