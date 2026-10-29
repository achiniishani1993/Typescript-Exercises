
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "../sequelize";

class Loans extends Model<
  InferAttributes<Loans>,
  InferCreationAttributes<Loans>
> {
  declare id: CreationOptional<number>;
  declare book_id: number;
  declare member_id: number;
  declare borrowed_at: CreationOptional<Date>;
  declare returned_at: Date | null;
}

Loans.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrowed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returned_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "loans",
    timestamps: false,
  }
);

export default Loans;
