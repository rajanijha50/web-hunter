export interface UserType {
    name: string;
    email: string;
    password?: string;
    role: "user" | "admin";
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}