// @ts-check
import { MemoBody } from './Preview/MemoBody'
import { MemoDate } from './Preview/MemoDate'
import { MemoEmbedUrls } from './Preview/MemoEmbedUrls'
import { MemoTags } from './Preview/MemoTags'

function MaybeLink({ href, children }) {
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex">
      {children}{' '}
      <svg
        width="16"
        height="16"
        viewBox="0 0 48 48"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-0.5"
      >
        <path d="M22.5 34H14C11.1667 34 8.79167 33.0417 6.875 31.125C4.95833 29.2083 4 26.8333 4 24C4 21.1667 4.95833 18.7917 6.875 16.875C8.79167 14.9583 11.1667 14 14 14H22.5V17H14C12 17 10.3333 17.6667 9 19C7.66667 20.3333 7 22 7 24C7 26 7.66667 27.6667 9 29C10.3333 30.3333 12 31 14 31H22.5V34ZM16.25 25.5V22.5H31.75V25.5H16.25ZM25.5 34V31H34C36 31 37.6667 30.3333 39 29C40.3333 27.6667 41 26 41 24C41 22 40.3333 20.3333 39 19C37.6667 17.6667 36 17 34 17H25.5V14H34C36.8333 14 39.2083 14.9583 41.125 16.875C43.0417 18.7917 44 21.1667 44 24C44 26.8333 43.0417 29.2083 41.125 31.125C39.2083 33.0417 36.8333 34 34 34H25.5Z" />
      </svg>
    </a>
  ) : (
    children
  )
}

/**
 *
 * @param {object} props
 * @param {string} props.type
 * @param {import('$lib/types').MemoRecord[]} props.items
 */
function Preview({ items }) {
  return (
    <div className="items">
      {items.map(({ id, fields }) => {
        return (
          <div
            key={id}
            className="border border-sky-900 rounded-md overflow-hidden mt-4 first:mt-0"
          >
            {Object.keys(fields.serialize.frontmatter).length > 0 && (
              <div className="flex items-center justify-between h-9 p-4 py-2 text-xs bg-sky-900/40">
                <MaybeLink href={fields.serialize.frontmatter.url}>
                  {fields.serialize.frontmatter.title}
                </MaybeLink>
                <MemoEmbedUrls embed={fields.serialize.frontmatter.embed} />
              </div>
            )}
            <MemoBody serialize={fields.serialize} />
            <div className="flex justify-between items-center p-4 text-[10px] text-gray-300">
              <MemoTags tags={fields.tags} />
              <MemoDate
                createdAt={fields.createdAt}
                lastModified={fields.lastModified}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Preview
