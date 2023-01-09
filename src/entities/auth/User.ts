import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Group } from "./Group";

@Entity("auth_users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(3, 100)
  username: string;

  @Column()
  @Length(8, 100)
  password: string;

  @Column()
  @Length(10, 200)
  fullname: string;

  @Column()
  @Length(5, 200)
  email: string;

  @Column()
  isSuperuser: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Group, { cascade: true })
  @JoinTable()
  groups: Group[];

  @RelationId((user: User) => user.groups)
  groupIds: number[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
