import bcrypt from 'bcryptjs';
import client from "./client";

export interface User {
    email: string;
    password: string;
}

export async function loginMess(userData: User) {
    try {
        // Check if user exists
        const user = await client.fetch(
            `*[_type == "mess" && email == $email][0]`,
            { email: userData.email }
        );

        if (!user) {
            return new Error("Invalid email or password");
        }

        // Compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);

        if (!isPasswordValid) {
            return new Error("Invalid email or password");
        }

        // Return user data without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;

    } catch (error) {
        console.error("Error logging in:", error);
        return new Error("Error logging in");
    }
}
