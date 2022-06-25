import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import { TbWorld } from 'react-icons/tb'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import { Menu, Transition } from '@headlessui/react'
import Cookies from 'js-cookie'

import CustomLink from './CustomLink'
import { getPosts } from '../utils/api'
import { flags } from '../utils/localize'

const LocaleSwitch = ({ pageContext }) => {
	const isMounted = useRef(false)
	const router = useRouter()
	const [locale, setLocale] = useState()

	const handleLocaleChange = async (selectedLocale) => {
		// Persist the user's language preference
		// https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
		Cookies.set('NEXT_LOCALE', selectedLocale)
		setLocale(selectedLocale)
	}

	const handleLocaleChangeRef = useRef(handleLocaleChange)

	useEffect(() => {
		const localeCookie = Cookies.get('NEXT_LOCALE')
		if (!localeCookie) {
			handleLocaleChangeRef.current(router.locale)
		}

		const checkLocaleMismatch = async () => {
			if (
				!isMounted.current &&
				localeCookie &&
				localeCookie !== pageContext.locale
			) {
				const postsRes = await getPosts({
					slug: pageContext.slug,
					locale: localeCookie,
					page: 1,
				})

				router.push(`${router.asPath}}`, `${router.asPath}}`, {
					locale: pageContext.locale,
				})
			}
			Cookies.set('NEXT_LOCALE', pageContext.locale)
		}

		setLocale(localeCookie || router.locale)
		checkLocaleMismatch()

		return () => {
			isMounted.current = true
		}
	}, [locale, router, pageContext])

	return (
		<Menu as='div' className='relative inline-block my-auto'>
			{({ open }) => (
				<>
					<Menu.Button>
						<div className='inline-flex items-center gap-x-2 rounded-md px-2 py-1 text-cod-gray border border-gray-400'>
							<span className='mt-1'>{flags[router.locale]}</span>
							{router.locale}
							{open ? (
								<MdExpandLess size='1.25em' className='mt-1' />
							) : (
								<MdExpandMore size='1.25em' className='mt-1' />
							)}
						</div>
					</Menu.Button>
					<Transition
						show={open}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items
							static
							className='absolute right-0 mt-2 w-28 origin-top-right rounded-md divide-y divide-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
						>
							{pageContext.localizedPaths.map(
								({ href, locale }) => {
									return (
										<div key={locale} className='p-1'>
											<Menu.Item>
												{({ active }) => (
													<CustomLink
														href={href}
														locale={locale}
													>
														<div
															className={`${
																active
																	? 'bg-terracotta text-off-white '
																	: ''
															}flex w-full flex-row items-center rounded-md px-2 py-1 gap-x-2 text-sm`}
														>
															<p className='mt-1'>
																{flags[locale]}
															</p>
															<p
																onClick={() =>
																	handleLocaleChange(
																		locale
																	)
																}
															>
																{locale}
															</p>
														</div>
													</CustomLink>
												)}
											</Menu.Item>
										</div>
									)
								}
							)}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	)
}

export default LocaleSwitch
