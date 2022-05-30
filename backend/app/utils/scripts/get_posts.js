import fetch from "node-fetch";
import dotenv from "dotenv";
import lodash from "lodash";

dotenv.config();

async function main() {
  try {
    const postResponse = await fetch(
      "https://strapi-sbb-prod.herokuapp.com/posts"
    );
    if (!postResponse.ok) {
      throw new Error("Unable to get posts.");
    }
    const data = await postResponse.json();
    for (let post of data) {
      // console.log(`Updating ${post.id}`);
      post.content = lodash.trimEnd(post.content, "\n");
      if (post.id === 31) {
        await fetch(`http://localhost:1338/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              content: post.content,
            },
          }),
        })
          .then((data) => {
            return;
          })
          .catch((error) => console.warn(error));
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

main();
