import models from '../../../sequelize/models';


const profiles = async () => {
    return await models.Profile.findAll();
};

const profile = async (_, { filter }) =>{
    if(filter.id)
        return await models.Profile.findByPk(filter.id);
    if(filter.name)
        return await models.Profile.findOne({where:{ name: filter.name}});

    return null;
};

export {
    profiles,
    profile
}