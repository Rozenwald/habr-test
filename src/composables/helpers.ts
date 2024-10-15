
export function debounce<Type extends unknown[]>(func: (...args: Type) => void, timeout: number) {
	let timer: undefined | ReturnType<typeof setTimeout>

	return (...args: Parameters<typeof func>) => {
		return new Promise((resolve, reject) => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				try {
					let request = func(...args)
					resolve(request)
				} catch (e) {
					reject(e)
				}
			}, timeout);
		})
	}
}
export function errorHandler(error: any) {
	console.log('error - ', error)
}