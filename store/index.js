import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		listSongIds:[],
		nextSongId:''
	},
	mutations:{
		getListSongIds(state,value){
			state.listSongIds = value
		},
		listSongNext(state,value){
			for(let i = 0;i<state.listSongIds.length;i++){
				if(state.listSongIds[i].id == value){
					state.nextSongId = state.listSongIds[i+1].id;
					console.log("next",state.nextSongId);
				}
			}
		}
	}
})