const { z } = require("zod");

const bookSchema = z.object({
  
  isbn: z.number({ required_error: "ISBN number is required" }),

  bookName: z.string({ message: "Book name is required" }),

  authorName: z.string({ message: "Author name is required" }),

  yearOfPublication: z
    .number()
    .int({ message: "Year must be an integer" })
    .min(1000, { message: "Year must be at least 1000" })
    .max(new Date().getFullYear(), {
      message: "Year must be the current year or less",
    }),

  price: z.number().positive("Price must be a positive number"),

  discount: z
    .number()
    .nonnegative("Discount must be zero or positive")
    .optional(),

  numberOfPages: z
    .number()
    .int()
    .positive("Number of pages must be a positive integer"),

  condition: z.enum(["new", "used"], {
    message: "Condition must be either 'new' or 'used'",
  }),

  description: z.string().optional(),
});

module.exports = bookSchema;
