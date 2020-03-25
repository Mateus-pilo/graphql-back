
module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			status: DataTypes.INTEGER,
		},
		{ freezeTableName: true, tableName: 'user' }
	);

	user.associate = function(models) {
		user.belongsToMany(models.Profile, {
			as: 'Profiles',
			through: models.UserProfile,
			foreignKey: 'user_id',
		});
	};

	return user;
}
