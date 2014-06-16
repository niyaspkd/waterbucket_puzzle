seen = {}
queue = []
fill = []

def getState():
    global queue
    if not queue:
        return None
    state = queue[0]
    queue = queue[1:]
    return state

def addState(parent,new):

    if str(new) in seen:
        return
    seen[str(new)] = str(parent)
    queue.append(new)
    fill.append(new)

def getSolution():
    solution = []
    state = queue[-1]
    while state:
        solution.append(str(state))
        state = getParent(state)
    solution.reverse()
    return solution

def getParent(childState):
    try:
        return seen[str(childState)]
    except:
        return None

def test(oldstate, newstate,goal):
    [newA, newB] = newstate
    won = (newA == goal or newB == goal)
    addState(oldstate, newstate)
    return won

def playGame(aMax, bMax, goal):
    addState("",[0,0])
    while 1:
        oldstate = getState()
        [aHas,bHas] = oldstate
        if test(oldstate, [aMax,bHas],goal): # fill A from well
            break
        if test(oldstate, [0,bHas],goal): # empty A to well
            break
        if test(oldstate,[aHas,bMax],goal): # fill B from well
            break
        if test(oldstate,[aHas, 0],goal): # empty B to well
            break
        howmuch = min(aHas, bMax-bHas)
        if test(oldstate,[aHas-howmuch,bHas+howmuch],goal): # pour A to B
            break
        howmuch = min(bHas, aMax-aHas)
        if test(oldstate,[aHas+howmuch,bHas-howmuch],goal): # pour B to A
            break
    print "solution is "
    print "\n".join(getSolution())

playGame(7,11,6)
print seen
print queue
print fill
