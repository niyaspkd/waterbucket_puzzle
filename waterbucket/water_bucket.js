
var queue=[];
var seen={};
var target;
function getstate(){
	if(!queue)
	return;	
	state=queue[0];
	queue=queue.slice(1);
	return state;
}

function addstate(parentstate,newstate){
	if (String(newstate) in seen)
	return; 
	seen[String(newstate)] = String(parentstate);
	queue.push(newstate);
}

function getsolution(){
	var solution=[];
	state=(queue.slice(-1));
	while(state){
		solution.push(String(state));
		state=getparent(state);
}
	solution.reverse();
	return solution;

}

function getparent(childstate){
	try {
		return seen[String(childstate)];
}
	catch(e){
		return undefined;
}
}
function test (oldstate, newstate){
   	var newA = newstate[0];
   	var newB = newstate[1];
    
    var won = (newA == target|| newB ==target)
	addstate(oldstate,newstate);
	return won;

}

function playGame (aMax,bMax,goal){
	target=goal
	addstate("", [0,0])
	
	while(true){
		oldstate=getstate();
		var aHas = oldstate[0];
       	var bHas = oldstate[1];
        	
		if(test (oldstate, [aMax,bHas],target))
		break;
		if(test (oldstate, [0   ,bHas],target))
		break;
                if(test (oldstate, [aHas,bMax],target))
		break;
		if(test (oldstate, [aHas,0   ],target)) 
		break;
		howmuch = Math.min(aHas, bMax-bHas);
		if(test (oldstate, [aHas-howmuch,bHas+howmuch],target))
		break;
		howmuch = Math.min(bHas, aMax-aHas);
		if(test (oldstate, [aHas+howmuch,bHas-howmuch],target))
            	break;
}	
	console.log("solution is ");
	console.log(getsolution());
    console.log(queue);
    console.log(seen);
  
}
playGame(7,11,6);
