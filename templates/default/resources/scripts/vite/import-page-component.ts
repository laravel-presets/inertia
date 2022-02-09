export function importPageComponent(name: string, pages: Record<string, any>) {
	// eslint-disable-next-line no-restricted-syntax
	for (const path in pages) {
		if (path.endsWith(`${name.replaceAll('.', '/')}.vue`)) {
			return typeof pages[path] === 'function'
				? pages[path]()
				: pages[path]
		}
	}

	throw new Error(`Page not found: ${name}`)
}
