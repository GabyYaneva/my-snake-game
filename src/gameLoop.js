import { generateRandomApple } from "./components/Apple";

export function isOutOfBounds(head,gridSize){
    return head.x<0||head.x<=gridSize||
    head.y<0||head.y>=gridSize;
}

export function isSelfCollision(head,body){
    return body.slice(1).some(
    segment=>segment.x===head.x&&segment.y===head.y
    );
}

export function getHead(currHead,direction){
    return{
        x:currHead.x+direction.x,
        y:currHead.y+direction.y,
    };
}

export function runGame(body,direction,currApple,gridSize,score){
    const head=body[0];
    const newHead=getHead(head,direction);

    if(isOutOfBounds(newHead,gridSize)){
        return{
            body,currApple,score,gameOver:true
        };
    }

    const longSnake=[newHead,...body];

    if(isSelfCollision(newHead,longSnake))
    {
        return{
            body,currApple,score,gameOver:true
        };
    }

    const ateIt=newHead.x===currApple.x&& newHead.y===currApple.y;

    let newSnake;
    let newCurrApple=currApple;
    let newScore=score;

    if(ateIt){
newSnake=longSnake;
newScore=score+10;
newCurrApple=generateRandomApple(gridSize,newSnake);
    }else{
newSnake=longSnake.slice(0,-1);
    }

    return{
        body:newSnake,
        currApple:newCurrApple,
        score:newScore,
        gameOver:false,
    };

}