import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
})

class User extends Model {
    @Column({
        type: DataType.STRING
    })
    declare username: string

    @Column({
        type: DataType.STRING
    })
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare password: string

    @Column({
        type: DataType.ENUM('super-admin', 'admin', 'teacher', 'student')
    })
    declare roles: string
}


export default User;