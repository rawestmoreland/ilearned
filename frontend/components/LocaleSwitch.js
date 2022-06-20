import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { TbWorld } from 'react-icons/tb'
import { MdExpandMore } from 'react-icons/md'

import { Menu } from '@headlessui/react'
import Cookies from 'js-cookie'

const LocaleSwitch = ({ pageContext }) => {
	const isMounted = useRef(false)
	const select = useRef()
	const router = useRouter()
	const [locale, setLocale] = useState()

	const handleLocaleChange = async (selectedLocale) => {
		// Persist the user's language preference
		// https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
		Cookies.set('ILEARNED_LOCALE', selectedLocale)
		setLocale(selectedLocale)
	}

	const handleLocaleChangeRef = useRef(handleLocaleChange)

	useEffect(() => {
		const localeCookie = Cookies.get('ILEARNED_LOCALE')
		if (!localeCookie) {
			handleLocaleChangeRef.current(router.locale)
		}

		setLocale(localeCookie || router.locale)

		return () => {
			isMounted.current = true
		}
	}, [locale, router])

	return (
		<Menu as='div' className='relative inline-block my-auto'>
			{({ open }) => (
				<>
					<Menu.Button>
						<div className='inline-flex items-center gap-x-2 text-rich-black'>
							<TbWorld />
							{router.locale}
							<MdExpandMore />
						</div>
					</Menu.Button>
					{open && (
						<Menu.Items
							static
							className='absolute right-0 mt-2 w-16 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
						>
							{pageContext.localizedPaths.map(
								({ href, locale }) => {
									return (
										<Menu.Item key={locale}>
											{({ active }) => (
												<Link
													href={href}
													role='option'
													locale={locale}
													passHref
												>
													<p
														className='group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer'
														onClick={() =>
															handleLocaleChange(
																locale
															)
														}
													>
														{locale}
													</p>
												</Link>
											)}
										</Menu.Item>
									)
								}
							)}
						</Menu.Items>
					)}
				</>
			)}
		</Menu>
	)
}

export default LocaleSwitch
