import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createSchema, createYoga } from 'graphql-yoga';
import supabase from './config/db.js';

// GraphQL type definitions and resolvers
const typeDefs = `
  scalar Date

  type CoinMetaData {
    id: ID!
    userId: ID!
    coinCount: Int!
    created_at: Date
  }

  type Query {
    hello: String
    getCoinMetaDataByUserId(userId: ID!): CoinMetaData
  }

  type Mutation {
    incrimentCoin(userId: ID!, increment: Int!): CoinMetaData
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',

    getCoinMetaDataByUserId: async (_: any, { userId }: { userId: string }) => {
      // Fetch coin metadata from Supabase
      const { data, error } = await supabase
        .from('coinMetaData')
        .select('*')
        .eq('userId', userId)
        .single();

      // Check if data exists
      if (data) {
        return data; // Return existing metadata if found
      }

      // Handle case when no data is found
      if (!data) {
        try {
          const response = await fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getChat?chat_id=${userId}`);
          const telegramUser = await response.json();

          if (telegramUser.ok) {
            // Insert new user into Supabase if found
            await supabase
              .from('coinMetaData')
              .insert([{ userId: userId, coinCount: 0 }]);

            const { data: newData, error: insertError } = await supabase
              .from('coinMetaData')
              .select('*')
              .eq('userId', userId)
              .single();

            if (insertError) {
              console.error('Error inserting new user:', insertError);
              throw new Error('Error inserting new user');
            }

            return newData; // Return the newly inserted data
          } else {
            console.log('User does not exist or is not accessible:', telegramUser.description);
            throw new Error('User does not exist or is not accessible');
          }
        } catch (error) {
          console.error('Error checking user ID:', error);
          throw new Error('Error checking user ID');
        }
      }

      return null; // Return null if no data and no user found
    },
  },

  Mutation: {
    incrimentCoin: async (_: any, { userId, increment }: { userId: string; increment: number }) => {


      // Update the coin count in the database
      const tp = await supabase
        .from('coinMetaData')
        .update({ coinCount: increment }) // Set the new coin count
        .eq('userId', userId);
      console.log(tp)
      const { data: updatedData, error: updateError } = tp
      if (updateError) {
        console.error('Error updating coin count:', updateError);
        throw new Error(updateError.message);
      }

      const { data: userD, error: fatchinErr } = await supabase
        .from('coinMetaData')
        .select("*") // Set the new coin count
        .eq('userId', userId)
        .single();
        console.log(userD)
        if (fatchinErr) {
          console.error('Error updating coin count:', fatchinErr);
          throw new Error(fatchinErr.message);
        }
      // Return the updated data
      return userD; // This will return the updated record
    },
  },
};

// Create the schema using graphql-yoga
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create the Yoga server
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
});

// Use Yoga middleware
app.use('/graphql', yoga);

// Simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Go to /graphql');
});

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
