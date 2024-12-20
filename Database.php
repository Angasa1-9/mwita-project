<?php

class Database {
    private static $instance = null;
    private $connection;
    
    // Load configuration from .env file or use default values
    private $host;
    private $username;
    private $password;
    private $database;
    
    private function __construct() {
        // Load environment variables from .env file
        $this->loadEnvironmentVars();
        
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->database};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ];
            
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch(PDOException $e) {
            // Log error and show user-friendly message
            error_log("Connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed. Please try again later.");
        }
    }
    
    private function loadEnvironmentVars() {
        // Check if .env file exists
        $envFile = __DIR__ . '/.env';
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos($line, '=') !== false) {
                    list($key, $value) = explode('=', $line, 2);
                    $key = trim($key);
                    $value = trim($value);
                    
                    switch ($key) {
                        case 'DB_HOST':
                            $this->host = $value;
                            break;
                        case 'DB_USER':
                            $this->username = $value;
                            break;
                        case 'DB_PASS':
                            $this->password = $value;
                            break;
                        case 'DB_NAME':
                            $this->database = $value;
                            break;
                    }
                }
            }
        }
        
        // Set default values if not found in .env
        $this->host = $this->host ?? 'localhost';
        $this->username = $this->username ?? 'root';
        $this->password = $this->password ?? '';
        $this->database = $this->database ?? 'crypto_trading';
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    // Prevent cloning of the instance
    private function __clone() {}
    
    // Prevent unserializing of the instance
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
    
    // Helper method for queries
    public function query($sql, $params = []) {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch(PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            throw new Exception("Database query failed. Please try again later.");
        }
    }
}

// Example usage with error handling:
try {
    $db = Database::getInstance();
    
    // Example query with parameters
    $email = "user@example.com";
    $stmt = $db->query("SELECT * FROM users WHERE email = ?", [$email]);
    $user = $stmt->fetch();
    
    if ($user) {
        // User found
        echo "Welcome, " . htmlspecialchars($user['username']);
    } else {
        // User not found
        echo "User not found";
    }
    
} catch(Exception $e) {
    // Handle any errors
    echo "Error: " . $e->getMessage();
} 