import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User.model';
import { Movie } from './Movie.model';

@Table
export class Review extends Model {
  @Column
  rating!: number;

  @Column
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Movie)
  movie!: Movie;
}
