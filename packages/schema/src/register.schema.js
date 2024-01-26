"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
var z = require("zod");
exports.registerSchema = z
    .object({
    email: z.string().email({ message: 'This is not a valid email' }),
    password: z
        .string()
        .min(8, { message: 'Must contains at least 8 characters' })
        .max(64, { message: 'Must contains 64 or less characters' })
        .trim()
        .refine(function (value) { return /\w*[a-z]\w*/.test(value); }, {
        message: 'Must at least contains one lowercase character',
    })
        .refine(function (value) { return /\w*[A-Z]\w*/.test(value); }, {
        message: 'Must at least contains one uppercase character',
    })
        .refine(function (value) { return /\d/.test(value); }, {
        message: 'Must at least contains one number',
    })
        .refine(function (value) { return /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value); }, {
        message: 'Must at least contains one special character',
    }),
    confirmedPassword: z.string(),
})
    .refine(function (data) { return data.password === data.confirmedPassword; }, {
    message: "Password doesn't match",
    path: ['confirm'],
});
