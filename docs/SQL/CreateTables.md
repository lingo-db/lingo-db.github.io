---
title: Create Tables
weight: 100
---
LingoDB provides core functionality for creating tables

```sql
create table t(
    -- usual column definitions
    a string,
    b int primary key -- define primary key,
    c decimal(4,2),
    d float(2) not null,
    -- ...
    -- define primary key
    primary key(a)
)
```
[Supported Types](./Types.md)

:::info[Unsupported Features (incomplete list)]
Statements like `create table as` are not supported
```sql
create table y as 
    select * 
    from z
```
`unique` constraint is not yet supported
```sql
create table t(
    a string unique --not supported
)
```
:::


