import React, {createContext, useContext} from 'react';
import styles from './styles.module.css';

// Optional context. Present only when you wrap content in <NumberingProvider>.
// Without it, <Table>/<Figure> still work with a manual `number` prop or no number.
const NumberingContext = createContext(null);

/**
 * Wrap a region (a page, a section, a blog post body) to enable automatic
 * numbering of every <Table> and <Figure> inside it, plus inline
 * cross-references via <Ref>.
 *
 * Numbering is driven by the declared, ordered id lists below rather than by
 * render order, so <Ref id="..."/> resolves even when it appears *before* its
 * target in the text (and it stays SSR-stable).
 *
 *   <NumberingProvider
 *     tables={['first-table', 'second-table']}
 *     figures={['first-figure', 'second-figure']}
 *   >
 */
export function NumberingProvider({children, tables = [], figures = []}) {
  const numbers = new Map();
  tables.forEach((id, i) => numbers.set(id, {prefix: 'Table', number: i + 1}));
  figures.forEach((id, i) => numbers.set(id, {prefix: 'Figure', number: i + 1}));

  return (
    <NumberingContext.Provider value={numbers}>
      {children}
    </NumberingContext.Provider>
  );
}

// Look up the {prefix, number} entry declared for an id, if any.
function useEntry(id) {
  const map = useContext(NumberingContext);
  return id != null && map ? map.get(id) : undefined;
}

/**
 * Shared building block: a <figure> with a numbered <figcaption>.
 *
 * Props:
 *  - caption   (node)    the caption text/JSX. Required.
 *  - prefix    (string)  label word, e.g. "Table" or "Figure".
 *  - number    (number)  explicit number. Overrides the declared numbering.
 *  - id        (string)  anchor id, also used to resolve the declared number.
 *  - className (string)  class for the <figure> element.
 */
function CaptionedFigure({children, caption, prefix, number, id, className}) {
  const entry = useEntry(id);
  const resolvedNumber = number ?? entry?.number;

  return (
    <figure className={className} id={id}>
      {children}
      <figcaption className={styles.caption}>
        {resolvedNumber != null && (
          <span className={styles.label}>{prefix}&nbsp;{resolvedNumber}.</span>
        )}{' '}
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * A captioned table. Pass the Markdown table as children (in MDX leave blank
 * lines around it). See CaptionedFigure for the shared props.
 */
export function Table({children, caption, number, id}) {
  return (
    <CaptionedFigure
      prefix="Table"
      caption={caption}
      number={number}
      id={id}
      className={styles.table}
    >
      <div className={styles.scroll}>{children}</div>
    </CaptionedFigure>
  );
}

/**
 * A captioned figure (image, diagram, ...). Pass the visual as children.
 * See CaptionedFigure for the shared props.
 */
export function Figure({children, caption, number, id}) {
  return (
    <CaptionedFigure
      prefix="Figure"
      caption={caption}
      number={number}
      id={id}
      className={styles.figure}
    >
      {children}
    </CaptionedFigure>
  );
}

/**
 * Inline cross-reference. Renders a link like "Table 2" / "Figure 1" that
 * jumps to the matching table/figure anchor. Resolves through the numbers
 * declared on <NumberingProvider>.
 */
export function Ref({id}) {
  const entry = useEntry(id);
  if (!entry) {
    return <a href={`#${id}`}>{id}</a>;
  }
  return (
    <a href={`#${id}`}>
      {entry.prefix}&nbsp;{entry.number}
    </a>
  );
}
