/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .raw(`CREATE OR REPLACE PROCEDURE grava_usuario(
            IN _codigo integer,
            IN _codigoPerfil integer,
            IN _nome character varying,
            IN _email character varying,
            IN _senha character varying,
            IN _ministerio character varying,
            IN _ativo boolean,
            OUT _gravado boolean)
        LANGUAGE 'plpgsql'
        AS $$
            DECLARE
                _usuario usuario%ROWTYPE;    
            BEGIN
                _gravado := false;           
                -- Seta o registro como ativo por default, se o parâmetro estiver nulo
                IF _ativo IS NULL THEN
                    _ativo := true;
                END IF;            
                -- INCLUSÃO        
                IF _codigo IS NULL THEN
                    -- Inclui um novo usuário
                    INSERT INTO 
                        usuario
                        (                    
                            "codigoPerfil"
                            , nome
                            , email
                            , senha
                            , ministerio
                            , ativo
                        )
                        VALUES 
                            (
                                _codigoPerfil
                                , _nome
                                , _email
                                , _senha
                                , _ministerio
                                , _ativo
                            );     
                        -- Parâmetro de retorno que indica que o registro foi gravado
                        _gravado := true;                
                -- ALTERAÇÃO/EXCLUSÃO LÓGICA
                ELSE
                    -- Seleciona os dados do usuário existente
                    SELECT * FROM usuario u
                    INTO _usuario
                    WHERE u.codigo = _codigo;                       
                    -- Se o usuário não existe, dispara uma mensagem
                    IF NOT FOUND THEN
                        RAISE NOTICE 'O usuário % não foi localizado', _codigo;
                    ELSE
                        -- ALTERAÇÃO
                        IF _ativo = true THEN                
                            -- Atualiza os dados do usuário localizado
                            UPDATE
                                usuario
                            SET
                                "codigoPerfil" = _codigoPerfil
                                , nome = _nome
                                , email = _email
                                , senha = _senha
                                , ministerio = _ministerio
                                , ativo = _ativo
                            WHERE
                                codigo = _usuario.codigo;                
                            -- Parâmetro de retorno que indica que o registro foi gravado
                            _gravado := true;
                        -- EXCLUSÃO LÓGICA
                        ELSE
                            -- Seta o registro como inativo
                            UPDATE
                                usuario
                            SET
                                ativo = _ativo
                            WHERE
                                codigo = _usuario.codigo;                
                            -- Parâmetro de retorno que indica que o registro foi gravado
                            _gravado := true;                                  
                        END IF;              
                    END IF;                
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
        .raw('DROP PROCEDURE grava_usuario');
};
