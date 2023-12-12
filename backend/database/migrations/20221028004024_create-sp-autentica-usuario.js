/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .raw(`CREATE OR REPLACE PROCEDURE autentica_usuario (
                _email varchar, 
                _senha varchar, 
                OUT _autenticado boolean
            )
            LANGUAGE plpgsql
            AS $$
            BEGIN
                _autenticado := false;    
                -- Compara a senha fornecida pelo usuário ativo
                IF EXISTS(SELECT FROM usuario u WHERE u.email = _email AND u.senha = pgcrypto.crypt(_senha, u.senha) AND u.ativo = true) THEN
                    -- Parâmetro de retorno que indica que o usuário foi autenticado
                    _autenticado := true;
                    -- Inclui um registro na tabela de login
                    INSERT INTO 
                        login 
                        (
                            "codigoUsuario"
                            , "codigoPerfil"
                            , ativo
                        )
                    SELECT
                        u.codigo
                        , u."codigoPerfil"
                        , u.ativo
                    FROM
                        usuario u
                    WHERE
                        u.email = _email
                        AND u.senha = pgcrypto.crypt(_senha, u.senha) 
                        AND u.ativo = true;   
                END IF;
            END 
            $$;`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .raw('DROP PROCEDURE autentica_usuario');
};
