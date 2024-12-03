import { loginUser, registerUser } from "../Controller/users.controller.js";

export const userRoutes = (app) => {
    // ------------ Create new User ------------
    app.post("/api/register", registerUser);
    // ------------ Verify User ------------
    app.post("/api/login", loginUser)
}

export default userRoutes