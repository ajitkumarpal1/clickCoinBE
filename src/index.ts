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
    incrimentCoin(userId: ID!):CoinMetaData
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    incrimentCoin: async (_: any, { userId }: { userId: string }) => {
      // Fetch current coin count
      const { data: currentData, error: fetchError } = await supabase
      .from('coinMetaData')
      .select('*')
      .eq('userId', userId)
      .single();
    
      // Handle errors fetching current data
      if (fetchError || !currentData) {
        console.error('Error fetching coin metadata:', fetchError);
        throw new Error(fetchError?.message || 'User not found or has no coins');
      }
      // Increment the coin count
      const newCoinCount = currentData.coinCount + 1;
      console.log("=>>>",newCoinCount)
      // Update the coin count in the database
      const { data: updatedData, error: updateError } = await supabase
        .from('coinMetaData')
        .update({ coinCount: newCoinCount }) // Set the new coin count
        .eq('userId', userId); // Ensure we update the correct user
    
      // Handle errors during the update
      if (updateError) {
        console.error('Error updating coin count:', updateError);
        throw new Error(updateError.message);
      }

      const { data:newdata, error:newEr } = await supabase
        .from('coinMetaData')
        .select('*')
        .eq('userId', userId)
        .single();

        if (newEr) {
          console.error('Error updating coin count:', newEr);
          throw new Error(newEr.message);
        }
      // Return the updated data
      return newdata; // This will return the updated record
    }
    ,
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
          const response = await fetch(`https://api.telegram.org/bot7864622420:AAFweAdwvbEKnbBGxILWRDAVFB2c-CmeL7w/getChat?chat_id=${userId}`);
          const telegramUser = await response.json();

          if (telegramUser.ok) {
            // User exists, insert into Supabase
            await supabase
              .from('coinMetaData')
              .insert([{ userId: userId }])
              .select();
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
