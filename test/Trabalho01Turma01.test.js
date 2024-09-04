const GerenciadorDeTarefas = require('../src/Trabalho01Turma01');

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('adiciona uma nova tarefa com sucesso', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('não permite adicionar tarefa com descrição curta (<= 3 caracteres)', () => {
        const tarefa = { id: 2, descricao: 'Atv', concluida: false };
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');
    });

    test('remove tarefa pelo ID', () => {
        const tarefa = { id: 3, descricao: 'Tarefa 3', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(3);
        expect(gerenciador.buscarTarefaPorId(3)).toBeUndefined();
    });

    test('localiza uma tarefa pelo ID', () => {
        const tarefa = { id: 4, descricao: 'Tarefa 4', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(4)).toEqual(tarefa);
    });

    test('atualiza a descrição de uma tarefa existente', () => {
        const tarefa = { id: 5, descricao: 'Tarefa 5', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(5, { descricao: 'Tarefa 5 Atualizada' });
        expect(gerenciador.buscarTarefaPorId(5).descricao).toBe('Tarefa 5 Atualizada');
    });

    test('lista todas as tarefas adicionadas', () => {
        const tarefa1 = { id: 6, descricao: 'Tarefa 6', concluida: false };
        const tarefa2 = { id: 7, descricao: 'Tarefa 7', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('conta o número total de tarefas', () => {
        const tarefa1 = { id: 8, descricao: 'Tarefa 8', concluida: false };
        const tarefa2 = { id: 9, descricao: 'Tarefa 9', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('marca uma tarefa como concluída', () => {
        const tarefa = { id: 10, descricao: 'Tarefa 10', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(10);
        expect(gerenciador.buscarTarefaPorId(10).concluida).toBe(true);
    });

    test('lista somente as tarefas concluídas', () => {
        const tarefa1 = { id: 11, descricao: 'Tarefa 11', concluida: true };
        const tarefa2 = { id: 12, descricao: 'Tarefa 12', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa1]);
    });

    test('lista somente as tarefas pendentes', () => {
        const tarefa1 = { id: 13, descricao: 'Tarefa 13', concluida: false };
        const tarefa2 = { id: 14, descricao: 'Tarefa 14', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('remove todas as tarefas concluídas', () => {
        const tarefa1 = { id: 15, descricao: 'Tarefa 15', concluida: true };
        const tarefa2 = { id: 16, descricao: 'Tarefa 16', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2]);
    });

    test('encontrar tarefas por parte da descrição', () => {
        const tarefa1 = { id: 17, descricao: 'Tarefa com tag', concluida: false };
        const tarefa2 = { id: 18, descricao: 'Outra tarefa', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.buscarTarefaPorDescricao('tag')).toEqual([tarefa1]);
    });

    test('adiciona e remove tags de tarefas corretamente', () => {
        const tarefa = { id: 19, descricao: 'Tarefa 19', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(19, 'importante');
        expect(gerenciador.buscarTarefaPorId(19).tags).toContain('importante');
        gerenciador.removerTagDaTarefa(19, 'importante');
        expect(gerenciador.buscarTarefaPorId(19).tags).not.toContain('importante');
    });

    test('lista tarefas de acordo com a tag atribuída', () => {
        const tarefa1 = { id: 20, descricao: 'Tarefa 20', tags: ['urgent'] };
        const tarefa2 = { id: 21, descricao: 'Tarefa 21', tags: ['normal'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('urgent')).toEqual([tarefa1]);
    });

    test('encontrar tarefas por data específica', () => {
        const tarefa = { id: 22, descricao: 'Tarefa 22', data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefasPorData('2024-09-01')).toEqual([tarefa]);
    });

    test('atualiza a prioridade de uma tarefa existente', () => {
        const tarefa = { id: 23, descricao: 'Tarefa 23', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(23, 2);
        expect(gerenciador.buscarTarefaPorId(23).prioridade).toBe(2);
    });

    test('lista tarefas conforme a prioridade especificada', () => {
        const tarefa1 = { id: 24, descricao: 'Tarefa 24', prioridade: 1 };
        const tarefa2 = { id: 25, descricao: 'Tarefa 25', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa1]);
    });

    test('conta o número de tarefas por prioridade', () => {
        const tarefa1 = { id: 26, descricao: 'Tarefa 26', prioridade: 1 };
        const tarefa2 = { id: 27, descricao: 'Tarefa 27', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(2);
    });

    test('marca todas as tarefas como concluídas de uma vez', () => {
        const tarefa1 = { id: 28, descricao: 'Tarefa 28', concluida: false };
        const tarefa2 = { id: 29, descricao: 'Tarefa 29', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([
            { ...tarefa1, concluida: true },
            { ...tarefa2, concluida: true }
        ]);
    });

    test('reabre uma tarefa que estava concluída', () => {
        const tarefa = { id: 30, descricao: 'Tarefa 30', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(30);
        expect(gerenciador.buscarTarefaPorId(30).concluida).toBe(false);
    });

    test('ordena tarefas por data de criação', () => {
        const tarefa1 = { id: 31, descricao: 'Tarefa 31', data: '2024-09-03' };
        const tarefa2 = { id: 32, descricao: 'Tarefa 32', data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });

    test('ordena tarefas por prioridade', () => {
        const tarefa1 = { id: 33, descricao: 'Tarefa 33', prioridade: 2 };
        const tarefa2 = { id: 34, descricao: 'Tarefa 34', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });
});