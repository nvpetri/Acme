create schema db_acme_filmes_turma_aa;

use db_acme_filmes_turma_aa;

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(300) not null,
    valor_unitario float,
    
    unique key (id),
    unique index (id)
);