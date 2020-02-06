import bcrypt from 'bcrypt';
import models from '../../../sequelize/models';
import { profile as getProfile } from '../query/profile'
import { user as getUser } from '../query/user'

//const db = require('../../config/db')

const newUser = async(_, { data }) => {
    const transaction = await models.sequelize.transaction();

    let userInserted = {};
    const { profiles } = data;
    try {
        delete data.profiles;
        const salt = bcrypt.genSaltSync(10);

        data.password = bcrypt.hashSync(data.password, salt);
        data.status = '1';
        
        userInserted = await models.User.create(data,{ transaction });
        await inserteRelationProfiles(userInserted, profiles, transaction);
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
    }
    return userInserted;
};

const registerUser = async(_, data ) => {
    return await newUser(data);
};


const removeUser = async(_, filter ) => {
    let data = {};
    try {
        data = await getUser(_, filter);
        if(data)
           await models.User.destroy({ where: { id: data.id } });
         
    } catch (error) {
        throw new Error(error);
    }
    return data;      
    
};

const updateUser = async (_, { filter, data }) => {
    let finded = {};
    try {
        finded = await getUser(_, { filter });
        if(finded)
           await models.User.update(data ,{ where: { id: finded.id } });
         
    } catch (error) {
        throw new Error(error);
    }
    return{ ...finded, ...data };      
};

const inserteRelationProfiles = async({ id }, profiles, transaction) =>{
    if(!profiles || !profiles.length){
        profiles = [{
            name: 'comun'
        }]
    }
    for(let filter of profiles) {
        const profile = await getProfile( null, { filter } );
        if(profile)
            await models.UserProfile.create({profile_id: profile.id, user_id: id}, { transaction });
    }
}


export {
    registerUser,
    newUser,
    removeUser,
    updateUser
}