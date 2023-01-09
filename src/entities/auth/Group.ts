import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("auth_groups")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  descr: string;
}
