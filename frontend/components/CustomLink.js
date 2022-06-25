import { forwardRef } from 'react'
import Link from 'next/link'
import { resolveHref } from 'next/dist/shared/lib/router/router'

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

export default CustomLink
