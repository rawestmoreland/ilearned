import { gql } from 'graphql-request';

const HOST = process.env.NEXT_PUBLIC_HASHNODE_HOST_URL;

export const GET_POSTS = gql`
  query Publication($limit: Int = 10) {
    publication(host: "${HOST}") {
      isTeam
      title
      posts(first: $limit) {
        edges {
          node {
            title
            brief
            content {
              markdown
            }
            url
          }
        }
      }
    }
  }
`;
