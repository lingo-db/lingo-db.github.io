---
title: PIPE SQL Queries
weight: 1
---

LingoDB supports a subset of Google's PIPE SQL syntax, which allows you to write queries as a series of data transformations. This can make complex queries easier to read and write. A query consists of a data source (e.g., a table) followed by a series of operators, separated by `|>`.

## Simple Data Access

To start a query, specify the data source using the `from` keyword. You can then pipe this data through a series of operators.

```sql
-- Get all information about a specific student
from students
|> where studnr = 12;

-- Selecting specific columns
from students
|> select studnr, name
|> where studnr = 12;
```

To create new columns or perform calculations, use the `extend` operator.

```sql
from students
|> extend extract(year from birthday) as birthyear
|> select name, birthyear;
```

:::info[Unsupported Features (incomplete list)]
Expressions in the `select` clause are not yet supported. You must use `extend` to create new columns.
```sql
-- This is not supported:
from students
|> select name, extract(year from birthday) as birthyear;
```
:::

## Group By/Aggregations

For aggregations and groupings, the `aggregate` operator must be used. `aggregate` produces the grouping columns and then the aggregate columns. Aliases can be assigned directly to grouping expressions.

```sql
from lectures
|> aggregate min(weeklyhours) group by given_by as profNr;

-- Filter aggregated values using `where`
from lectures
|> aggregate min(weeklyhours) as minWeeklyHoours group by given_by as profNr
|> where minWeeklyHoours < 5;
```

:::info[Unsupported Features (incomplete list)]
This query fails because the parser cannot resolve the reference to `min(weeklyhours)` in the where clause.
It does recognizing that both refer to the same computed aggregate.
```sql
-- This is not supported:
from lectures
|> aggregate min(weeklyhours) group by given_by as profNr
|> where min(weeklyhours) < 5;
```
:::

## Window Functions

Window functions must be used in the `extend` operator.

```sql
from lectures
|> extend row_number() over (partition by given_by order by weeklyhours desc) as rn
|> where rn = 1;
```

## Joins

Pipe SQL introduces a `join` operator to join the input with another table. `LEFT`, `RIGHT`, and `FULL OUTER` joins are also supported.

```sql
-- Inner join
from students s
|> join attend h on h.studnr = s.studnr;

-- Left outer join
from students s
|> left join attend h on h.studnr = s.studnr;

-- Right outer join
from students s
|> right join attend h on h.studnr = s.studnr;

-- Full outer join
from students s
|> full join outer attend h on h.studnr = s.studnr;
```

## Sorting and Limiting

You can sort and limit your results using the `order by` and `limit` operators.

```sql
-- Sort students by name
from students
|> order by name;

-- Sort in descending order
from students
|> order by name desc;

-- Limit the number of results
from students
|> limit 10;

-- Combine sort and limit to get the top 10 students by matriculation number
from students
|> order by studnr
|> limit 10;
```
## Set Operations

LingoDB supports `UNION`, `UNION ALL`, `EXCPET` and `EXCPET ALL` to combine the result sets of two or more `SELECT` statements.

```sql
from attend
|> UNION (from attend)
```
:::info[Unsupported Features (incomplete list)]
Set operation operators currently to not support multiple queries
```sql
-- This is not supported:
from x
|> UNION (from y), (from z)
```
:::

## List of all supported pipe operators

The following table provides a summary of all supported pipe operators and their functions. These operators allow for a step-by-step transformation of your data.

| Operator       | Description |
|----------------|-------------|
| `SELECT <expr>, ...`| Keeps only the specified columns. |
| `EXTEND <expr> AS <name>, ...`| Adds new columns to the result. |
| `SET <column> = <expr>`| Updates the values in existing columns. |
| `DROP <column>, ...`| Removes specified columns from the result. |
| `WHERE <condition>, ...`| Filters rows based on one or more conditions. |
| `AGGREGATE <aggr> GROUP BY <group> [[AS] alias], ...` | Groups rows and calculates aggregate values. |
| `LIMIT <n>`| Limits the number of rows in the output. |
| `ORDER BY <expr> [ASC\|DESC], ...`| Sorts the result based on specified columns. |
| `{UNION\|INTERSECT\|EXCEPT} [ALL\|DISTINCT] <query>, ... ` | Combines results with other queries using set operations. |
|  `[LEFT\|...] JOIN <table> [ON <condition>]` | Joins the current result with another table. |

## Compatibility with Classic SQL

The pipe syntax can be combined with the classic SQL syntax in any way:

```sql
select * from students s
|> where studnr=1
|> join (select * from attend) h on h.studnr = s.studnr;
```
