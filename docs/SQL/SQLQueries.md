---
title: SQL Queries
weight: 1
---

LingoDB supports a subset of standard SQL queries. This document outlines the supported features and provides examples.

## Simple Data Access

You can retrieve data from tables using the `SELECT` statement.

```sql
-- Get all information about a specific student
SELECT * FROM students WHERE studnr = 12;

-- Selecting specific columns
SELECT studnr, name FROM students WHERE studnr = 12;
```

You can also use any kind of [expression](Expressions.md) in the `SELECT` list:
```sql
SELECT extract(year from birthday) FROM students;
```

## Sorting and Limiting

You can sort results using `ORDER BY` and limit the number of returned rows using `LIMIT`.

```sql
-- Sort students by name
SELECT * FROM students ORDER BY name;

-- Sort in descending order and limit results
SELECT * FROM students ORDER BY studnr DESC LIMIT 10;

-- You can also use column indices in ORDER BY
-- The following query sorts by the first column (studnr), then by the second (name)
SELECT studnr, name FROM students ORDER BY 1, 2;
```

## Joins

LingoDB supports `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins to combine rows from two or more tables.

```sql
-- Implicit inner join
SELECT * FROM students s, attend h WHERE h.studnr = s.studnr;

-- Explicit inner join
SELECT * FROM students s JOIN attend h ON h.studnr = s.studnr;

-- Left outer join
SELECT * FROM students s LEFT JOIN attend h ON h.studnr = s.studnr;
```

:::info[Unsupported Features (incomplete list)]
The `USING` clause for joins is not supported.
```sql
-- This is not supported:
SELECT * FROM students s LEFT JOIN attend h USING(studnr);
```
:::

## Group By and Aggregation

The `GROUP BY` clause is used with aggregate functions to group rows that have the same values in specified columns into summary rows.

```sql
SELECT given_by, MIN(weeklyhours) FROM lectures GROUP BY given_by;

-- Filter groups using HAVING
SELECT given_by, MIN(weeklyhours) FROM lectures GROUP BY given_by HAVING MIN(weeklyhours) < 5;

-- It is also possible to reference aggregate aliases in the HAVING clause
SELECT given_by, MIN(weeklyhours) AS minwWeklyhours FROM lectures GROUP BY given_by HAVING minwWeklyhours < 5;
```

The following aggregate functions are supported:

| Function | Description |
|---|---|
| `MIN(x)` | Returns the minimum value of x. |
| `MAX(x)` | Returns the maximum value of x. |
| `SUM(x)` | Returns the sum of all x values. |
| `COUNT(x)` | Returns the number of rows with a non-null value for x. |
| `AVG(x)` | Returns the average value of x. |
| `COUNT(*)`| Returns the total number of rows. |
| `STDDEV_SAMP(x)`| Returns the sample standard deviation of x. |

Furthermore, `DISTINCT` can be used with any aggregate function to aggregate only unique values (e.g., `COUNT(DISTINCT x)`).

## Window Functions

A subset of window functions is supported. Window functions perform calculations across a set of table rows that are somehow related to the current row.

```sql
-- Example: Find the lecture with the highest weeklyhours for each professor
SELECT * FROM (
  SELECT *, RANK() OVER (PARTITION BY given_by ORDER BY weeklyhours DESC) as r
  FROM lectures
) WHERE r = 1;

-- Window functions with frame clauses are also supported
SELECT sum(x) OVER (PARTITION BY y ORDER BY z ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) ...
SELECT sum(x) OVER (PARTITION BY y ORDER BY z ROWS BETWEEN 100 PRECEDING AND 100 FOLLOWING) ...
```

The following window functions are supported in addition to aggregate functions:

| Function | Description |
|---|---|
| `RANK()` | Returns the rank of the current row within its partition, with gaps. |
| `DENSE_RANK()` | Returns the rank of the current row within its partition, without gaps. |
| `ROW_NUMBER()` | Returns the number of the current row within its partition. |

:::info[Unsupported Features (incomplete list)]
Window frame boundaries currently only support constant values.
```sql
-- This is not supported:
SELECT sum(x) OVER (PARTITION BY y ORDER BY z ROWS BETWEEN 99+1 PRECEDING AND 99+1 FOLLOWING) ...
-- This is not supported:
SELECT sum(x) OVER (PARTITION BY y ORDER BY z ROWS BETWEEN x PRECEDING AND x FOLLOWING) ...
```
:::

## Set Operations

LingoDB supports `UNION`, `UNION ALL`, `EXCPET` and `EXCPET ALL` to combine the result sets of two or more `SELECT` statements.

```sql
SELECT studnr FROM students
UNION
SELECT studnr FROM attend;
``` 

## Common Table Expressions (CTEs)

Common Table Expressions are useful for structuring complex queries.

```sql
WITH goodStudents AS (
  SELECT s.* FROM students s JOIN test t ON s.studnr = t.studnr WHERE t.grade < 2.0
)
SELECT * FROM goodStudents;
```

It is also possible to assign custom column names in the CTE definition:
```sql
WITH matrix (x, y, z) AS (VALUES (1, 2, 0), (1, 4, 2))
SELECT * FROM matrix;
```

:::info[Unsupported Features (incomplete list)]
**Recursive CTEs** are not supported.
```sql
-- This is not supported:
WITH RECURSIVE t(n) AS (
  VALUES (1)
  UNION ALL
  SELECT n+1 FROM t WHERE n < 100
)
SELECT sum(n) FROM t;
```
:::