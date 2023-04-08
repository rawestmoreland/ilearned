import { forwardRef } from 'react'
import Link from 'next/link'

const CustomLink = forwardRef((props, ref) => {
	const { href, locale, children, ...rest } = props

	return (
        (<Link href={href} locale={locale} ref={ref} {...rest}>

            {children}

        </Link>)
    );
})

CustomLink.displayName = 'CustomLink'

export default CustomLink
