import { Table, Column, Model, BeforeCreate, BeforeUpdate, DataType } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  admin!: boolean;

  validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User): Promise<void> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}
