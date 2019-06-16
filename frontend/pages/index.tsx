import { Component } from 'react';
import { gql } from "apollo-boost";

import CategorySection from "../components/CategorySection"
import PageTitle from '../components/PageTitle';
import Nav from "../components/nav";

class Home extends Component {
  static async getInitialProps({ apolloClient }: any) {
    const categories = await apolloClient.query({
      query: gql`
        query AllCategories {
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
    })

    return { categories }
  }

  renderCategorySections = (categories: any) => {
    const { data: { categories: { edges } } } = categories

    return edges.map((edge: any) => {
      const { node: { name, categoryId } } = edge
      return <CategorySection name={name} categoryId={categoryId} key={categoryId} />
    })
  }

  render = () => {
    const { categories } = this.props
    return (
      <>
        { this.renderCategorySections(categories) }
      </>
    )
  }
}

export default Home
