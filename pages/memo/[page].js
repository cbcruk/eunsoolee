// @ts-check
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { getAllMemo } from '$lib/airtable'
import { getFile, writeFile } from '$lib/file'
import Layout from '../../components/Layout'
import Preview from '../../components/Preview'
import { Pagination } from 'components/Pagination'

/**
 *
 * @param {object} props
 * @param {{ records, pagination }} props.data
 */
function Memos({ data }) {
  if (!data) {
    return null
  }

  return (
    <Layout title="Memo" isShowTitle={false}>
      <Preview type="memo" items={data.records} />
      <Pagination pagination={data.pagination} />
    </Layout>
  )
}

/** @type {import('next').GetStaticProps} */
export async function getStaticProps({ params }) {
  const contents = await getFile({ fileName: `${params.page}` })
  const data = JSON.parse(contents)

  for (const record of data.records) {
    record.fields.serialize = await serialize(record.fields.body, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: true,
    })
  }

  return {
    props: { data },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const records = await getAllMemo()
  const paths = []

  for (const record of records) {
    const total = records.length
    const index = paths.length + 1
    const prev = index === 1 ? null : index - 1
    const next = index === total ? null : index + 1
    const pagination = [prev, next, total]

    await writeFile({
      fileName: `${index}`,
      data: JSON.stringify({
        records: record,
        pagination,
      }),
    })

    paths.push(index)
  }

  return {
    fallback: true,
    paths: paths.map((page) => {
      return {
        params: { page: `${page}` },
      }
    }),
  }
}

export default Memos
