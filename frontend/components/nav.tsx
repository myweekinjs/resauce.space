import Link from 'next/link'
import { gql } from "apollo-boost";
import { Query } from "react-apollo"
import { ReactElement } from 'react';
import getCategoryColour from '../lib/categoryColors';

const GET_CATEGORIES = gql`
  query GetCategoriesForNav {
    categories(where: {
      exclude: 1,
      hideEmpty: true
    }) {
      edges {
        node {
          name
          categoryId
        }
      }
    }
  }
`

export default function Nav () {
  return (
    <nav>
      <ul className='flex justify-between items-center pt-8 pb-4 mb-10 border-b-2 border-gray-300 overflow-x-auto'>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }: any): string | ReactElement[] => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const { categories: { edges } } = data

            return edges.map((edge: any): ReactElement => (
              <li className="px-5">
                <Link href={`/resauce?id=${edge.node.categoryId}`}>
                  <a className={`whitespace-no-wrap text-xs font-bold uppercase block relative text-${getCategoryColour(edge.node.categoryId)}-600`}>
                    {edge.node.name}
                  </a>
                </Link>
              </li>
            ))
          }}
        </Query>
      </ul>
    </nav>
  )
}
