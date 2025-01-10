import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './interface.module.css';


export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="LingoDB WebInterface">
            <main className={styles.webinterface_main}>
                <div className={styles.webinterface_container}>
                    <iframe src='https://interface.lingo-db.com' width="100%" height="100%"
                            style={{border:"None"}}></iframe>
                </div>
            </main>
        </Layout>
    );
}