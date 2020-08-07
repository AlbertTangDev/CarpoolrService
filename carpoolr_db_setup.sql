DROP DATABASE IF EXISTS carpoolr;
CREATE DATABASE carpoolr;
USE carpoolr;

CREATE TABLE users
(
	guid CHAR(36) PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
	password_hash CHAR(60) NOT NULL
);
CREATE TABLE trips
(
	guid CHAR(36) PRIMARY KEY,
	owner CHAR(36) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    accessed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE riders
(
	-- guid CHAR(36) PRIMARY KEY,
    
    trip CHAR(36) NOT NULL,
    -- associated_user CHAR(38),
    associated_user_name VARCHAR(5),
    
    display_name VARCHAR(50) NOT NULL UNIQUE,
    
    -- vehicle CHAR (38)
    vehicle_name VARCHAR(50)
);
CREATE TABLE vehicles
(
	-- guid char(36) PRIMARY KEY,
    
    -- associated_rider CHAR(36) NOT NULL,
    associated_rider_name VARCHAR(50) NOT NULL,
    
    -- trip CHAR(36) NOT NULL,
    trip_name VARCHAR(50) NOT NULL,
    
    display_name VARCHAR(50) NOT NULL UNIQUE,
    available_spaces INT NOT NULL,
    occupied_spaces INT NOT NULL
);

INSERT INTO users (guid, first_name, last_name, email, password_hash) VALUES (
	'570fdde3-4d6b-4070-8fb3-72db758109b0',
    'Albert',
    'Tang',
    'atang@bluebeam.com',
    '$2b$10$opfN756Y9lt2.pwBDGVIMuISZ9s62B94pe6O6rgZk2VXHHseckNz.'
);