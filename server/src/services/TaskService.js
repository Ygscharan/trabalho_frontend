const { prisma } = require('./PrismaService');

class TaskService {

    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getAllByUserId = this.getAllByUserId.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    create = async (data) => {
        try {
            const task = await prisma.task.create({ data });
            return task;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    getById = async (task_id) => {
        try {
            const task = await prisma.task.findUnique({ where: { task_id } });
            return task;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    getAllByUserId = async (user_id) => {
        try {
            const tasks = await prisma.task.findMany({ where: { user_id } });
            return tasks;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    update = async (task_id, data) => {
        try {
            const task = await prisma.task.update({ where: { task_id }, data });
            return task;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    remove = async (task_id) => {
        try {
            const task = await prisma.task.delete({ where: { task_id } });
            return task;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }
}

module.exports = TaskService;