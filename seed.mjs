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
const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

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

const calculateAmount = (type) => {
  const amountRanges = {
    Income: { min: 2000, max: 9000 },
    Expense: { min: 10, max: 1000 },
    Investment: { min: 3000, max: 10000 },
    Saving: { min: 3000, max: 10000 },
  };
  return faker.number.int(amountRanges[type]);
};

async function seed() {
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

  const { data, error } = await supabase
    .from("Transactions")
    .insert(transactions);

  if (error) {
    console.error("Error inserting data", error);
  } else {
    console.log("Data inserted", data);
  }
}

seed().catch(console.error);
