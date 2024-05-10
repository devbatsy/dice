import { 
	DomType,
	sydDOM,
	setStyle,
	styleComponent,
	mount,
	useState,
	preState,
	getState,
	createElement 
} from "./sydneyDom.js";

const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open',() =>{
    
})

setStyle([
    {
        nameTag:'info_box',
        style:{
            display:'flex',
            flexDirection:'column',
            rowGap:'20px',
            width:'100%',
            padding:'10px',
            paddingRight:'25px',
            paddingLeft:'30px'
        }
    },
    {
        nameTag:'input',
        style:{
            height:'40px',
            background:'#F3F3F3',
            width:'100%',
            outline:'none',
            borderRadius:'7px',
            width:'100%',
			padding:'0',
            paddingLeft:'20px',
			fontWeight:'400'
        }
    }
])
//;border-bottom:${top ? '2px solid #333' :'unset'}
sydDOM.rowElement = ({content = [],bool = false,top = false,label} = {}) =>{
    return createElement(
        'div',
        {
            style:`height:fit-content;height:50px;display:flex;align-items:center;justify-content:center;text-transform:capitalize;border-top:${bool ? '1px solid #333' :'unset'};backgroundfont-size:18px;font-weight:500`,
        },
        [
            sydDOM.col1(label === undefined ? content[0] :preState(['statPage','data',label],['',''])[0],top),
            createElement('div',{style:'height:100%;width:1px;background:#333'}),
            sydDOM.col2(label === undefined ? content[1] :preState(['statPage','data',label],['',''])[1],top),
        ]
    )
}
sydDOM.col1 = (text = 's/n',top) =>{
    return createElement(
        'div',
        {
            style:'height:50px;min-width:50px;width:calc((100% - 20px)/2);display:flex;justify-content:center;align-items:center;'
        },
        [
            top === true ? sydDOM.image('gamer') : text
        ]
    )
}

sydDOM.col2 = (text = 'mobile no.',top) =>{
    return createElement(
        'div',
        {
            style:'height:100%;min-width:50px;width:calc((100% - 20px)/2);display:flex;justify-content:center;align-items:center;'
        },
        [
            top === true ? sydDOM.image('robot') : text
        ]
    )
}

sydDOM.image = (image) =>{
    return createElement(
        'div',
        {
            style:`height:50px;width:50px;background-repeat:no-repeat;background-size:cover;background-position:center;background-image:url("${image}.png")`
        }
    )
}

sydDOM.info_box = ({name = '',type = '',text = ''}) =>{
	updateInput = (elem) =>{
		const formState = getState('rulesPage');
		formState.userName = elem.value
		console.log(formState)
		useState('rulesPage',{type:'a',value:formState})
	}
    return createElement(
        'div',
        {
            style:type === styleComponent.info_box({method:'add',style:{paddingLeft:'0',paddingRight:'0'}}),
        },
        [
            createElement('p',{style:'color:grey;'},[text]),
            createElement(
                'input',
                {
                    style:type === 'submit' ? styleComponent.customInput() :styleComponent.input(),
                    oninput:`updateInput.bind()(this,'${name}')`,
                    type:type,
                    name:name,
                    id:text + '_id'
                },)
        ]
    )
}