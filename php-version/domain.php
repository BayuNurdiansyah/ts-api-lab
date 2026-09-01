<?php
enum OrderStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
    case Cancelled = 'cancelled';
}

class Profile 
{
    public function __construct(
        public string $displayName,
        public ?string $bio = null,
    ) {}
}

class User
{
    public function __construct(
        public string $id,
        public string $email,
        public ?Profile $profile,
    ) {}
}

class Order
{
    public function __construct(
        public string $id,
        public string $userId,
        public OrderStatus $orderStatus,
        public float $total,
    ){}
}

/**
 * @param User[] $users
 */
function findUser(array $users, string $id): ?User
{
    foreach($users as $user) {
        if($user->id === $id)  {
            return $user;
        }
    }
    return null;
}

function statusLabel(OrderStatus $status): string{
    return match($status) {
        OrderStatus::Pending => "Menunggu pembayaran",
        OrderStatus::Paid => "Sudah dibayar",
        OrderStatus::Shipped => "Dikirim",
        OrderStatus::Cancelled => "Dibatalkan",
    };
}


?>