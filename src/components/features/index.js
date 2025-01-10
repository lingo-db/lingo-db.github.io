import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const Feature = ({icon, title, description}) => {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3"><FontAwesomeIcon icon={icon}/> &nbsp; {title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export const Features = ({features}) => {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {features.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
