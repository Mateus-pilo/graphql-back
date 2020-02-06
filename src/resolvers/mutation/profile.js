import models from '../../../sequelize/models';
import { profile as getProfile} from '../query/profile';

const newProfile = async(_, { data }) => {
    let created = {};
    try {
        created = await models.Profile.create(data);
    } catch (error) {
        throw new Error(error);
    }
    return created;    
};


const removeProfile = async(_, args) => {
  let data = {};
    try {
        data = await getProfile(_, args);
        if(data)
           await models.Profile.destroy({ where: { id: data.id } });
         
    } catch (error) {
        throw new Error(error);
    }
    return data;      
};

const updateProfile = async(_, { filter, data }) => {
    let finded = {};
    try {
        finded = await getProfile(_, { filter });
        if(finded)
           await models.Profile.update(data ,{ where: { id: finded.id } });
         
    } catch (error) {
        throw new Error(error);
    }
    return { ...finded, ...data};      
};


export {
    newProfile,
    removeProfile,
    updateProfile
}