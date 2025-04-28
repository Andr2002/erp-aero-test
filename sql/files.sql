CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    extension VARCHAR(50),
    mimetype VARCHAR(100),
    size INT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);