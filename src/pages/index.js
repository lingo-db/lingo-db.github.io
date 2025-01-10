import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAnglesRight,
    faCodeFork,
    faDiagramProject,
    faGauge,
    faGears,
    faMicrochip,
    faPlay
} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import {Publications} from "../components/publications";
import {Features} from "../components/features";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--dark', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button  button--primary button--lg"
                        to="/interface">
                        <FontAwesomeIcon icon={faPlay}/> &nbsp; Try Demo now
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                        className="button button--secondary button--lg"
                        to="https://github.com/lingo-db/lingo-db">
                        <FontAwesomeIcon icon={faGithub}/> &nbsp; Code on Github
                    </Link>
                </div>
            </div>
        </header>
    );
}

const features = [
    {
        title: 'Complex SQL',
        icon: faGauge,
        description: (
            <>
                LingoDB can run complex analytical SQL queries and thus supports all queries of benchmarks like SSB,
                TPC-H, TPC-DS, and JOB.
            </>
        ),
    },

    {
        title: 'Query Optimization',
        icon: faDiagramProject,
        description: (
            <>
                LingoDB implements state-of-the-art query optimizations as compiler passes, which allows for composing
                custom optimization pipeline, e.g., for cross-domain optimization.
            </>
        ),
    },
    {
        title: 'JIT Query Compilation',
        icon: faGauge,
        description: (
            <>
                LingoDB heavily builds on the MLIR compiler framework for compiling queries to efficient machine code
                without much latency.
            </>
        ),
    },
    {
        title: 'Flexibility',
        icon: faCodeFork,
        description: (
            <>
                LingoDB uses multiple layers of extendable intermediate representations. This approach allows for high
                flexibility by exchanging layers and targeting different execution platforms.
            </>
        ),
    },
    {
        title: 'Apache Arrow',
        icon: faAnglesRight,
        description: (
            <>
                By using Apache Arrow as in-memory storage format, LingoDB can efficiently interface with other systems
                and libraries without copying data.
            </>
        ),
    },
    {
        title: 'Open Source',
        icon: faGithub,
        description: (
            <>
                LingoDB is open source under the MIT License.
            </>
        ),
    },
];

const research_directions = [
    {
        title: 'Query Engine Design',
        icon: faGears,
        description: (
            <>
                Through its flexible design, LingoDB facilitates fundamental research regarding query engine
                architectures.
            </>
        ),
    },

    {
        title: 'Heterogeneous Hardware',
        icon: faMicrochip,
        description: (
            <>
                By using a layered design with sub-operators and building on MLIR, LingoDB is an ideal research tool for
                investigating heterogeneous hardware for data processing.
            </>
        ),
    },
    {
        title: 'Cross-Domain Optimization and Execution',
        icon: faGauge,
        description: (
            <>
                LingoDB's design allows for representing both SQL queries and other domains which simplifies resarch on
                cross-domain execution and optimization.
            </>
        ),
    }
];

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="LingoDB Website">
            <HomepageHeader/>
            <main>
                <Features features={features}/>
                <div className={styles.lightSection} style={{textAlign: "center"}}>
                    <h1 style={{
                        fontSize: "2.5em",
                        paddingBottom: "0.5em"
                    }}>Research Directions</h1>
                    <Features features={research_directions}/>
                </div>
                <div className={styles.darkerSection}>
                    <h1 style={{
                        textAlign: "center",
                        width: "100%",
                        fontSize: "2.5em",
                        paddingBottom: "1em"
                    }}>Understanding LingoDB</h1>
                    <Publications/>
                </div>
                <div className={styles.lightSection} style={{textAlign: "center"}}>
                    <h1 style={{
                        fontSize: "2.5em",
                        paddingBottom: "0.5em"
                    }}>Team</h1>
                    <div className="container">
                        <div className='row'>
                            <div className="col col--4">
                                <a href='https://jungmair.dev' target="_blank" id="tile">
                                    <img style={{borderRadius: "75px"}} src='/img/jungmair.jpg' height="150px"/>
                                    <h4 className="font-weight-bold">Michael Jungmair</h4>
                                    <h5>Project Lead</h5>
                                </a>
                            </div>

                            <div className="col col--4">
                                <a id='tile' target="_blank" href="https://db.in.tum.de/~giceva/">
                                    <img style={{borderRadius: "75px"}} src='img/giceva_profile.jpg'
                                         height="150px"/>
                                    <h4 className="font-weight-bold">Prof. Dr. Jana Giceva</h4>
                                    <h5>Advisor</h5>
                                </a>
                            </div>
                            <div className="col col--4">
                                <a id='tile' target="_blank" href="https://db.in.tum.de/~engelke/">
                                    <img style={{borderRadius: "75px"}} className='rounded-circle mb-4'
                                         src='img/engelke.png' height="150px"/>
                                    <h4 className="font-weight-bold">Dr. Alexis Engelke</h4>
                                    <h5>Collaborator</h5>
                                </a>
                            </div>
                        </div>
                        <div className='row'>
                            <h2 style={{width: "100%"}}>Students</h2>
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Student</th>
                                        <th scope="col">Topic</th>
                                        <th scope="col">Advisor(s)</th>
                                        <th scope="col">Type</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Robert Imschweiler</td>
                                        <td>Transforming Data Frame Operations from Python to MLIR</td>
                                        <td>Engelke, Jungmair</td>
                                        <td>B.Sc. Thesis</td>
                                    </tr>
                                    <tr>
                                        <td>Florian Drescher</td>
                                        <td>A template-based code generation backend for MLIR</td>
                                        <td>Engelke</td>
                                        <td>Guided Research</td>
                                    </tr>
                                    <tr>
                                        <td>Raoul Zebisch</td>
                                        <td>Sub-Operator Placement on GPUs for accelerating analytical queries</td>
                                        <td>Jungmair</td>
                                        <td>M.Sc. Thesis</td>
                                    </tr>
                                    <tr>
                                        <td>Pascal Ginter</td>
                                        <td>C-Backend, Index-Nested Loop Joins, Query Plan Visualization</td>
                                        <td>Jungmair</td>
                                        <td>Research Assistant</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.darkerSection} style={{textAlign: "center"}}>
                    <h1 style={{
                        fontSize: "2.5em",
                        paddingBottom: "0.5em"
                    }}>Let's Work together. Get in Touch!</h1>
                    <p style={{fontWeight: "bold", fontSize: "1.3em"}}>Contact us for student theses,
                        collaborations,
                        and research opportunities.</p>
                    <a className='button button--primary button button--lg' href='mailto:info@lingo-db.com'
                       target="_blank"><FontAwesomeIcon icon={faEnvelope}/> Email Us </a>
                </div>

            </main>
        </Layout>
    );
}