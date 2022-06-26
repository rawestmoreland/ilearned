import { forwardRef } from 'react'
import Link from 'next/link'

const CustomLink = forwardRef((props, ref) => {
	const { href, locale, children, ...rest } = props

	return (
		<Link href={href} locale={locale}>
			<a ref={ref} {...rest}>
				{children}
			</a>
		</Link>
	)
})

CustomLink.displayName = 'CustomLink'

export default CustomLink
