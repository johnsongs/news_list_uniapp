import {
	request
} from '../http.js'

export function getNewsList(config) { 
	return request({
		url: 'cms/articles/page',
		method: 'get',
		data: config,
	})
}

export function getNewsDetail(config) { 
	return request({
		url: 'cms/articles/'+config,
		method: 'get',
		data: {},
	})
}
