import { errorHandler } from './helpers.ts'
import { ISuggest } from '~/types/models.ts'

export async function getSuggest(search: string = '', startSearchFrom: number = 0): Promise<ISuggest | undefined> {

	if (search && search.length > startSearchFrom) {
    const url="https://habr.com/kek/v2/publication/suggest-mention?q="
		const urlWithValue = `${url}${search}`
		
		const data: ISuggest = await fetch(urlWithValue)
			.then(response => response.json())
			.then(suggestArr => {
				return suggestArr.data;
			})
			.catch(e => {
				errorHandler(e)
				return e;
			})

		return data
	}
}
