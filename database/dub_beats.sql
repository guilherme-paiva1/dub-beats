GRANT ALL ON dub_beats.* TO 'svc_dubeats'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE dub_beats;
USE dub_beats;

CREATE TABLE Usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT ,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  senha VARCHAR(45) NOT NULL,
  bio VARCHAR(450) DEFAULT 'Fale sobre você aqui!'
);

CREATE TABLE Postagem (
  id_postagem INT AUTO_INCREMENT,
  fk_usuario INT,
  titulo VARCHAR(45),
  conteudo VARCHAR(500),
  PRIMARY KEY (id_postagem, fk_usuario),

  CONSTRAINT fk_Postagem_Usuario
    FOREIGN KEY (fk_usuario)
		REFERENCES Usuario(id_usuario)
);


CREATE TABLE Comentario (
	id_comentario INT AUTO_INCREMENT,
	fk_postagem INT,
	fk_usuario INT,
	conteudo VARCHAR(500),
	PRIMARY KEY (id_comentario, fk_postagem, fk_usuario),

	CONSTRAINT fk_postagem_comentario
		FOREIGN KEY (fk_postagem)
			REFERENCES Postagem(id_postagem),
	CONSTRAINT fk_usuario_comentario
		FOREIGN KEY (fk_usuario)
			REFERENCES Usuario(id_usuario)
);

CREATE TABLE Curtida (
  id_curtida INT AUTO_INCREMENT,
  fk_postagem INT,
  fk_usuario INT,
  PRIMARY KEY (id_curtida, fk_postagem, fk_usuario),

  CONSTRAINT fk_postagem_curtida
    FOREIGN KEY (fk_postagem)
		REFERENCES Postagem (id_postagem),
   CONSTRAINT fk_usuario_postagem_curtida
    FOREIGN KEY (fk_usuario)
		REFERENCES Usuario(id_usuario)
);