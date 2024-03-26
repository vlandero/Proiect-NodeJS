import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Review } from './Review.model';

@Table
export class Movie extends Model {
  @Column
  title!: string;

  @Column
  description!: string;

  @HasMany(() => Review)
  reviews!: Review[];
}
