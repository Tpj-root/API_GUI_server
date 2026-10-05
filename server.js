
import express from "express";

import * as math from "./math/math.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static("public"));

// List available math functions
app.get("/api", (req, res) => {
  res.json({
    name: "My Math API",
    functions: Object.keys(math)
  });
});

// Calculate a result
app.post("/api/calculate", (req, res) => {
  const { operation, a, b } = req.body;

  const unary = ["sqrt", "sin", "cos", "tan", "abs"];
  const binary = ["add", "sub", "mul", "div", "pow"];

  if (typeof operation !== "string" ||
      (!unary.includes(operation) && !binary.includes(operation))) {
    return res.status(400).json({
      error: "Unknown math operation"
    });
  }

  if (a === undefined || a === null || a === "" ||
      !Number.isFinite(a)) {
    return res.status(400).json({
      error: "Input a must be a finite number"
    });
  }

  if (binary.includes(operation) &&
      (b === undefined || b === null || b === "" ||
       !Number.isFinite(b))) {
    return res.status(400).json({
      error: "Input b must be a finite number"
    });
  }

  if (unary.includes(operation) && b !== undefined &&
      b !== null && b !== "") {
    return res.status(400).json({
      error: "This operation only needs input a"
    });
  }

  try {
    const result = binary.includes(operation)
      ? math[operation](a, b)
      : math[operation](a);

    if (!Number.isFinite(result)) {
      return res.status(400).json({
        error: "Calculation did not produce a finite number"
      });
    }

    res.json({
      operation,
      a,
      ...(binary.includes(operation) ? { b } : {}),
      result
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Math GUI: http://localhost:${PORT}`);
  console.log(`Math API: http://localhost:${PORT}/api`);
});
