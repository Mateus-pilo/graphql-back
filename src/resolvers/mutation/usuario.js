import bcrypt from 'bcrypt';
import { User } from '../../../sequelize/models';
import { perfil as getPerfil } from '../query/perfil'
//const db = require('../../config/db')

const registrarUsuario = async(_, { dados }) => {
    // Implementar
};

const novoUsuario = async(_, { dados }) => {
    const { perfis } = dados;

    delete dados.perfis;

    dados.password = bcrypt.hashSync(dados.password, bcrypt.genSaltSync());
    dados.status = '1';

    const userInserted = await User.create(dados);
    const relationsInserted = await inserteRelationProfiles(userInserted, perfis);

};

const excluirUsuario = async(_, { filtro }) =>{
    // Implementar
};

const alterarUsuario = (_, { filtro, dados }) => {
    
};

const inserteRelationProfiles = async({ id }, profiles) =>{
    if(!profiles || !profiles.length){
        profiles = [{
            name: 'comun'
        }]
    }
    for(let filtro of profiles) {
        const perfil = await getPerfil(filtro);
        if(perfil)
            idsPerfis.push(perfil.id);
    }
}


export {
    registrarUsuario,
    novoUsuario,
    excluirUsuario,
    alterarUsuario
}