import models from '../../../sequelize/models';


const users = async () => {
    return await models.User.findAll();    
};
const user = async (_, { filter }) => {
    if(filter.id)
        return await models.User.findByPk(filter.id);
    if(filter.email)
        return await models.User.findOne({
            where: {
                email: filter.email
            }
        });

    return null;
};

export {
    users,
    user
};
