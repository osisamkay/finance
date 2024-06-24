import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

// Load environment variables from .env.local file
dotenv.config({ path: "./.env.local" });

// Initialize Supabase client with URL and service role key from environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// Define categories for expense transactions
const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

/**
 * Select a transaction type and category.
 *
 * @returns {Object} An object containing the type and category of the transaction.
 */
const selectTypeAndCategory = () => {
  const typeBias = Math.random();
  if (typeBias < 0.8) {
    return {
      type: "Expense",
      category: faker.helpers.arrayElement(categories),
    };
  } else if (typeBias < 0.9) {
    return { type: "Income", category: null };
  } else {
    return {
      type: faker.helpers.arrayElement(["Saving", "Investment"]),
      category: null,
    };
  }
};

/**
 * Calculate the amount for a transaction based on its type.
 *
 * @param {string} type - The type of the transaction.
 * @returns {number} The calculated amount for the transaction.
 */
const calculateAmount = (type) => {
  const amountRanges = {
    Income: { min: 2000, max: 9000 },
    Expense: { min: 10, max: 1000 },
    Investment: { min: 3000, max: 10000 },
    Saving: { min: 3000, max: 10000 },
  };
  return faker.number.int(amountRanges[type]);
};

/**
 * Seed the database with fake transactions.
 *
 * This function creates 10 fake transactions with randomized data and inserts
 * them into the Supabase 'transactions' table.
 */
async function seed() {
  // Generate an array of 10 fake transactions
  const transactions = Array.from({ length: 10 }, () => {
    const { type, category } = selectTypeAndCategory();
    return {
      created_at: faker.date.past(),
      amount: calculateAmount(type),
      type,
      description: faker.lorem.sentence(),
      category,
    };
  });

  // Insert the fake transactions into the 'transactions' table
  const { error } = await supabase.from("transactions").insert(transactions);

  // Log the result
  if (error) {
    console.error("Error inserting data", error);
  } else {
    console.log("Data inserted");
  }
}

// Execute the seed function and catch any errors
seed().catch(console.error);
