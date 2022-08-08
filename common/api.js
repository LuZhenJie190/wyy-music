import {baseUrl} from './config.js'
export function topList(){
	return new Promise((resolve,reject)=>{
			 uni.request({
		url:`${baseUrl}/toplist/detail`,
		method:'GET',
		success: res => {
			resolve(res)
		},
	})
	})
}

export function list(listId){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${listId}`,
		method:'GET'
	})
}

// /song/detail?ids=
export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`,
		method:'GET'
	})
}

// comment/music?id
export function songComment(songId){
	return uni.request({
		url:`${baseUrl}/comment/music?id=${songId}`,
		method:'GET'
	})
}

export function songSimi(songId){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${songId}`,
		method:'GET'
	})
}

export function songLyric(songId){
	return uni.request({
		url:`${baseUrl}/lyric?id=${songId}`,
		method:'GET'
	})
}

export function songUrl(songId){
	return uni.request({
		url:`${baseUrl}/song/url?id=${songId}`,
		method:'GET'
	})
}

// /search/hot/detail
export function searchHot(){
	return uni.request({
		url:`${baseUrl}/search/hot/detail`,
		method:'GET'
	})
}

// search?keywords=
export function searchWord(word){
	return uni.request({
		url:`${baseUrl}/cloudsearch?keywords=${word}`,
		method:'GET'
	})
}

// /search/suggest?keywords=当&type=mobile
export function searchSuggest(keywords){
	return uni.request({
		url:`${baseUrl}/search/suggest?keywords=${keywords}&type=mobile`,
		method:'GET'
	})
}