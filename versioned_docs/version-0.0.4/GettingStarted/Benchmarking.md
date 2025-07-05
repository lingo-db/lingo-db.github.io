LingoDB supports common OLAP benchmarks such as TPC-H, TPC-DS, JOB and SSB.

## Please avoid common pitfalls
* ***Don't use one invocation of the `sql` command to both define the schema and import the data and then run benchmark queries*** This behavior is expected to be resolved in the future!
* Use the right LingoDB version. If you want to reproduce LingoDB's performance reported in a paper, please use the according LingoDB version:
  * [VLDB'22](https://github.com/lingo-db/lingo-db/releases/tag/paper-vldb-2022) 
  * [VLDB'23](https://github.com/lingo-db/lingo-db/releases/tag/paper-vldb-2023)
* Also note, that the numbers reported as execution time in VLDB'22 and VLDB'23 *exclude compilation times* 
* Do *not* manually create Apache Arrow files, but instead use the `sql` command to define tables and import data. If you miss relevant metadata information (e.g., primary keys), LingoDB will not be able to apply many optimizations and performance will be suboptimal.
* Use a release build of LingoDB for benchmarking. Debug builds are significantly slower.


## Manual steps
### Data Generation
For some benchmarks, the LingoDB repository contains scripts to generate data:
```sh
# DATA_DIR is the directory where the csv files should be stored
# SF is the scale factor, e.g., 1 for 1GB, 10 for 10GB, etc.

# Generate TPC-H database
bash tools/generate/tpch.sh DATA_DIR SF
# Generate TPC-DS database
bash tools/generate/tpcds.sh DATA_DIR SF
# Generate JOB database
bash tools/generate/job.sh DATA_DIR
# Generate SSB database
bash tools/generate/ssb.sh DATA_DIR SF
```

### Data Loading 
```sh
# DB_DIR is the directory where the final database files should be stored
cd DATA_DIR
[LINGODB_BINARY_DIR]/sql DB_DIR < [REPO_ROOT]/resources/sql/tpch/initialize.sql # replace tpch with tpcds, job, ssb ...
```

## Makefile target
There is a convenience Makefile target for both generating and loading a set of datasets.
```sh
make resources/data/[NAME]-[SF]/.stamp

# For example

make resources/data/tpch-1/.stamp
make resources/data/tpch-10/.stamp
make resources/data/tpcds-1/.stamp
make resources/data/ssb-1/.stamp

make resources/data/job/.stamp

```
This will prepare the requested dataset (with scale factor) in the `resources/data/[NAME]-[SF]` directory

## Running LingoDB

Afterward, queries can be for examle run with the `sql` command that also reports execution times when the `LINGODB_SQL_REPORT_TIMES` environment variable is set:
```sh
LINGODB_SQL_REPORT_TIMES=1 sql DB_DIR
sql>select count(*) from lineitem;
|                         count  |
----------------------------------
|                       6001215  |
 compilation: 95.79 [ms] execution: 2.815 [ms]
```

