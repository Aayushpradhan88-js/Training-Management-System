import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table ({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
})

class User extends Model {
    @Column ({
        primarykey: true,
        type: DataType.UUID, //FOR Random unique id 
        default: DataType.UUIDV4
    })
    declare id: string

    @Column ({
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
        type: DataType.ENUM('superadmin', 'admin', 'teacher', 'student')
    })
    declare role: string
}

export default User;