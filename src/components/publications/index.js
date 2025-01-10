import {primaryPublications} from "@site/src/data/publications.js";
import {useState} from "react";

const formatAuthors = (authors) => {
    if (!Array.isArray(authors) || authors.length === 0) {
        return "";
    }
    if (authors.length === 1) {
        return authors[0];
    }
    const lastAuthor = authors.pop();
    return `${authors.join(", ")}, and ${lastAuthor}`;
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

export const Publications = () => {
    return (
        <section>

            <div className="container">
                <div className="row">
                    <h2>Core Publications</h2>
                    {primaryPublications.map((publication) => {
                        return <Publication key={publication.ID} data={publication}/>;
                    })}
                </div>
            </div>
        </section>
    )
}