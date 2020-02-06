import models from '../../../sequelize/models';

const profiles = async(user) =>{
    const { Perfis } = await models.User.findOne({where: { id: user.id},include: [{ all: true }]});
    return Perfis;
};

export {
    profiles
}