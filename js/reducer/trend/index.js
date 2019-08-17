const defaultSate={
	trend:'当 日',
	visible:false
}
export default (state=defaultSate,action)=>{
	if (action.type === 'trendShow') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.visible = action.visible;
		return newState;
	}
	if (action.type === 'trendHiden') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.visible = action.visible;
		return newState;
	}
	if (action.type === 'changeTrend') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.trend = action.item.keyname;
		newState.visible = false;
		return newState;
	}
	return state
}