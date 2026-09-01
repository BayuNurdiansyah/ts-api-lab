export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled"

export interface User {
    id: string;
    email: string;
    profile?: {
        displayName: string;
        bio?: string;
    };
}

export interface Order {
    id: string;
    userId: string;
    orderStatus: OrderStatus;
    total: number;
}

export function findUser(users: User[], id: string): User | undefined {
    return users.find((u) => u.id === id);
}


export function statusLabel(status: OrderStatus): string {
    switch (status) {
        case "pending":
            return "Menunggu pembayaran";
        case "paid":
            return "Sudah dibayar";
        case "shipped":
            return "Dikirim";
        case "cancelled":
            return "Dibatalkan";
    }
}