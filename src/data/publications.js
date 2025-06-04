export const primaryPublications = [
    {
        "ID": "2022-vldb-jungmair",
        "Title": "Designing an open framework for query optimization and compilation",
        "Author": ["Michael Jungmair", "André Kohn", "Jana Giceva"],
        "Date": "2022-09-05",
        "ConferenceAbbrv": "VLDB 2022",
        "ConferenceName": "48th International Conference on Very Large Data Bases (VLDB 2022)",
        "ConferenceLink": "https://vldb.org/2022/",
        "PDFLink": "https://www.vldb.org/pvldb/vol15/p2389-jungmair.pdf",
        "CiteLink": "https://dblp.org/rec/journals/pvldb/JungmairKG22",
        "Abstract": `Since its invention, data-centric code generation has been adopted for query compilation by various database systems in academia and industry. These database systems are fast but maximize performance at the expense of developer friendliness, flexibility, and extensibility. Recent advances in the field of compiler construction identified similar issues for domain-specific compilers and introduced a solution with MLIR, a generic infrastructure for domain-specific dialects.
            We propose a layered query compilation stack based on MLIR with open intermediate representations that can be combined at each layer. We further propose moving query optimization into the query compiler to benefit from the existing optimization infrastructure and make cross-domain optimization viable. With LingoDB, we demonstrate that the used approach significantly decreases the implementation effort and is highly flexible and extensible. At the same time, LingoDB achieves high performance and low compilation latencies.`
    },
    {
        "ID": "2023-vldb-jungmair",
        "Title": "Declarative Sub-Operators for Universal Data Processing",
        "Author": ["Michael Jungmair", "Jana Giceva"],
        "Date": "2023-08-28",
        "ConferenceAbbrv": "VLDB 2023",
        "ConferenceName": "49th International Conference on Very Large Data Bases (VLDB 2023)",
        "ConferenceLink": "https://vldb.org/2023/",
        "PDFLink": "https://db.in.tum.de/~jungmair/papers/p2799-jungmair.pdf",
        "CiteLink": "#",
        "Abstract": `Data processing systems face the challenge of supporting increasingly diverse workloads efficiently. At the same time, they are already bloated with internal complexity, and it is not clear how new hardware can be supported sustainably. In this paper, we aim to resolve these issues by proposing a unified abstraction layer based on declarative sub-operators in addition to relational operators. By exposing this layer to users, they can express their non-relational workloads declaratively with sub-operators. Furthermore, the proposed sub-operators decouple the semantic implementation of operators from the efficient imperative implementation, reducing the implementation complexity for relational operators. Finally, through fine-grained automatic optimizations, the declarative sub-operators allow for automatic morsel-driven parallelism. We demonstrate the benefits not only by providing a specific set of sub-operators but also implementing them in a compiling query engine. With thorough evaluation and analysis, we show that we can support a richer set of workloads while retaining the development complexity low and being competitive in performance even with specialized systems.`
    },
    {
        "ID": "2025-sigmod-demo-jungmair",
        "Title": "LingoDB-CT: Understanding LingoDB’s Inner Workings",
        "Author": ["Michael Jungmair"],
        "Date": "2025-06-22",
        "ConferenceAbbrv": "SIGMOD 2025 (Demo Paper)",
        "ConferenceName": "ACM SIGMOD/PODS International Conference on Management of Data",
        "ConferenceLink": "https://2025.sigmod.org/",
        "PDFLink": "https://db.in.tum.de/~jungmair/papers/lingodb-ct.pdf",
        "CiteLink": "#",
        "Abstract": `While compiling query engines can be highly efficient, especially for complex queries, they also have the reputation of being too difficult to understand, debug, and profile. However, this is not necessarily the case if supported by the right architecture and tools.
With this demonstration, we want to show this for our own compiling query engine LingoDB. For this purpose, we built an instrumentation and visualization framework called LingoDB-CT, which aggregates data from multiple angles and visualizes it to reveal the bigger picture. Through two interactive demonstration scenarios, using publicly hosted web applications, we show that LingoDB is indeed easy to understand and profile.`
    }
]