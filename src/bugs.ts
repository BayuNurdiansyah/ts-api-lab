import { findUser, statusLabel, type User, type Order } from "./domain.js";

const users: User[] = [
    {id: "u1", email: "coba@gmail.com", profile: {displayName: "Coba", bio: "Bubur diaduk"}},
];

// wrong properties
export function bug1(user: User): string {
    return user.emailAddress;
}

// find user without check the undefined value
export function bug2(): string {
    const user = findUser(users, "u099");
    return user.email;
}

// skip optional chaining "?"
export function bug3(user: User): number {
    return user.profile.bio.length;
}

// wrong status value
export function bug4(): string {
    return statusLabel("refunded");
}


export function makeOrder(userId: string, productId: string): string{
    return `${userId}-${productId}`
}

// bug 5 wrong place argument 
export function bug5(): string {
    const userId = "u1";
    const productId = "p1";
    return makeOrder(productId, userId);
}
