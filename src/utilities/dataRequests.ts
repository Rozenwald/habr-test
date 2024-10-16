import { errorHandler, abortErrorHandler, controller } from './helpers.ts'
import { ISuggest } from '~/types/models.ts'

export async function getSuggest(search = '', startSearchFrom = 0): Promise<ISuggest[] | [] | undefined > {

	if (search && search.length > startSearchFrom) {
		const baseUrl = new URL("https://habr.com/kek/v2/publication/suggest-mention?")
		const params = new URLSearchParams({q: search});
		const url = `${baseUrl.href}${params}`

		const signal = controller.signal
		const data: ISuggest[] = await fetch(url, {
			signal
		})
			.then(response => response.json())
			.then(answer => {
				if (answer.data.length > 0) return answer.data;
				throw answer
			})
			.catch(e => {
				console.log(e)
				console.log(e.name)
				if (e.name) abortErrorHandler()
				else errorHandler(e)
				return []
			})

		return data
	}
}
