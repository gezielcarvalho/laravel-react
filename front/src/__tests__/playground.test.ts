/**
 * Tests for playground.ts functions
 * This file tests all the experimental functions and utilities in playground.ts
 */

// Import your playground functions to test them
import {
  stringUtils,
  mathUtils,
  arrayUtils,
  Calculator,
  asyncUtils,
  dataGenerators,
  validators,
  ValidationError,
} from "../playground";

// ================================
// PLAYGROUND FUNCTION TESTS
// ================================

describe("Playground Functions", () => {
  describe("stringUtils", () => {
    it("should capitalize strings", () => {
      expect(stringUtils.capitalize("hello")).toBe("Hello");
      expect(stringUtils.capitalize("WORLD")).toBe("WORLD");
      expect(stringUtils.capitalize("")).toBe("");
    });

    it("should reverse strings", () => {
      expect(stringUtils.reverse("hello")).toBe("olleh");
      expect(stringUtils.reverse("abc")).toBe("cba");
      expect(stringUtils.reverse("")).toBe("");
    });

    it("should check palindromes", () => {
      expect(stringUtils.isPalindrome("racecar")).toBe(true);
      expect(stringUtils.isPalindrome("A man a plan a canal Panama")).toBe(
        true
      );
      expect(stringUtils.isPalindrome("hello")).toBe(false);
    });

    it("should truncate strings", () => {
      expect(stringUtils.truncate("Hello World", 5)).toBe("Hello...");
      expect(stringUtils.truncate("Hi", 10)).toBe("Hi");
    });
  });

  describe("mathUtils", () => {
    it("should add numbers", () => {
      expect(mathUtils.add(2, 3)).toBe(5);
      expect(mathUtils.add(-1, 1)).toBe(0);
    });

    it("should calculate factorial", () => {
      expect(mathUtils.factorial(5)).toBe(120);
      expect(mathUtils.factorial(0)).toBe(1);
      expect(() => mathUtils.factorial(-1)).toThrow(
        "Factorial of negative number is not defined"
      );
    });

    it("should check prime numbers", () => {
      expect(mathUtils.isPrime(2)).toBe(true);
      expect(mathUtils.isPrime(17)).toBe(true);
      expect(mathUtils.isPrime(4)).toBe(false);
      expect(mathUtils.isPrime(1)).toBe(false);
    });

    it("should calculate fibonacci numbers", () => {
      expect(mathUtils.fibonacci(0)).toBe(0);
      expect(mathUtils.fibonacci(1)).toBe(1);
      expect(mathUtils.fibonacci(5)).toBe(5);
      expect(mathUtils.fibonacci(10)).toBe(55);
      expect(() => mathUtils.fibonacci(-1)).toThrow(
        "Fibonacci of negative number is not defined"
      );
    });
  });

  describe("arrayUtils", () => {
    it("should return unique values", () => {
      expect(arrayUtils.unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(arrayUtils.unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
    });

    it("should chunk arrays", () => {
      expect(arrayUtils.chunk([1, 2, 3, 4, 5], 2)).toEqual([
        [1, 2],
        [3, 4],
        [5],
      ]);
      expect(arrayUtils.chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });

    it("should flatten arrays", () => {
      expect(arrayUtils.flatten([1, [2, 3], [4, [5]]])).toEqual([
        1, 2, 3, 4, 5,
      ]);
    });

    it("should shuffle arrays", () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = arrayUtils.shuffle(original);
      expect(shuffled).toHaveLength(5);
      expect(shuffled).toEqual(expect.arrayContaining(original));
      expect(original).toEqual([1, 2, 3, 4, 5]); // Original unchanged
    });
  });

  describe("Calculator class", () => {
    let calc: Calculator;

    beforeEach(() => {
      calc = new Calculator();
    });

    it("should perform basic operations", () => {
      expect(calc.add(2, 3)).toBe(5);
      expect(calc.subtract(5, 2)).toBe(3);
      expect(calc.multiply(3, 4)).toBe(12);
      expect(calc.divide(10, 2)).toBe(5);
    });

    it("should throw error on division by zero", () => {
      expect(() => calc.divide(5, 0)).toThrow(
        "Division by zero is not allowed"
      );
    });

    it("should track calculation history", () => {
      calc.add(2, 3);
      calc.multiply(4, 5);
      const history = calc.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0]).toContain("2 + 3 = 5");
      expect(history[1]).toContain("4 × 5 = 20");
    });

    it("should clear history", () => {
      calc.add(1, 1);
      calc.clearHistory();
      expect(calc.getHistory()).toHaveLength(0);
    });
  });

  describe("asyncUtils", () => {
    it("should delay execution", async () => {
      const start = Date.now();
      await asyncUtils.delay(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90); // Allow some tolerance
    });

    it("should timeout promises", async () => {
      const slowPromise = new Promise((resolve) => setTimeout(resolve, 200));
      await expect(asyncUtils.timeout(slowPromise, 100)).rejects.toThrow(
        "Operation timed out"
      );
    });

    it("should retry failed operations", async () => {
      let attempts = 0;
      const failingFunction = () => {
        attempts++;
        if (attempts < 3) {
          return Promise.reject(new Error("Not yet"));
        }
        return Promise.resolve("Success!");
      };

      const result = await asyncUtils.retry(failingFunction, 3, 10);
      expect(result).toBe("Success!");
      expect(attempts).toBe(3);
    });
  });

  describe("validators", () => {
    it("should validate emails", () => {
      expect(validators.isEmail("test@example.com")).toBe(true);
      expect(validators.isEmail("invalid-email")).toBe(false);
      expect(validators.isEmail("test@")).toBe(false);
    });

    it("should validate strong passwords", () => {
      expect(validators.isStrongPassword("Abc123@!")).toBe(true);
      expect(validators.isStrongPassword("password")).toBe(false);
      expect(validators.isStrongPassword("12345678")).toBe(false);
    });

    it("should validate phone numbers", () => {
      expect(validators.isPhoneNumber("+1234567890")).toBe(true);
      expect(validators.isPhoneNumber("(555) 123-4567")).toBe(true);
      expect(validators.isPhoneNumber("123")).toBe(false);
    });

    it("should validate URLs", () => {
      expect(validators.isUrl("https://example.com")).toBe(true);
      expect(validators.isUrl("http://localhost:3000")).toBe(true);
      expect(validators.isUrl("not-a-url")).toBe(false);
    });
  });

  describe("dataGenerators", () => {
    it("should create mock users", () => {
      const user = dataGenerators.createUser();
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user.isActive).toBe(true);
    });

    it("should create custom users", () => {
      const user = dataGenerators.createUser({ name: "Custom Name", age: 25 });
      expect(user.name).toBe("Custom Name");
      expect(user.age).toBe(25);
    });

    it("should create multiple users", () => {
      const users = dataGenerators.createUsers(3);
      expect(users).toHaveLength(3);
      expect(users[0].name).toBe("User 1");
      expect(users[2].name).toBe("User 3");
    });

    it("should create mock products", () => {
      const product = dataGenerators.createProduct();
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product.inStock).toBe(true);
    });

    it("should create custom products", () => {
      const product = dataGenerators.createProduct({
        name: "Custom Product",
        price: 199.99,
      });
      expect(product.name).toBe("Custom Product");
      expect(product.price).toBe(199.99);
    });
  });

  describe("Error classes", () => {
    it("should create ValidationError", () => {
      const error = new ValidationError("Invalid input", "email");
      expect(error.message).toBe("Invalid input");
      expect(error.field).toBe("email");
      expect(error.name).toBe("ValidationError");
      expect(error).toBeInstanceOf(Error);
    });
  });
});

/*
 * 🎯 PLAYGROUND TESTING TIPS:
 *
 * 1. Add tests for new functions you create in playground.ts
 * 2. Test both happy path and edge cases
 * 3. Use describe() to group related function tests
 * 4. Test error conditions with expect().toThrow()
 * 5. For async functions, use async/await pattern
 * 6. Test TypeScript types and interfaces
 *
 * 🚀 ADDING NEW TESTS:
 * 1. Add your function to playground.ts
 * 2. Import it at the top of this file
 * 3. Create a new describe() block or add to existing one
 * 4. Write comprehensive tests for all scenarios
 */
