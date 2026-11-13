<?php
declare(strict_types=1);

// XAMPP defaults. Set environment variables in production instead of committing secrets.
const DB_HOST = '127.0.0.1';
const DB_NAME = 'sollo_security';
const DB_USER = 'root';
const DB_PASS = '';
const VIRUSTOTAL_API_KEY = '';

function db(): PDO
{
    static $pdo;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    return $pdo;
}
