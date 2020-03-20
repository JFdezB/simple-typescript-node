import { DataTypes } from 'sequelize';
import { Model, Table, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: "User" })
export default class User extends Model<User> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @Column({ type: new DataTypes.STRING(128), allowNull: false })
  public email: string;

  @Column({ type: new DataTypes.STRING(128), allowNull: false })
  public firstName: string;

  @Column({ type: new DataTypes.STRING(128), allowNull: false })
  public lastName: string;

  @Column({ type: new DataTypes.STRING(128), allowNull: false })
  public fullName: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public udatedAt: Date;
}
