<?php
require_once __DIR__ . '/domain.php';

/** @return User[] */
function seedUsers(): array
{
    return [new User('u1', 'a@example.com', new Profile('Bayu Nurdiansyah'))];
}

// fix 1: property yang benar
function bug1(User $user): string {
    return $user->email;
}

// fix 2: null check sebelum akses property
function bug2(): string {
    $user = findUser(seedUsers(), 'u99');
    return $user->email ?? 'not found';
}

// fix 3: null check berantai
function bug3(User $user): int {
    return strlen($user->profile->bio ?? '');
}

// fix 4: pakai enum, bukan string bebas
function bug4(): string {
    return statusLabel(OrderStatus::Pending);
}

// fix 5: value object bikin dua parameter jadi tipe beda
function makeOrder(UserId $userId, ProductId $productId): string {
    return "{$userId->value}-{$productId->value}";
}

function bug5(): string {
    $userId = new UserId('u1');
    $productId = new ProductId('p1');
    return makeOrder($userId, $productId);
}