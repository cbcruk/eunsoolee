import Link from 'next/link'
import { day, fromNow } from '../lib/time'

function Preview({ type, items }) {
  return (
    <div className="items">
      {items.map(
        ({
          number,
          title,
          bodyText,
          comments: { totalCount },
          createdAt,
          updatedAt,
        }) => {
          return (
            <div
              key={number}
              className="p-2 hover:bg-gray-700 rounded-md hover:shadow-md mt-2 first:mt-0 font-sans transition-all"
            >
              <Link href={`/${type}/${number}`}>
                <a>
                  <div className="block md:flex items-center gap-2">
                    <h2 className="flex items-center gap-2 text-lg font-bold">
                      {title}
                    </h2>
                    <span className="hidden md:block">-</span>
                    <p className="mt-1 text-sm">
                      {bodyText}
                      <span className="inline-block w-5 aspect-square p-1 rounded-lg bg-gray-600 ml-1 text-xs text-center leading-3">
                        {totalCount}
                      </span>
                    </p>
                  </div>
                  <div
                    className="mt-2 text-xs text-gray-600 dark:text-gray-300"
                    title={`opened ${fromNow(createdAt)}`}
                  >
                    {day(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                </a>
              </Link>
            </div>
          )
        }
      )}
    </div>
  )
}

export default Preview
