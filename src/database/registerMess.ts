import bcrypt from 'bcryptjs';
import client from "./client";

export interface User {
    email: string;
    password: string;
    messName: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export async function registerMess(userData: User) {
    try {
        // Check if user already exists
        const existingUser = await client.fetch(
            `*[_type == "mess" && email == $email][0]`,
            { email: userData.email }
        );

        if (existingUser) {
            return new Error("User with this email already exists");
        }

        // Hash the password using bcrypt
        const hashPassword = async (password: string) => {
            const saltRounds = 10; // The cost factor for hashing (higher means more secure but slower)
            try {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                console.log("Hashed password:", hashedPassword);
                return hashedPassword;
            } catch (error) {
                console.error("Error hashing password:", error);
            }
        };

        const hashedPassword = await hashPassword(userData.password);

        // Create new user document
        const result = await client.create({
            _type: "mess",
            email: userData.email,
            password: hashedPassword,
            messName: userData.messName,
            ownerFirstName: userData.firstName,
            ownerLastName: userData.lastName,
            phone: userData.phone,
            createdAt: new Date().toISOString()
        });

        return result;

    } catch (error) {
        console.error("Error registering user:", error);
        return { error: "Error registering user" };
    }
}
