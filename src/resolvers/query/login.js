import models from '../../../sequelize/models';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/token';

const login = async (_, { data }) => {
    const user = await models.User.findOne({ where: { email: data.email } });

    if (!user){
        throw new Error('Usuário ou senha invalída !');
    }
    
    const equals = bcrypt.compareSync(data.password, user.password);

    if(!equals){
        throw new Error('Usuário ou senha invalída !');
    }

    return generateToken(user);

};

export {
  login
}