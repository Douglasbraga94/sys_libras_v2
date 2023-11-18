module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } =
    app.api.validations;

  const get = (req, res) => {
    app
      .db("vw_pessoa_json")
      .select()
      .then((pessoa) => res.json(pessoa[0].dados))
      .catch((err) => res.status(500).send(err.message));
  };

  const getById = (req, res) => {
    app
      .db("vw_pessoa_json")
      .select()
      .whereJsonObject("pessoa", { codigo: req.params.codigo })
      .then((pessoa) => res.json(pessoa))
      .catch((err) => res.status(500).send(err.message));
  };

  const save = async (req, res) => {
    const body = { ...req.body };
    console.log(JSON.stringify(body, null, 2));
    var codigosPapeisSelecionados = [];
    if (req.params.codigo) body.codigo = req.params.codigo;
    try {
      existsOrError(body.nome, "Informe o nome.");
      existsOrError(body.localidade, "Informe a comum congregação.");
      // existsOrError(body.dataNascimento, "Informe a data de nascimento.");
      equalsOrError(
        typeof body.batizado,
        "boolean",
        "Informe se é batizado(a) ou não."
      );
      equalsOrError(
        typeof body.cursoExternoLibras,
        "boolean",
        "Informe se possui ou não curso externo de libras."
      );
      existsOrError(body.papeis, "Selecione pelo menos um papel.");

      if (body.papeis && body.papeis.length > 0) {
        codigosPapeisSelecionados = body.papeis.map((papel) => papel.codigo);
        if (codigosPapeisSelecionados.includes(app.enums.PAPEL.COLABORADOR)) {
          existsOrError(
            body.colaborador,
            "Informe os dados do(a) colaborador(a)."
          );
          existsOrError(
            body.colaborador.competencia,
            "Informe a competência do(a) colaborador(a)"
          );
        }

        if (codigosPapeisSelecionados.includes(app.enums.PAPEL.INTERPRETE)) {
          existsOrError(body.interprete, "Informe os dados do(a) intérprete.");
          existsOrError(
            body.interprete.situacao,
            "Informe a situação do(a) intérprete."
          );
          existsOrError(
            body.interprete.dataOficializacao,
            "Informe a data de oficialização do(a) intérprete."
          );
          if (
            body.interprete.situacao.codigo ===
            app.enums.INTERPRETE_SITUACAO.DIVERSOS
          )
            existsOrError(
              body.interprete.justificativa,
              "Informe a justificativa para a situação do intérprete."
            );
        }

        if (codigosPapeisSelecionados.includes(app.enums.PAPEL.ALUNO)) {
          body.turmas.forEach((turma) => {
            existsOrError(turma, "Informe os dados do(a) aluno(a).");
            existsOrError(turma.codigo, "Informe os dados da turma.");
            existsOrError(
              turma.situacao,
              "Informe a situação do(a) aluno(a) ma turma."
            );
            existsOrError(
              turma.cartaEncaminhamento,
              "Informe os dados da carta de encaminhamento do(a) aluno(a)."
            );
          });
        }
      }
    } catch (msg) {
      console.log(msg);
      return res.status(400).send(msg);
    }

    await app.db.transaction(async (trx) => {
      // DADOS CADASTRAIS
      const pessoa = {
        nome: (body.nome) ? body.nome : null,
        telefone1: (body.telefone1) ? body.telefone1 : null,
        telefone2: (body.telefone2) ? body.telefone2 : null,
        email: (body.email) ? body.email : null,
        codigoLocalidade: (body.localidade) ? body.localidade.codigo : null,
        dataNascimento: (body.dataNascimento) ? body.dataNascimento : null,
        dataBatismo: (body.dataBatismo) ? body.dataBatismo : null,
        batizado: (body.batizado) ? body.batizado : false,
        cursoExternoLibras: (body.cursoExternoLibras) ? body.cursoExternoLibras : false,
        ativo: (body.ativo) ? body.ativo : true,
        observacao: (body.observacao) ? body.observacao : null
      };

      console.log("pessoa: " + JSON.stringify(pessoa, null, 2))

      // ATUALIZAÇÃO
      if (body.codigo) {
        const codigoPessoa = body.codigo;

        return await trx("pessoa")
          .update(pessoa)
          .where({ codigo: codigoPessoa })
          .then(async () => {

            // PAPÉIS

            // Recupera os papéis existentes atribuídos a pessoa
            const papeisPessoaExistente = await trx("vw_pessoa_papel")
              .select()
              .where({ codigoPessoa: codigoPessoa })
              .then((rows) => rows);

            // Extrai o código dos papéis a serem atualizados
            const codigosPapeisPessoaAtualizar = papeisPessoaExistente.map(
              (pp) => pp.codigoPapel
            );

            // Separa os papéis existentes que deverão ser atualizados e verifica se serão ativados ou desativados
            const papeisPessoaAtualizar = papeisPessoaExistente.map(
              (pessoaPapel) => {
                return {
                  codigoPessoa: pessoaPapel.codigoPessoa,
                  codigoPapel: pessoaPapel.codigoPapel,
                  ativo: codigosPapeisSelecionados.includes(
                    pessoaPapel.codigoPapel
                  ), // Ativa papéis selecionados e desativa o restante
                };
              }
            );

            // Separa os papéis novos que deverão ser incluidos e ativados
            const papeisPessoaIncluir = body.papeis
              .filter(
                (papel) => !codigosPapeisPessoaAtualizar.includes(papel.codigo)
              )
              .map((papel) => {
                return {
                  codigoPessoa: codigoPessoa,
                  codigoPapel: papel.codigo,
                  ativo: papel.ativo,
                };
              });

            console.log(
              "papeisPessoaExistente: " +
                JSON.stringify(papeisPessoaExistente, null, 2)
            );
            console.log(
              "codigosPapeisPessoaAtualizar: " +
                codigosPapeisPessoaAtualizar.length
            );
            console.log(
              "papeisPessoaAtualizar: " +
                JSON.stringify(papeisPessoaAtualizar, null, 2)
            );
            console.log(
              "papeisPessoaIncluir: " +
                JSON.stringify(papeisPessoaIncluir, null, 2)
            );

            // Atualiza papéis existentes
            if (papeisPessoaAtualizar.length > 0) {
              papeisPessoaAtualizar.forEach(async (papelPessoa) => {
                var papeisPessoaAtualizados = await trx("pessoa_papel")
                  .update(papelPessoa)
                  .where({
                    codigoPessoa: papelPessoa.codigoPessoa,
                    codigoPapel: papelPessoa.codigoPapel,
                  });
              });
            }

            // Inclui papéis novos
            if (papeisPessoaIncluir.length > 0) {
              var papeisPessoaIncluidos = await trx("pessoa_papel").insert(
                papeisPessoaIncluir
              );
            }

            // COLABORADOR

            // Recupera os dados existentes de colaborador
            const colaboradorExistente = await trx("vw_colaborador")
              .select()
              .where({ codigoPessoa: codigoPessoa })
              .then((rows) => rows);

            console.log(
              "colaborador existente: " +
                JSON.stringify(colaboradorExistente, null, 2)
            );

            // Se o papel foi selecionado, inclui ou atualiza os dados correspondentes
            if (
              codigosPapeisSelecionados.includes(app.enums.PAPEL.COLABORADOR)
            ) {
              const colaborador = {
                codigoPessoa: codigoPessoa,
                codigoCompetencia: body.colaborador.competencia.codigo,
                ativo: body.colaborador.ativo,
              };

              console.log(
                "colaborador: " + JSON.stringify(colaborador, null, 2)
              );

              // Atualiza os dados existentes
              if (colaboradorExistente.length > 0) {
                const colaboradorAtualizado = await trx("colaborador")
                  .update(colaborador)
                  .where({ codigoPessoa: codigoPessoa });
                // Inclui os dados novos
              } else {
                const colaboradorIncluido = await trx("colaborador").insert(
                  colaborador
                );
              }
              // Desativa os dados que porventura existam, caso o papel correspondente não tenha sido selecionado
            } else {
              if (colaboradorExistente.length > 0) {
                const colaboradorAtualizado = await trx("colaborador")
                  .update({ ativo: false })
                  .where({ codigoPessoa: codigoPessoa });
              }
            }

            // INTÉRPRETE

            // Recupera os dados existentes de intérprete
            const interpreteExistente = await trx("vw_interprete")
              .select()
              .where({ codigoPessoa: codigoPessoa })
              .then((rows) => rows);

            console.log(
              "intérprete existente: " +
                JSON.stringify(interpreteExistente, null, 2)
            );

            // Se o papel foi selecionado, inclui ou atualiza os dados correspondentes
            if (
              codigosPapeisSelecionados.includes(app.enums.PAPEL.INTERPRETE)
            ) {
              const interprete = {
                codigoPessoa: codigoPessoa,
                codigoSituacao: body.interprete.situacao.codigo,
                justificativa: body.interprete.justificativa,
                dataOficializacao: body.interprete.dataOficializacao,
                ativo: body.interprete.ativo,
              };

              console.log("intérprete: " + JSON.stringify(interprete, null, 2));

              // Atualiza os dados existentes
              if (interpreteExistente.length > 0) {
                const interpreteAtualizado = await trx("interprete")
                  .update(interprete)
                  .where({ codigoPessoa: codigoPessoa });
                // Inclui os dados novos
              } else {
                const interpreteIncluido = await trx("interprete").insert(
                  interprete
                );
              }

              // Desativa os dados que porventura existam, caso o papel correspondente não tenha sido selecionado
            } else {
              if (interpreteExistente.length > 0) {
                const interpreteAtualizado = await trx("interprete")
                  .update({ ativo: false })
                  .where({ codigoPessoa: codigoPessoa });
              }
            }

            // ALUNO

            // Recupera os dados existentes de alunos matriculados em turmas ativas
            const turmasPessoaExistente = await trx("vw_turma_pessoa")
              .select()
              .where({ codigoPessoa: codigoPessoa })
              .then((rows) => rows);

            console.log(
              "turmaPessoaExistente: " +
                JSON.stringify(turmasPessoaExistente, null, 2)
            );

            // Extrai o código das turmas a serem atualizados
            const codigosTurmasPessoaAtualizar = turmasPessoaExistente.map(
              (tp) => tp.codigoTurma
            );

            // Se o papel foi selecionado, inclui ou atualiza os dados correspondentes
            if (codigosPapeisSelecionados.includes(app.enums.PAPEL.ALUNO)) {
              // Recupera os códigos de turma selecionados
              const codigosTurmaSelecionados = body.turmas.map(
                (tp) => tp.codigo
              );

              // Separa as turmas existentes que deverão ser atualizadas e verifica se serão ativadas ou desativadas
              // Se o código da turma selecionado corresponder ao existente, atualiza os dados da turma existente e ativa.
              // Caso contrário, mantém os dados existentes e desativa a turma existente.
              const turmasPessoaAtualizar = turmasPessoaExistente.map(
                (turmaPessoa) => {
                  return {
                    codigoTurma: turmaPessoa.codigoTurma,
                    codigoPessoa: turmaPessoa.codigoPessoa,
                    codigoSituacao: codigosTurmaSelecionados.includes(
                      turmaPessoa.codigoTurma
                    )
                      ? body.turmas
                          .filter((tp) => tp.codigo === turmaPessoa.codigoTurma)
                          .map((tp) => tp.situacao.codigo)[0]
                      : turmaPessoa.codigoSituacao,
                    codigoCartaEncaminhamento:
                      codigosTurmaSelecionados.includes(turmaPessoa.codigoTurma)
                        ? body.turmas
                            .filter(
                              (tp) => tp.codigo === turmaPessoa.codigoTurma
                            )
                            .map((tp) => tp.cartaEncaminhamento.codigo)[0]
                        : turmaPessoa.codigoCartaEncaminhamento,
                    dataTeste: codigosTurmaSelecionados.includes(
                      turmaPessoa.codigoTurma
                    )
                      ? body.turmas
                          .filter((tp) => tp.codigo === turmaPessoa.codigoTurma)
                          .map((tp) => tp.dataTeste)[0]
                      : turmaPessoa.dataTeste,
                    observacao: codigosTurmaSelecionados.includes(
                      turmaPessoa.codigoTurma
                    )
                      ? body.turmas
                          .filter((tp) => tp.codigo === turmaPessoa.codigoTurma)
                          .map((tp) => tp.observacao)[0]
                      : turmaPessoa.observacao,
                    ativo: codigosTurmaSelecionados.includes(
                      turmaPessoa.codigoTurma
                    ),
                    dataHoraMatricula: codigosTurmaSelecionados.includes(
                      turmaPessoa.codigoTurma
                    )
                      ? body.turmas
                          .filter((tp) => tp.codigo === turmaPessoa.codigoTurma)
                          .map((tp) => tp.dataHoraMatricula)[0]
                      : turmaPessoa.dataHoraMatricula, // Ativa se o código da turma existente corresponder ao selecionado. Caso contrário, desativa.
                  };
                }
              );

              // Separa as turmas novas que deverão ser incluídas e ativadas
              const turmasPessoaIncluir = body.turmas
                .filter(
                  (turmaPessoa) =>
                    !codigosTurmasPessoaAtualizar.includes(turmaPessoa.codigo)
                )
                .map((turmaPessoa) => {
                  return {
                    codigoTurma: turmaPessoa.codigo,
                    codigoPessoa: codigoPessoa,
                    codigoSituacao: turmaPessoa.situacao.codigo,
                    codigoCartaEncaminhamento:
                      turmaPessoa.cartaEncaminhamento.codigo,
                    dataTeste: turmaPessoa.dataTeste,
                    observacao: turmaPessoa.observacao,
                    ativo: turmaPessoa.ativo,
                    dataHoraMatricula: turmaPessoa.dataHoraMatricula,
                  };
                });

              console.log(
                "turmasPessoaAtualizar: " +
                  JSON.stringify(turmasPessoaAtualizar, null, 2)
              );

              console.log(
                "turmasPessoaIncluir: " +
                  JSON.stringify(turmasPessoaIncluir, null, 2)
              );

              // Atualiza os dados das turmas existentes do aluno
              if (turmasPessoaAtualizar.length > 0) {
                turmasPessoaAtualizar.forEach(async (turmaPessoa) => {
                  var turmasPessoaAtualizados = await trx("turma_pessoa")
                    .update(turmaPessoa)
                    .where({
                      codigoTurma: turmaPessoa.codigoTurma,
                      codigoPessoa: turmaPessoa.codigoPessoa,
                    });
                });
              }

              // Inclui os dados das turmas novas do aluno
              if (turmasPessoaIncluir.length > 0) {
                var turmasPessoaIncluidos = await trx("turma_pessoa").insert(
                  turmasPessoaIncluir
                );
              }

              // Desativa os dados que porventura existam, caso o papel correspondente não tenha sido selecionado
            } else {
              if (turmasPessoaExistente.length > 0) {
                const turmasPessoaExistenteDesativados = await trx(
                  "turma_pessoa"
                )
                  .update({ ativo: false })
                  .where({ codigoPessoa: codigoPessoa });
              }
            }
          })
          .then(() => res.status(204).send())
          .catch((err) => {
            console.log(err);
            return res.status(500).send(err.message);
          });
        // INCLUSÃO
      } else {
        return trx("pessoa")
          .insert(pessoa, "codigo")
          .then(async (retorno) => retorno[0])
          .then(async (pessoa) => {
            const codigoPessoa = pessoa.codigo;
            // Separa os papéis novos que deverão ser incluidos e ativados
            const papeisPessoaIncluir = body.papeis.map((papel) => {
              return {
                codigoPessoa: codigoPessoa,
                codigoPapel: papel.codigo,
                ativo: papel.ativo,
              };
            });

            console.log(
              "papeisPessoaIncluir: " +
                JSON.stringify(papeisPessoaIncluir, null, 2)
            );

            // Inclui papéis novos
            if (papeisPessoaIncluir.length > 0) {
              var papeisPessoaIncluidos = await trx("pessoa_papel").insert(
                papeisPessoaIncluir
              );
            }

            // COLABORADOR

            // Se o papel foi selecionado, inclui ou atualiza os dados correspondentes
            if (
              codigosPapeisSelecionados.includes(app.enums.PAPEL.COLABORADOR)
            ) {
              const colaborador = {
                codigoPessoa: codigoPessoa,
                codigoCompetencia: body.colaborador.competencia.codigo,
                ativo: body.colaborador.ativo,
              };

              console.log(
                "colaborador: " + JSON.stringify(colaborador, null, 2)
              );

              const colaboradorIncluido = await trx("colaborador").insert(
                colaborador
              );
            }

            // INTÉRPRETE

            // Se o papel foi selecionado, inclui ou atualiza os dados correspondentes
            if (
              codigosPapeisSelecionados.includes(app.enums.PAPEL.INTERPRETE)
            ) {
              const interprete = {
                codigoPessoa: codigoPessoa,
                codigoSituacao: body.interprete.situacao.codigo,
                justificativa: body.interprete.justificativa,
                dataOficializacao: body.interprete.dataOficializacao,
                ativo: body.interprete.ativo,
              };

              console.log("intérprete: " + JSON.stringify(interprete, null, 2));

              const interpreteIncluido = await trx("interprete").insert(
                interprete
              );
            }

            // ALUNO

            // Se o papel foi selecionado, inclui ou atualiza os dados correspondentes
            if (codigosPapeisSelecionados.includes(app.enums.PAPEL.ALUNO)) {
              // Recupera os códigos de turma selecionados
              const codigosTurmaSelecionados = body.turmas.map(
                (tp) => tp.codigo
              );

              // Separa as turmas novas que deverão ser incluídas e ativadas
              const turmasPessoaIncluir = body.turmas.map((turmaPessoa) => {
                return {
                  codigoTurma: turmaPessoa.codigo,
                  codigoPessoa: codigoPessoa,
                  codigoSituacao: turmaPessoa.situacao.codigo,
                  codigoCartaEncaminhamento:
                    turmaPessoa.cartaEncaminhamento.codigo,
                  dataTeste: turmaPessoa.dataTeste,
                  observacao: turmaPessoa.observacao,
                  ativo: turmaPessoa.ativo,
                  dataHoraMatricula: turmaPessoa.dataHoraMatricula,
                };
              });

              console.log(
                "turmasPessoaIncluir: " +
                  JSON.stringify(turmasPessoaIncluir, null, 2)
              );

              // Inclui os dados das turmas novas do aluno
              if (turmasPessoaIncluir.length > 0) {
                var turmasPessoaIncluidos = await trx("turma_pessoa").insert(
                  turmasPessoaIncluir
                );
              }
            }
          })
          .then(() => res.status(204).send())
          .catch((err) => {
            console.log(err);
            return res.status(500).send(err.message);
          });
      }
    });
  };

  const remove = async(req, res) => {
    try {
      existsOrError(req.params.codigo, "Informe o código")

      await app.db.transaction(async (trx) => {

        // Desativa a pessoa
        return await trx("pessoa")
          .update({ ativo: false })
          .where({ codigo: req.params.codigo })
          .then(async () => {

            // PAPÉIS
            const papeisDesativados = await trx("pessoa_papel")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })

            // COLABORADOR
            const colaboradorDesativado = await trx("colaborador")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })

            // INTÉRPRETE
            const interpreteDesativado = await trx("interprete")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })

            // ALUNO
            const turmasDesativadas = await trx("turma_pessoa")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })

            // EVENTO PRESENÇA
            const eventoPresencaDesativado = await trx("evento_presenca")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })
            // EVENTO AUSÊNCIA
            const eventoAusenciaDesativado = await trx("evento_ausencia")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })

            // ATIVIDADES
            const atividadesPessoaDesativado = await trx("atividade_pessoa")
              .update({ ativo: false })
              .where({ codigoPessoa: req.params.codigo })

          })
          .then(() => res.status(204).send())
          .catch((err) => {
            console.log(err);
            return res.status(500).send(err.message);
          });
      })
    } catch (msg) {
      res.status(400).send(msg)
    }
  };

  return { get, getById, save, remove };
};
