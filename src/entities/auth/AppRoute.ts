import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("auth_app_routes")
export class AppRoute {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  app: string;

  @Column()
  route: string;

}