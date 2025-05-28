CREATE DATABASE conectapet_db;

USE conectapet_db;

CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'guardian') NOT NULL
);

CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  imagem TEXT,
  nome VARCHAR(50) NOT NULL,
  idade VARCHAR(20),
  tipo ENUM('cachorro', 'gato') NOT NULL,
  responsavel VARCHAR(100),
  guardianId CHAR(36),
  sexo ENUM('macho', 'fêmea'),
  porte ENUM('pequeno', 'médio', 'grande'),
  status ENUM('Coração livre!', 'Quase lá!', 'Final feliz!'),
  descricao TEXT,
  castrado ENUM('sim', 'não'),
  vacinado ENUM('sim', 'não'),
  observacoes TEXT,
  FOREIGN KEY (guardianId) REFERENCES users(id)
);

CREATE TABLE adoptions (
  id CHAR(36) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  dataN DATE,
  cpf CHAR(11),
  ec ENUM('solteiro', 'casado', 'divorciado', 'viúvo'),
  profissao VARCHAR(100),
  cel VARCHAR(15),
  cep CHAR(9),
  rua VARCHAR(100),
  bairro VARCHAR(100),
  numero VARCHAR(10),
  cidade VARCHAR(100),
  custos ENUM('sim', 'não'),
  compromisso ENUM('sim', 'não'),
  visitas ENUM('sim', 'não'),
  motivacao TEXT,
  userId CHAR(36),
  petId INT,
  petName VARCHAR(50),
  guardianId CHAR(36),
  guardianName VARCHAR(100),
  guardianEmail VARCHAR(100),
  email VARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (petId) REFERENCES pets(id),
  FOREIGN KEY (guardianId) REFERENCES users(id)
);
