---
title: Insert
weight: 110
---

LingoDB supports `INSERT` statements to add new rows to a table.

## Insert a single row

You can insert a single row by providing the values for each column.

```sql
INSERT INTO my_table (column1, column2, column3) VALUES ('value1', 123, 45.6);
```

If you are providing values for all columns in the order they appear in the table, you can omit the column names.

```sql
INSERT INTO my_table VALUES ('value1', 123, 45.6);
```

## Insert multiple rows

You can also insert multiple rows in a single statement.

```sql
INSERT INTO my_table (column1, column2) VALUES
  ('valueA', 1),
  ('valueB', 2),
  ('valueC', 3);
```

## Insert from a query

LingoDB also supports inserting data from the result of a `SELECT` query.

```sql
INSERT INTO my_table (column1, column2)
SELECT col_a, col_b FROM another_table WHERE col_c = 'some_condition';
```
