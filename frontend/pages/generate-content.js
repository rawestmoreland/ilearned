import Layout from '../components/Layout'
import { useState } from 'react'
import { faker } from '@faker-js/faker'
import slugify from 'slugify'

const GenerateContent = () => {
	const [working, setWorking] = useState(false)
	async function addContent() {
		setWorking(true)
		for (let i = 0; i < 100; i++) {
			const authorChoices = [3, 4, 5]

			const authors = [
				authorChoices[Math.floor(Math.random() * authorChoices.length)],
			]
			const title = faker.unique(faker.lorem.sentence)
			const slug = slugify(title).replace('.', '')
			const description = faker.lorem.sentences(7)
			const content = faker.lorem.paragraphs(5, '\n\n')
			const published = faker.unique(faker.date.past)

			const postData = {
				title,
				content,
				description,
				slug,
				published,
				authors,
				categories: [1, 2, 3],
				image: 6,
			}

			const generate = await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ data: postData }),
				}
			)

			const generateResponse = await generate.json()

			console.log(generateResponse)
		}
		setWorking(false)
	}

	return (
		<Layout>
			<div className='flex justify-center items-center'>
				<button
					disabled={working}
					onClick={() => addContent()}
					className='border border-off-white bg-off-white rounded mt-16 p-2 shadow-md cursor-pointer'
				>
					Generate Strapi Content
				</button>
			</div>
		</Layout>
	)
}

export default GenerateContent
