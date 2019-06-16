import { Component } from "react";
import { gql } from "apollo-boost";
import { withRouter } from 'next/router';
import PageTitle from "../components/PageTitle";
import CategorySection from "../components/CategorySection";

class Resauce extends Component {
  static async getInitialProps({ query, apolloClient }: any) {
    const categories = await apolloClient.query({
      query: gql`
        query PostsByCateogory($categoryId: Int!) {
          posts(where:{categoryId:$categoryId}) {
            edges {
              node {
                id
                title
                content
              }
            }
          }
        }
      `,
      variables: {
        categoryId: query.id
      }
    })

    return { categories }
  }

  render = () => {
    console.log(this.props)
    return (
      <>
        <CategorySection categoryId={this.props.router.query.id} />
      </>
    )
  }
}

export default withRouter(Resauce)
