class frut{
    constructor(bodyA,bodyB){
this.link=Constraint.create({
bodyA: bodyA.body.bodies[bodyA.body.bodies.length-2],
pointA:{x:0,y:0},
bodyB: bodyB,pointB:{x:0,y:0},
length:-10,
stiffness:0.01
} 
)
    World.add(world,this.link)
    }
    Break(){
      World.remove(world,this.link)  
    }
}
