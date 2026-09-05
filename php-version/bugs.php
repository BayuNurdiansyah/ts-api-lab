<?php
require_once __DIR__ . '/domain.php';

/** @return User[] */
function seedUsers(): array
{
    return [new User('u1', 'coba@gmail.com', new Profile('coba'))];
}

// wrong properties
function bug1(User $user): string {
    return $user->emailAddress;
}

// return value without nullcheck
function bug2(): string {
    $user = findUser(seedUsers(), 'u99');
    return $user->email;
}

// skip nullcheck
function bug3(User $user): int {
    return strlen($user->profile->bio);
}

// invalid value
function bug4(): string {
    return statusLabel('refunded');
}

// bug 5 wrong placement
function makeOrder(string $userId, string $productId): string {
    return "$userId-$productId";
}
function bug5(): string {
    $userId = 'u1';
    $productId = 'p1';
    return makeOrder($productId, $userId);
}