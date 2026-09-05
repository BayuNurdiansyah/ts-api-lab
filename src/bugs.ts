import { findUser, statusLabel, type User } from "./domain.js";

type UserId = string & { readonly __brand: "UserId" };
type ProductId = string & { readonly __brand: "ProductId" };

const users: User[] = [
    { id: "u1", email: "a@example.com", profile: { displayName: "Bayu Nurdiansyah", bio: "Bubur diaduk" } },
];

// fix 1: property yang benar
export function bug1(user: User): string {
    return user.email;
}

// fix 2: cek undefined sebelum akses
export function bug2(): string {
    const user = findUser(users, "u99");
    return user?.email ?? "not found";
}

// fix 3: optional chaining
export function bug3(user: User): number {
    return user.profile?.bio?.length ?? 0;
}

// fix 4: value yang valid
export function bug4(): string {
    return statusLabel("pending");
}

// fix 5: branded type bikin dua parameter jadi tipe beda
export function makeOrder(userId: UserId, productId: ProductId): string {
    return `${userId}-${productId}`;
}

export function bug5(): string {
    const userId = "u1" as UserId;
    const productId = "p1" as ProductId;
    return makeOrder(userId, productId);
}