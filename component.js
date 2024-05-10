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

import {result} from './matrix.js'
import {} from './script-ext.js'
//<i class="fa-solid fa-headset"></i>
//<i class="fa-solid fa-robot"></i>
setStyle([
	{
		nameTag:'container',
		style:{
			height:'100vh',
			width:'100vw',
			padding:'10px 5px',
			display:'flex',
			flexDirection:'column',
			alignItems:'center',
			overflow:'hidden',
			color:text,
			background:headerData
		}
	},
	{
		nameTag:'cubeCont',
		style:{
			height:'50%',
			width:'90%',
			maxHeight:'350px',
			maxWidth:'800px',
			position:'absolute',
			top:'50%',
			left:'50%',
			transform:'translateX(-50%) translateY(-50%)',
			zIndex:'300',
			perspective:'1000px',
			// border:'1px solid green'
		}
	},
	{
		nameTag:'box',
		style:{
			position:'absolute',
			top:'50%',
			left:'20px',
			transformStyle:'preserve-3d',
		}
	},
	{
		nameTag:'rulePagestyle',
		style:{
			height:'fit-content',
			width:'95%',
			background:'#fff',
			boxShadow:'-2px 4px 10px rgba(0,0,0,.3)',
			borderRadius:'10px',
			padding:'20px 20px',
			display:'flex',
			flexDirection:'column',
			rowGap:'30px',
			transition:'opacity linear .3s',
			position:'absolute',
			top:'50%',
			left:'50%',
			transform:'translateX(-50%) translateY(-50%)',
			maxWidth:'600px',
			maxHeight:'500px',
			overflowY:'scroll',
		}
	},
	{
		nameTag:'floor',
		style:{
			height:'90%',
			width:'90%',
			maxHeight:'800px',
			maxWidth:'1000px',
			minWidth:'400px',
			background:'radial-gradient(#eee7e7 10%,#bbbbbb 40%)',
			transform:'rotateX(60deg) translateX(-50%)',
			position:'absolute',
			top:'10%',
			left:'50%',
		}
	},
	{
		nameTag:"left",
		style:{
			right:'calc(100% / 2)',
		}
	},
	{
		nameTag:"right",
		style:{
			left:'calc(100% / 2)',
		}
	},
	{
		nameTag:"top",
		style:{
			bottom:'calc(100% / 2)',
		}
	},
	{
		nameTag:"bottom",
		style:{
			top:'calc(100% / 2)',
		}
	},
	{
		nameTag:"front",
		style:{
			// top:'calc(100% / 2)',
		}
	},
	{
		nameTag:"back",
		style:{
			// top:'calc(100% / 2)',
		}
	},
])

const spinMatrixDefault = [0,90,180,270];
const rounds = 1;
let isSpinning = false

sydDOM.container = () =>{
	stat = () =>{
		const statState = getState('statPage');
		statState.d = 'block'
		useState('statPage',{type:'a',value:statState})
		let timer = setTimeout(() => {
			const statState = getState('statPage');
			statState.o = '1';
			useState('statPage',{type:'a',value:statState})
		}, 100);
	}

	rule = () =>{
		const ruleState = getState('rulesPage');
		ruleState.d = 'block';
		useState('rulesPage',{type:'a',value:ruleState})
		let timer = setTimeout(() => {
			const ruleState = getState('rulesPage');
			ruleState.o = '1';
			useState('rulesPage',{type:'a',value:ruleState})
		}, 100);
	}
	return createElement(
		'div',
		{
			style:styleComponent.container()
		},
		[
			// createElement(
			// 	'h1',
			// 	{
			// 		style:'font-weight:300;position:absolute;top:20px;width:100%;text-align:center;left:50%;transform:translateX(-50%);text-transform:uppercase'
			// 	},
			// 	[
			// 		'bluechip casino dice game'
			// 	]
			// ),
			sydDOM.cubeCont(),
			createElement('div',{style:'height:100vh;width:100vw;position:relative;z-index:200;perspective:150px'},[
				sydDOM.floor()
			]),
			sydDOM.spinButton(),
			createElement('div',{style:`position:absolute;top:10px;right:10px;height:40px;width:40px;background-image:url('stats.png');background-position:center;background-size:100%;z-index:700`,class:'select',onclick:'stat()'}),
			createElement('div',{style:`position:absolute;top:10px;left:10px;height:40px;width:40px;background-image:url('book.png');background-position:center;background-size:100%;z-index:700`,class:'select',onclick:'rule()'}),
			sydDOM.rulesPage(),
			sydDOM.statPage(),
			sydDOM.round()
		]
	)
}

sydDOM.round = () =>{
	return createElement(
		'h1',
		{
			style:`position:absolute;top:0;z-index:900;font-size:40px;padding:20px 50px;transition:transform linear .3s;transform:scale(${preState(['round','t'],'.5')});border-radius:15px;display:${preState(['round','d'],'none')}`,
		},
		[
			`Round ${preState(['round','r'],1)}`
		],
		{
			createState:{
				stateName:'round',
				state:{d:'none',r:1,t:'.5'}
			},
			type:'round'
		}
	)
}

sydDOM.statPage = () =>{
	return createElement(
		'div',
		{
			style:`height:100vh;width:100vw;background:rgba(255,255,255,.8);backdrop-filter:blur(0px);position:absolute;top:0;left:0;z-index:999;padding:0 5px;transition:all linear .3s;display:${preState(['statPage','d'],'none')};opacity:${preState(['statPage','o'],'0')}`
		},
		[
			createElement(
				'div',
				{
					style:styleComponent.rulePagestyle({method:'remove',style:['rowGap']})
				},
				[
					sydDOM.exit('stat'),
					createElement('h2',{style:'text-align:center;text-transform:capitalize;line-height:50px;text-decoration:underline'},['stats']),
					sydDOM.rowElement({content:['player','computer'],top:true}),
					sydDOM.rowElement({content:['',''],label:'1'}),
					sydDOM.rowElement({content:['',''],label:'2'}),
					sydDOM.rowElement({content:['',''],label:'3'}),
					sydDOM.rowElement({content:['',''],bool : true,label:'4'}),
				]
			),
		],
		{
			createState:{
				stateName:'statPage',
				state:{d:'none',o:'0',data:{
					1:['',''],
					2:['',''],
					3:['',''],
					4:['',''],
				}}
			},
			type:'statPage'
		}
	)
}

sydDOM.rulesPage = () =>{
	return createElement(
		'div',
		{
			style:`height:100vh;width:100vw;background:rgba(255,255,255,.8);backdrop-filter:blur(0px);position:absolute;top:0;left:0;z-index:999;padding:0 5px;transition:all linear .3s;display:${preState(['rulesPage','d'],'block')};opacity:${preState(['rulesPage','o'],'1')}`
		},
		[
			createElement(
				'div',
				{
					style:styleComponent.rulePagestyle()
				},
				[
					sydDOM.exit('rules'),
					// sydDOM.info_box({name:'username',type:'text',text:'Enter your userName'}),
					createElement('h2',{style:'text-align:center;text-transform:capitalize;text-decoration:underline'},['game rules']),
					createElement('li',{},['Click the top corner buttons to view your stats and the rules']),
					createElement('li',{},['The dice in blue is yours and that in red is the computer\'s']),
					createElement('li',{},['Click the dice to start a new round']),
					createElement('li',{},['There are only 3 rounds, after which the game will end']),
					createElement('li',{},['Your score will then be forwarded to the telegram bot'])
				]
			)
		],
		{
			createState:{
				stateName:'rulesPage',
				state:{d:'block',o:'1',userName:''}
			},
			type:'rulesPage'
		}
	)
}

sydDOM.exit = (type) =>{
	exit = (type) =>{
		switch(type)
		{
			case 'rules':
				const pageState = getState('rulesPage');
				pageState.o = '0';
				useState('rulesPage',{type:'a',value:pageState})
				const timer1 = setTimeout(() => {
					const pageState = getState('rulesPage');
					pageState.d = 'none'
					useState('rulesPage',{type:'a',value:pageState})
				}, 300);
				roundFunc()
			break;
			case 'stat':
				const statState = getState('statPage');
				statState.o = '0'
				useState('statPage',{type:'a',value:statState})
				const timer2 = setTimeout(() => {
					const statState = getState('statPage');
					statState.d = 'none'
					useState('statPage',{type:'a',value:statState})
				}, 300);
		}
	}
	return createElement(
		'div',
		{
			style:`position:absolute;top:20px;right:10px;padding:5px;background:transparent;font-size:30px;font-weight:700;color:${destroy};`,
			class:'select',
			onclick:`exit('${type}')`
		},
		[
			createElement('i',{class:'fa-solid fa-circle-xmark'})
		],
	)
}

sydDOM.nameBox = () =>{
	return createElement(
		'div',
		{
			style:`padding:10px 5px;width:100%;color:${text === undefined ? 'unset' : text};display:flex;justify-content:space-between;position:absolute;top:0;transform:translateY(-100%);z-index:400`
		},
		[
			createElement('h3',{},['player']),
			createElement('h3',{},['computer'])
		]
	)
}

sydDOM.cubeCont = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.cubeCont(),
			class:'cubCont'
		},
		[
			sydDOM.box1(),
			// sydDOM.nameBox(),
			sydDOM.box2(),
			sydDOM.shadowElem1(),
			sydDOM.shadowElem2()
		],
		{
			createState:{
				stateName:'cubeCont',
				state:{autoAnimate:true}
			},
			type:'cubeCont'
		}
	)
}

sydDOM.shadowElem1 = () =>{
	return createElement(
		'div',
		{
			class:`shadow1 ${preState(['shadowElem1','c'],'animate')}`
		},
		[],
		{
			createState:{
				stateName:'shadowElem1',
				state:{c:'animate'}
			},
			type:'shadowElem1'
		}
	)
}

sydDOM.shadowElem2 = () =>{
	return createElement(
		'div',
		{
			class:`shadow2 ${preState(['shadowElem2','c'],'animate')}`
		},
		[],
		{
			createState:{
				stateName:'shadowElem2',
				state:{c:'animate'}
			},
			type:'shadowElem2'
		}
	)
}


sydDOM.box1 = () =>{
	const state = preState(['box1','matrix'],{x:0,y:0,z:0})
	return createElement(
		'div',
		{
			style:styleComponent.box({method:'add',style:{
				transform:`translateY(-50%) rotateX(${state.x}deg) rotateY(${state.y}deg) rotateZ(${state.z}deg)`,
			}}),
			class:`box ${preState(['cubeCont','autoAnimate'],true) === true ? 'box-animate1' : ''} b1`
		},
		[
			sydDOM.front(),
			sydDOM.back(),
			sydDOM.left(),
			sydDOM.right(),
			sydDOM.top(),
			sydDOM.bottom()
		],
		{
			createState:{
				stateName:'box1',
				state:{matrix:{x:0,y:0,z:0},transTime:'0s'}
			},
			type:'box1'
		}
	)
}

sydDOM.box2 = () =>{
	const state = preState(['box2','matrix'],{x:0,y:0,z:0})
	return createElement(
		'div',
		{
			style:styleComponent.box([
				{method:'remove',style:['left']},
				{method:'add',style:{
					right:'20px',
					transform:`translateY(-50%) rotateX(${state.x}deg) rotateY(${state.y}deg) rotateZ(${state.z}deg)`,
				}}
			]),
			class:`box ${preState(['cubeCont','autoAnimate'],true) === true ? 'box-animate2' : ''} b2`
		},
		[
			sydDOM.front2(),
			sydDOM.back2(),
			sydDOM.left(),
			sydDOM.right(),
			sydDOM.top(),
			sydDOM.bottom()
		],
		{
			createState:{
				stateName:'box2',
				state:{matrix:{x:0,y:0,z:0},transTime:'0s'}
			},
			type:'box2'
		}
	)
}

sydDOM.front = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.front({method:'add',style:{
				transform:`translateZ(${preState(['front','z'],'100px')})`
			}}),
			class:'card threeDStyle',
			id:'front'
		},
		[
			sydDOM.createDesign(1)
		],
		{
			createState:{
				stateName:'front',
				state:{z:'100px'}
			},
			type:'front'
		}
	)
}

sydDOM.back = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.back({method:'add',style:{
				transform:`translateZ(${preState(['back','z'],'-100px')})`
			}}),
			class:'card threeDStyle',
			id:'back'
		},
		[
			sydDOM.createDesign(2)
		],
		{
			createState:{
				stateName:'back',
				state:{z:'-100px'}
			},
			type:'back'
		}
	)
}

sydDOM.front2 = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.front({method:'add',style:{
				transform:`translateZ(${preState(['front2','z'],'100px')})`
			}}),
			class:'card threeDStyle',
			id:'front'
		},
		[
			sydDOM.createDesign(1)
		],
		{
			createState:{
				stateName:'front2',
				state:{z:'100px'}
			},
			type:'front2'
		}
	)
}

sydDOM.back2 = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.back({method:'add',style:{
				transform:`translateZ(${preState(['back2','z'],'-100px')})`
			}}),
			class:'card threeDStyle',
			id:'back'
		},
		[
			sydDOM.createDesign(2)
		],
		{
			createState:{
				stateName:'back2',
				state:{z:'-100px'}
			},
			type:'back2'
		}
	)
}

sydDOM.left = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.left(),
			class:'card threeDStyle',
			id:'left'
		},
		[
			sydDOM.createDesign(3)
		]
	)
}

sydDOM.right = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.right(),
			class:'card threeDStyle',
			id:'right'
		},
		[
			sydDOM.createDesign(4)
		]
	)
}

sydDOM.top = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.top(),
			class:'card threeDStyle',
			id:'top'
		},
		[
			sydDOM.createDesign(5)
		]
	)
}

sydDOM.bottom = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.bottom(),
			class:'card threeDStyle',
			id:'bottom'
		},
		[
			sydDOM.createDesign(6)
		]
	)
}

sydDOM.createDesign = (num = 1) =>{
	const elements = (num) =>{
		const array = []
		for(let i = 0; i < num; i++)
		{
			const element = createElement(
				'div',
				{
					style:'height:calc((100% / 3) - 4px);width:calc((100% / 3) - 4px);min-height:calc((100% / 3) - 4px);min-width:calc((100% / 3) - 4px);background:#171717;border-radius:50%',
					class:'bulbs'
				}
			)
			array.push(element)
		}
		return array
	}
	return createElement(
		'div',
		{
			style:'width:75%;height:75%;padding: 4px;display:flex;border-radius:10%;flex-wrap:wrap;row-gap:6px;column-gap:10px;justify-content:center;align-items:center',
			class:'innerPack'
		},
		[
			...elements(num)
		]
	)
}

sydDOM.floor = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.floor()
		}
	)
}

roundFunc = (bool = false) =>{
	const roundState = getState('round');
	switch(true)
	{
		case roundState.r < 3:
			switch(bool)
			{
				case true:
					roundState.r++
			}
			roundState.d = 'block';
			useState('round',{type:'a',value:roundState})
			const timerAlpha = setTimeout(() => {
				const roundState = getState('round');
				roundState.t = '1';
				useState('round',{type:'a',value:roundState})
				clearTimeout(timerAlpha)
			}, 100);
			const timer = setTimeout(() => {
				const roundState = getState('round');
				roundState.t = '.5'
				useState('round',{type:'a',value:roundState})
				const timerBeta = setTimeout(() => {
					const roundState = getState('round');
					roundState.d = 'none'
					useState('round',{type:'a',value:roundState})
					clearTimeout(timerBeta)
				}, 300);
				clearTimeout(timer)
			}, 3000);
		break;
		default:
			alert('game ended, game will close in 2s')
			setTimeout(() => {
				window.Telegram.WebApp.close()
			}, 2000);
	}
}

const resetCubePosition = () =>{
	const boxState1 = getState('box1');
	const boxState2 = getState('box2');

	boxState1.matrix = {x:0,y:0,z:0}
	boxState2.matrix = {x:0,y:0,z:0}

	useState('box1',{type:"a",value:boxState1})
	useState('box2',{type:"a",value:boxState2})
}

initiateMomentum = (x,y,z,type,initCord) =>{
	const totalTimeAnimation = Math.round(Math.random()*(12-8)+8);
	const boxState = getState(type);
	let localSyncClock = 0
	let timer = 0;
	let vectorTmer = 0
	let animationFrame;
	const totalAnimationFrame = totalTimeAnimation * 60;
	const firstMomentum = 2/3 * totalAnimationFrame;
	const secondMomentum = totalAnimationFrame - firstMomentum;
	
	const momentumPack = {
		x:[x/(firstMomentum + (secondMomentum/2)),(x - ((x/(firstMomentum + (secondMomentum/2))) * firstMomentum))/secondMomentum],
		y:[y/(firstMomentum + (secondMomentum/2)),(y - ((y/(firstMomentum + (secondMomentum/2))) * firstMomentum))/secondMomentum],
		z:[z/(firstMomentum + (secondMomentum/2)),(z - ((z/(firstMomentum + (secondMomentum/2))) * firstMomentum))/secondMomentum],
	}
	const primary = {
		x:0,
		y:0,
		z:0
	}
	animation()
	function animation()
	{
		animationFrame = requestAnimationFrame(animation)

		switch(true)
		{
			case vectorTmer < firstMomentum:
				primary.x += momentumPack.x[0]
				primary.y += momentumPack.y[0]
				primary.z += momentumPack.z[0]
			break;
			default:
				primary.x += momentumPack.x[1]
				primary.y += momentumPack.y[1]
				primary.z += momentumPack.z[1]
		}
		
		boxState.matrix.x = primary.x
		boxState.matrix.y = primary.y
		boxState.matrix.z = primary.z

		useState(type,{type:'a',value:boxState})
		vectorTmer++

		switch(true)
		{
			case timer >= 60:
				timer = 0
				localSyncClock++;
				// console.log(`${localSyncClock}s passed`)
				switch(localSyncClock === totalTimeAnimation)
				{
					case true:
						cancelAnimationFrame(animationFrame)
						boxState.matrix.x = x
						boxState.matrix.y = y
						boxState.matrix.z = z

						useState(type,{type:'a',value:boxState})
						sendUpdateStat({result:result(initCord),type:type})
						switch(type)
						{
							case 'box1':
								const spinTimer = setTimeout(() => {
									spinBot('box2')
									clearTimeout(spinTimer)
								}, 500);
							break;
							case 'box2':
								isSpinning = false
								const roundTimer = setTimeout(() => {
									roundFunc(true);
									const diceState = getState('spinButton');
									diceState.o = '1'
									useState('spinButton',{type:'a',value:diceState})
									// let nxtTimer = setTimeout(() => {
									// 	resetCubePosition()
									// 	clearTimeout(nxtTimer)
									// }, 500);
									clearTimeout(roundTimer)
								}, 500);
						}
						shadowSpinRemove(type)
						console.log('animation ended')
				}
		}

		timer++
	}
}

shadowSpinAdd = (type) =>{
	const state1 = getState('shadowElem1')
	const state2 = getState('shadowElem2')

	switch(true)
	{
		case type === 'box1':
			state1.c = 'animate'
			state2.c = ''
		break;
		default:
			state2.c = 'animate'
			state1.c = ''
	}
	useState('shadowElem1',{type:'a',value:state1})
	useState('shadowElem2',{type:'a',value:state2})

}

shadowSpinRemove = (type) =>{
	const state1 = getState('shadowElem1')
	const state2 = getState('shadowElem2')

	switch(true)
	{
		case type === 'box1':
			state1.c = ''
		break;
		default:
			state2.c = ''
	}
	useState('shadowElem1',{type:'a',value:state1})
	useState('shadowElem2',{type:'a',value:state2})

}

sendUpdateStat = ({result,type}) =>{
	const statState = getState('statPage');
	const roundState = getState('round');
	switch(type)
	{
		case 'box1':
			statState.data[`${roundState.r}`][0] = `${result}`
		break;
		case 'box2':
			statState.data[`${roundState.r}`][1] = `${result}`
	}
	statState.data['4'][0] = `${Number(statState.data['1'][0]) + Number(statState.data['2'][0]) + Number(statState.data['3'][0])}`
	statState.data['4'][1] = `${Number(statState.data['1'][1]) + Number(statState.data['2'][1]) + Number(statState.data['3'][1])}`

	useState('statPage',{type:'a',value:statState})
}
const removeAutoAnimate = () =>{
	const state = getState('cubeCont');
	state.autoAnimate = false;
	useState('cubeCont',{type:'a',value:state})
}

sydDOM.spinButton = () =>{
	generateRandomCredentials = (type) =>{
		const object = {};
		object.multiply = Math.round(Math.random()*(15-12)+12)
		object.spinCord = [];
		let wanted = [0,1,2,3];
		const tokens = ['t','f','n','v','s','g','z']
		let probDistribution = {
			't':[[0,0,0,],[180,180,0],[180,180,180]],
			'f':[[0,180,0],[180,0,90],[180,0,270]],
			'n':[[180,270,0],[90,270,270]],
			'v':[[0,270,0],[0,90,180]],
			's':[[180,90,90],[0,90,270]],
			'g':[[0,90,90],[0,270,270]]
		}
		const generateToken = Math.round(Math.random()*(6))
		switch(tokens[generateToken])
		{
			case 't':
				object.spinCord = probDistribution[tokens[generateToken]][Math.round(Math.random()*(2))]
			break;
			case 'n':
				object.spinCord = probDistribution[tokens[generateToken]][Math.round(Math.random()*(1))]
			break;
			case 'g':
				object.spinCord = probDistribution[tokens[generateToken]][Math.round(Math.random()*(1))]
			break;
			case 'v':
				object.spinCord = probDistribution[tokens[generateToken]][Math.round(Math.random()*(1))]
			break;
			case 's':
				object.spinCord = probDistribution[tokens[generateToken]][Math.round(Math.random()*(1))]
			break;
			case 'f':
				object.spinCord = probDistribution[tokens[generateToken]][Math.round(Math.random()*(2))]
			break;
			default:
				object.spinCord[0] = spinMatrixDefault[wanted[Math.round(Math.random()*(3))]]
				object.spinCord[1] = spinMatrixDefault[wanted[Math.round(Math.random()*(3))]]
				object.spinCord[2] = spinMatrixDefault[wanted[Math.round(Math.random()*(3))]]
		}
		return object
	}
	spinBot = (type) =>{
		const diceState = getState('spinButton');
		diceState.o = '.4'
		useState('spinButton',{type:'a',value:diceState})

		const credentials = generateRandomCredentials(type)
		const x = credentials.spinCord[0] + (credentials.multiply * 360)
		const y = credentials.spinCord[1] + (credentials.multiply * 360)
		const z = credentials.spinCord[2] + (credentials.multiply * 360)
		removeAutoAnimate()
		shadowSpinAdd(type)
		initiateMomentum(x,y,z,type,credentials.spinCord)
	}
	spin = (type) =>{
		console.log(isSpinning)
		switch(isSpinning)
		{
			case false:
				spinBot(type)
				isSpinning = true
		}
	}
	return createElement(
		'div',
		{
			style:`height:70px;width:70px;text-transform:uppercase;position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:400;cursor:pointer;background-color:${headerData};background-image:url("cube.png");background-position:center;background-size:70%;border-radius:50%;background-repeat:no-repeat;opacity:${preState(['spinButton','o'],'1')}`,
			onclick:'spin("box1")',
			class:'select'
		},
		[],
		{
			createState:{
				stateName:'spinButton',
				state:{o:'1'}
			},
			type:'spinButton'
		}
	)
}

const updateSize = () =>{
	const updateStates = () =>{
		const width = window.innerWidth;
		const frontState = getState('front');
		const backState = getState('back');
		const frontState2 = getState('front2');
		const backState2 = getState('back2');

		switch(true)
		{
			case width <= 350:
				frontState.z = '40px';
				backState.z = '-40px'
				if(frontState2 !== undefined)
				{
					frontState2.z = '40px';
					backState2.z = '-40px'
				}
			break;
			case width <= 700:
				frontState.z = '50px';
				backState.z = '-50px';
				if(frontState2 !== undefined)
				{
					frontState2.z = '50px';
					backState2.z = '-50px'
				}
			break;
			default:
				frontState.z = '100px';
				backState.z = '-100px'
				if(frontState2 !== undefined)
				{
					frontState2.z = '100px';
					backState2.z = '-100px'
				}
		}

		useState('front',{type:'a',value:frontState})
		useState('back',{type:'a',value:backState})
		if(frontState2 !== undefined)
		{
			useState('front2',{type:'a',value:frontState2})
			useState('back2',{type:'a',value:backState2})
		}

	}

	addEventListener('resize',e =>{
		updateStates()
	})
	addEventListener('load',e =>{
		updateStates()
	})
}
updateSize()

mount(sydDOM.container())