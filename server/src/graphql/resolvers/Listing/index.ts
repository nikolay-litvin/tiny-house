import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";
import { ObjectId } from "mongodb";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined, 
      _args: unknown, // в коде стоит пустой объект {}
      { db }: {db: Database}
      ): Promise<Listing[]> => {
      // throw new Error("Error!"); // для тестинга ошибки
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string},
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if(!deleteRes.value) {
        throw new Error("failed to delete listing");
      }
      return deleteRes.value;
    }
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString()
  }
};
