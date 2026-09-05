import { findUser, statusLabel, type User, type Order } from "./domain.js";

const users: User[] = [
    {id: "u1", email: "coba@gmail.com", profile: {displayName: "Coba", bio: "Bubur diaduk"}},
];

export function bug1(user: User): string {
    return user.email;
}

export function bug2(): string {
    const user = findUser(users, "u99");
    return user?.email ?? "not found";
  }
  
export function bug3(user: User): number {
    return user.profile?.bio?.length ?? 0;
}

export function bug4(): string {
    return statusLabel("paid");
}

type UserId = string & { readonly __brand: "UserId" };
type ProductId = string & { readonly __brand: "ProductId" };

export function makeOrder(userId: UserId, productId: ProductId): string {
    return `${userId}-${productId}`;
}

export function bug5(): string {
    const userId = "u1" as UserId;
    const productId = "p1" as ProductId;
    return makeOrder(userId, productId);
}
export const bad: number = "ini string";
