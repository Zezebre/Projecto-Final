CREATE DATABASE IF NOT EXISTS Fotos;
USE Fotos;
 
DROP TABLE IF EXISTS fotos;
 
CREATE TABLE Mar (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  titulo    VARCHAR(255)  NOT NULL,
  favorita  BOOLEAN       DEFAULT FALSE
);

CREATE TABLE Arquitectura (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  titulo    VARCHAR(255)  NOT NULL,
  favorita  BOOLEAN       DEFAULT FALSE
);

CREATE TABLE Cercas (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  titulo    VARCHAR(255)  NOT NULL,
  favorita  BOOLEAN       DEFAULT FALSE
);
 
INSERT INTO Mar (titulo,favorita) VALUES
('Mar1', TRUE),
('Mar2', FALSE),
('Mar3', FALSE);

INSERT INTO Arquitectura (titulo,favorita) VALUES
('Euston', TRUE),
('Church Pump', FALSE),
('Squares', FALSE),
('Pigeon', TRUE),
('Box', FALSE),
('House', TRUE),
('Moorfields', TRUE),
('Barbica', FALSE),
('Wooden', FALSE);

INSERT INTO Cercas (titulo,favorita) VALUES
('37', TRUE),
('75', FALSE),
('26', FALSE),
('68', TRUE),
('09', FALSE),
('026', TRUE),
('41', TRUE),
('23', FALSE),
('35', FALSE);musica