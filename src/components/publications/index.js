import {primaryPublications, externalPublications} from "@site/src/data/publications.js";
import {useState} from "react";

const formatAuthors = (authors) => {
    let authorsCopy = [...authors]; // Create a copy of the authors array to avoid modifying the original
    if (!Array.isArray(authorsCopy) || authors.length === 0) {
        return "";
    }
    if (authorsCopy.length === 1) {
        return authorsCopy[0];
    }
    const lastAuthor = authorsCopy.pop();
    return `${authorsCopy.join(", ")}, and ${lastAuthor}`;
}
const formatDateToMonthYear = (dateString) => {
    const date = new Date(dateString); // Parse the date string into a Date object
    const options = {year: 'numeric', month: 'long'}; // Format options for month and year
    return date.toLocaleDateString('en-US', options); // Format date using locale options
}


const Publication = ({data}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div style={{width: "100%", marginBottom: "10px"}}>
            <div className="card  shadow--tl">
                <a className="card__header d-flex justify-content-between align-items-center" onClick={() => {
                    setExpanded(!expanded)
                }}>
                    <div className='d-block'>
                        <h3 className='font-weight-bold mb-0'>
                            {data.Title}
                        </h3>
                        <p className="mb-0">
                            <strong>{data.ConferenceAbbrv}</strong> | {formatAuthors(data.Author)} | {formatDateToMonthYear(data.Date)}
                        </p>
                    </div>
                    <div>
                        <i className="fa fa-chevron-down ml-3"></i>
                    </div>

                </a>
                {expanded && (
                    <div id="collapse{{.ID}}" className="collapse" aria-labelledby="heading{{.ID}}">
                        <div className="card__body">
                            <p style={{fontWeight: "bold"}}>Abstract</p>
                            <div style={{whiteSpace: "pre-line"}}>
                                {data.Abstract}
                            </div>
                            <div style={{paddingTop: "1em", display: 'flex', alignItems: 'flex-end'}}>
                                <a className="button button--link" style={{marginRight: "auto"}}
                                   href={data.ConferenceLink} target="_blank">
                                    {data.ConferenceName}
                                </a>
                                {data.PDFLink && (
                                    <a className='button button--outline button--primary'
                                       href={data.PDFLink} target="_blank">
                                        Full Text
                                    </a>)}
                                {data.CiteLink && (
                                    <a className='button button--link'
                                       href={data.CiteLink} target="_blank">
                                        Cite
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}
const ExternalPublication = ({data}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div style={{width: "100%", marginBottom: "10px"}}>
            <div className="card  shadow--tl">
                <a className="card__header d-flex justify-content-between align-items-center" onClick={() => {
                    setExpanded(!expanded)
                }}>
                    <div className='d-block'>
                        <h3 className='font-weight-bold mb-0'>
                            {data.Title}
                        </h3>
                        <p className="mb-0">
                            <strong>{data.ConferenceAbbrv}</strong> | {formatAuthors(data.Author)} | <strong>{data.Organization}</strong> | {formatDateToMonthYear(data.Date)}
                        </p>
                    </div>
                    <div>
                        <i className="fa fa-chevron-down ml-3"></i>
                    </div>

                </a>
                {expanded && (
                    <div id="collapse{{.ID}}" className="collapse" aria-labelledby="heading{{.ID}}">
                        <div className="card__body">
                            <div style={{paddingTop: "1em", display: 'flex', alignItems: 'flex-end'}}>
                                <a className="button button--link" style={{marginRight: "auto"}}
                                   href={data.ConferenceLink} target="_blank">
                                    {data.ConferenceName}
                                </a>
                                {data.PDFLink && (
                                    <a className='button button--outline button--primary'
                                       href={data.PDFLink} target="_blank">
                                        Full Text
                                    </a>)}
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export const Publications = () => {
    return (
        <section>
            <div className="container">
                <div className="row" style={{ marginBottom: "2rem" }}>
                    <h2>Core Publications</h2>
                    {primaryPublications.map((publication) => {
                        return <Publication key={publication.ID} data={publication}/>;
                    })}
                </div>
                <div className="row" style={{ marginTop: "2rem" }}>
                    <h2>External Research Using LingoDB</h2>
                    {externalPublications.map((publication) => {
                        return <ExternalPublication key={publication.ID} data={publication}/>;
                    })}
                </div>
            </div>
        </section>
    );
};