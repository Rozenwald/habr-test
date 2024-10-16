import { serverError } from '~/types/models.ts'

export let controller: AbortController = new AbortController();
export const updateController = () => {
	controller = new AbortController()
}

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

export function abortErrorHandler() {
	console.error('Запрос был прерван')
}

export function errorHandler(error: serverError) {
	if (error.message === 'Failed to fetch') console.error('Отсутствует интернет соединение')
	if (error.httpCode === 500) console.error('Сервер недоступен')
	if (error.httpCode === 400) {
		if (error.message.indexOf('Unsupported query') !== -1) {
			console.error('Недопустимое значение для поиска')
		}
		else console.error('Недопустимый запрос')
	}
}