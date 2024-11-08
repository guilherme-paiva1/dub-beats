CREATE DATABASE dub_beats;
USE dub_beats;

CREATE TABLE Usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT ,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45)
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
			REFERENCES Postagem(fk_usuario)
);

CREATE TABLE Curtida_Postagem (
  id_curtida_postagem INT AUTO_INCREMENT,
  fk_postagem INT,
  fk_usuario INT,
  PRIMARY KEY (id_curtida_postagem, fk_postagem, fk_usuario),

  CONSTRAINT fk_postagem_curtida
    FOREIGN KEY (fk_postagem)
		REFERENCES Postagem (id_postagem),
   CONSTRAINT fk_usuario_postagem_curtida
    FOREIGN KEY (fk_usuario)
		REFERENCES Postagem(fk_usuario)
);

CREATE TABLE Curtida_Comentario (
  id_curtida_comentario INT AUTO_INCREMENT,
  fk_comentario INT,
  fk_postagem INT,
  fk_usuario INT,
  PRIMARY KEY (id_curtida_comentario, fk_comentario, fk_postagem, fk_usuario),

  CONSTRAINT fk_comentario_curtida
    FOREIGN KEY (fk_comentario)
		REFERENCES Comentario (id_comentario),
  CONSTRAINT fk_postagem_comentario_curtida
    FOREIGN KEY (fk_postagem)
		REFERENCES Comentario (fk_postagem),
  CONSTRAINT fk_usuario_comentario_curtida
    FOREIGN KEY (fk_usuario)
		REFERENCES Comentario (fk_usuario)
);

