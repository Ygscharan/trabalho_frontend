const TaskService = require('../services/TaskService');
const auth = require('../middlewares/auth');

class TaskController {

    constructor() {
        this.taskService = new TaskService();
    }

    // Método para criar uma nova tarefa
    /*
    /*
     POST /tasks/
     body?
        {
            "task": {
                "title": "Título da tarefa",
                "description": "Descrição da tarefa" // opcional
            }
        }
    */
    create = async (req, res) => {
        try {
            auth(req, res, async () => {
                const { task: taskData } = req.body;

                if (!taskData || !taskData.title) {
                    return res.status(400).json({
                        message: 'Dados inválidos.' +
                            "Esperado um objeto 'task' com o campo 'title' preenchido."
                    });
                }

                taskData.user_id = req.user_id;

                const task = await this.taskService.create(taskData);

                return res.status(201).json({
                    message: 'Tarefa criada com sucesso.',
                    task
                });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Método para buscar uma tarefa pelo ID
    /*
        GET /tasks/:task_id
    */
    getById = async (req, res) => {
        try {
            auth(req, res, async () => {
                const { task_id } = req.params;

                const task = await this.taskService.getById(task_id);

                if (!task) {
                    return res.status(404).json({ message: 'Tarefa não encontrada.' });
                }

                if (task.user_id !== req.user_id) {
                    return res.status(403).json({ message: 'Acesso negado.' });
                }

                return res.status(200).json({ task });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Método para buscar todas as tarefas de um usuário
    /*
        GET /tasks/user/:user
    */
    getAllByUserId = async (req, res) => {
        try {
            auth(req, res, async () => {
                const { user } = req.params;

                if (user !== req.user_id) {
                    return res.status(403).json({ message: 'Acesso negado.' });
                }

                const tasks = await this.taskService.getAllByUserId(user);

                return res.status(200).json({ tasks });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Método para atualizar uma tarefa
    /*
        PUT /tasks/:task_id
        body?
        {
            "task": {
                "title": "Título da tarefa",
                "description": "Descrição da tarefa" // opcional
            }
        }
    */

    // TODO: Implementar a atualização de tarefas, colocar se tá completada ou non
    update = async (req, res) => {
        try {
            auth(req, res, async () => {
                const { task_id } = req.params;
                const { task: taskData } = req.body;

                if (!taskData || !task.name) {
                    return res.status(400).json({
                        message: 'Dados inválidos.' +
                            "Esperado um objeto 'task' com os campos a serem atualizados."
                    });
                }

                if (taskData.user_id !== req.user_id) {
                    return res.status(403).json({ message: 'Acesso negado.' });
                }

                const task = await this.taskService.update(task_id, taskData);

                if (!task) {
                    return res.status(404).json({ message: 'Tarefa não encontrada.' });
                }

                return res.status(200).json({
                    message: 'Tarefa atualizada com sucesso.',
                    task
                });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Método para remover uma tarefa
    /*
        DELETE /tasks/:task_id
    */
    remove = async (req, res) => {
        try {
            auth(req, res, async () => {
                const { task_id } = req.params;

                const existingTask = await this.taskService.getById(task_id);

                if (!existingTask) {
                    return res.status(404).json({ message: 'Tarefa não encontrada.' });
                }

                if (existingTask.user_id !== req.user_id) {
                    return res.status(403).json({ message: 'Acesso negado.' });
                }

                const task = await this.taskService.remove(task_id);

                if (!task) {
                    return res.status(404).json({ message: 'Tarefa não encontrada.' });
                }

                return res.status(200).json({ message: 'Tarefa removida com sucesso.' });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}

module.exports = TaskController;