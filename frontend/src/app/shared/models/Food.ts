export class Food {
  id!: string;
  name!: string;
  price!: number;
  tags?: Array<string>
  favorite!: boolean;
  stars!: number;
  imageUrl!: string;
  origins!: Array<string>;
  cookTime!:string;
}
