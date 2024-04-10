create schema db_acme_filmes_turma_aa;

use db_acme_filmes_turma_aa;

create table tbl_classificacao(
id int not null auto_increment primary key,
nome varchar(45) not null,
sigla varchar(5) not null,
descricao varchar(100) not null,
icon text,

unique key (id),
unique index (id)
);

insert into tbl_classificacao(nome, sigla, descricao, icon) values(
	"Livre",
    "L",
    "Faz o L",
    "www.teste.com"
);

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(300) not null,
    valor_unitario float,
    id_classificacao int not null,
    
    unique key (id),
    unique index (id),
    
    foreign key(id_classificacao) references tbl_classificacao(id)
);

create table tbl_genero (
	id int not null auto_increment primary key,
    nome varchar(45),
    
    unique key (id),
	unique index (id)    
);

create table tbl_filme_genero (
	id int not null auto_increment primary key,
    id_genero int not null,
    id_filme int not null,
    
    unique key (id),
    unique index(id),
    
    foreign key(id_genero) references tbl_genero(id),
    foreign key(id_filme) references tbl_filme(id)
);

create table tbl_sexo(
	id int not null auto_increment primary key,
    nome varchar(2) not null,
    
    unique key (id),
    unique index(id)
);

create table tbl_nacionalidade(
	id int not null auto_increment primary key,
    nome varchar(45) not null,
    
    unique key (id),
    unique index(id)
);

create table tbl_diretores(
	id int not null auto_increment primary key,
    nome varchar(90) not null,
    nome_artistico varchar(90),
    biografia text,
    foto text,
    data_nascimento date not null,
    data_falecimeto date,
    id_sexo int not null,
    
    unique key (id),
    unique index(id),
    
    foreign key(id_sexo) references tbl_sexo(id)
);

create table tbl_atores(
	id int not null auto_increment primary key,
    nome varchar(90) not null,
    nome_artistico varchar(90),
    biografia text,
    foto text,
    data_nascimento date not null,
    data_falecimeto date,
    id_sexo int not null,
    
    unique key (id),
    unique index(id),
    
    foreign key(id_sexo) references tbl_sexo(id)
);

create table tbl_nacionalidade_ator(
	id int not null auto_increment primary key,
    id_nacionalidade int not null,
    id_ator int not null,
    
    unique index(id),
    unique key (id),
    
    foreign key(id_nacionalidade) references tbl_nacionalidade(id),
    foreign key(id_ator) references tbl_atores(id)
);

create table tbl_nacionalidade_diretor(
	id int not null auto_increment primary key,
    id_nacionalidade int not null,
    id_diretor int not null,
    
    unique index(id),
    unique key (id),
    
    foreign key(id_nacionalidade) references tbl_nacionalidade(id),
    foreign key(id_diretor) references tbl_diretores(id)
);

create table tbl_diretores_filme(
	id int not null auto_increment primary key,
    id_diretor int not null,
    id_filme int not null,
    
    unique index(id),
    unique key (id),
    
    foreign key(id_diretor) references tbl_diretores(id),
    foreign key(id_filme) references tbl_filme(id)
);

create table tbl_atores_filme(
	id int not null auto_increment primary key,
    id_ator int not null,
    id_filme int not null,
    
    unique index(id),
    unique key (id),
    
    foreign key(id_ator) references tbl_atores(id),
    foreign key(id_filme) references tbl_filme(id)
);

show tables;