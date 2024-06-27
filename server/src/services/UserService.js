const { prisma } = require('./PrismaService');

class UserService {

    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.login = this.login.bind(this);
    }

    create = async (data) => {
        try {
            const user = await prisma.user.create({ data });
            return user;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    getById = async (id) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return user;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    getByEmail = async (email) => {
        try {
            const user = await prisma.user.findFirst({ where: { email } });
            return user;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    getAll = async () => {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    update = async (id, data) => {
        try {
            const user = await prisma.user.update({ where: { id }, data });
            return user;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    remove = async (id) => {
        try {
            const user = await prisma.user.delete({ where: { id } });
            return user;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }

    login = async (email, password) => {
        try {
            const user = await prisma.user.findFirst({ where: { email, password } });
            return user;
        } catch (error) {
            console.error("SERVICE ERROR", error);
            return null;
        }
    }
}

module.exports = UserService;