import models from '../../../sequelize/models';

const profiles = async(user) =>{
    const { Profiles } = await models.User.findOne({where: { id: user.id},include: [{ all: true }]});
    return Profiles;
};

export {
    profiles
}