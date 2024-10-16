export interface ISuggest {
	alias: string,
	avatar: string,
	name: string,
	type: string,
}

export interface serverError {
	data: object,
	message: string,
	httpCode: number,
	errorCode: string,
}

export interface IAutocomplete {
	label?: string,
	placeholder: string,
	searchFunc?: Function,
	multiChoose?: boolean,
}
