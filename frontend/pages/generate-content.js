import { useState } from 'react'
import { faker } from '@faker-js/faker'
import slugify from 'slugify'
import { fetchAPI } from '../utils/api'

const GenerateContent = () => {
	const [working, setWorking] = useState(false)
	async function addContent() {
		setWorking(true)
		const authorList = await fetchAPI('/authors', false, { fields: ['id'] })
		const categoryList = await fetchAPI('/categories', false, {
			fields: ['id'],
		})
		const authorChoices = []
		const categoryChoices = []
		authorList.data.forEach((author) => authorChoices.push(author.id))
		categoryList.data.forEach((category) =>
			categoryChoices.push(category.id)
		)
		for (let i = 0; i < 200; i++) {
			const authors = [faker.helpers.arrayElement(authorChoices)]
			const categories = faker.helpers.arrayElements(categoryChoices, 4)
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
				authors: [3],
				categories: categories,
				image: 6,
			}
			const generate = await fetch(
				`${
					process.env.NEXT_PUBLIC_STRAPI_API_URL ||
					'http://localhost:1337'
				}/api/posts`,
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
		<div className='flex justify-center items-center'>
			<button
				disabled={working}
				onClick={() => addContent()}
				className='border border-off-white bg-off-white rounded mt-16 p-2 shadow-md cursor-pointer'
			>
				Generate Strapi Content
			</button>
		</div>
	)
}

export default GenerateContent
