    let gameboard=(function (){
        let board=[];
        for(let i=0;i<3;i++){
            board[i]=[];
            for(let j=0;j<3;j++){
                board[i].push(cell());
            }
        }
        let getboard=()=>board;
        let displayboard=function(){
            for(let i=0;i<3;i++){
                let row=[]
                for(let j=0;j<3;j++){
                    row.push(board[i][j].getvalue());
                }
                console.log(row.join(" "));
            }
        }
        return {getboard,displayboard};
    })();

    function cell(){
        let value=0;
        let getvalue=()=>value;
        let mark=function(val){
            value=val;
        }
        return {getvalue,mark};
    }
    let p1=(function(name='Player 1'){
        let token=1;
        return {name,token};
    })();
    let p2=(function(name='Player 2'){
        let token=2;
        return {name,token};
    })();

    let gamecontroller=(function(){
        gameboard.displayboard(); // initial board display;
        let board=gameboard.getboard(); 
        let ap=p1;
        const div = document.querySelector('.text');
        
        div.textContent = `${ap.name}'s turn`;

        const player1=document.querySelector('.p1');
        const player2=document.querySelector('.p2');
        
        let check=function(board){
            let flag=0;
            let prob1=0,prob2=0;
            for(let i=0;i<3;i++){
                let c11=0,c12=0,c21=0,c22=0;
                
                for(let j=0;j<3;j++){
                    let v1=board[i][j].getvalue();
                    let v2=board[j][i].getvalue();
                    if(v1==1) c11++;
                    if(v1==2) c21++;
                    if(v2==1) c12++;
                    if(v2==2) c22++;
                    if(v1==0){
                        flag=1;
                    }
                }
                
                if(c11==3 || c12==3){
                    div.textContent=`${p1.name} wins`;
                    player1.style.height='100%';
                    player2.style.height='0%';
                    return false;
                }
                
                if(c21==3 || c22==3){
                    div.textContent=`${p2.name} wins`;
                    player2.style.height='100%';
                    player1.style.height='0%';
                    return false;
                }
                const p11=[c11,c12];
                const p21=[c21,c22];
                for(let val of p11){
                    if(val==2){
                        prob1++;
                    }
                }
                for(let val of p21){
                    if(val==2){
                        prob2++;
                    }
                }

            }
            let d11=0,d12=0,d21=0,d22=0;
            for(let i=0;i<3;i++){
                let v1=board[i][i].getvalue();
                let v2=board[i][3-i-1].getvalue();
                if(v1==1) d11++;
                if(v2==1) d12++;
                if(v1==2) d21++;
                if(v2==2) d22++;
            }
            if(d11==3 || d12==3){
                div.textContent=`${p1.name} wins`;
                player1.style.height='100%';
                player2.style.height='0%';
                return false;
            }
            
            if(d21==3 || d22==3){
                div.textContent=`${p2.name} wins`;
                player2.style.height='100%';
                player1.style.height='0%';
                return false;
            }
           
            
            const p11=[d11,d12]
            const p21=[d21,d22]
            for(let val of p11){
                if(val==2){
                    prob1++;
                }
            }
            for(let val of p21){
                if(val==2){
                    prob2++;
                }
            }
            const probability=prob1/(prob1+prob2);
            player1.style.height=`${100*probability}%`;
            player2.style.height=`${100*(1-probability)}%`;

            if(!flag){
                div.textContent="It's a tie";
                return false;
            }
            
            
            return true;
        }
        
        
        const cells=document.querySelectorAll(".cell");
        let gameover=false;
        cells.forEach((cell,index) => {
            cell.addEventListener('click',()=>{
                if(gameover) return;
                let r=Math.floor(index/3);
                let c=index%3;
                if(board[r][c].getvalue()!=0) {
                    alert('!Already marked\nChoose a different block');
                    return;
                }
                board[r][c].mark(ap.token);
                if(ap.token==1){
                    cell.innerHTML='<img src="./images/1.png">';
                }else{
                    cell.innerHTML='<img src="./images/2.png">';
                }
                gameboard.displayboard();
                if(!check(board)){
                    gameover=true;
                    return;
                }
                
                ap=ap==p1?p2:p1;
                div.textContent=`${ap.name}'s turn`;
            });
        });

    const reset=document.querySelector('.reset');
    reset.addEventListener('click',()=>{
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                board[i][j].mark(0);
            }
        }
        const cells=document.querySelectorAll('.cell');
        cells.forEach((cell)=>{
            cell.innerHTML="";
        })
        ap=p1;  
        div.textContent = `${ap.name}'s turn`;
        player1.style.height = '50%';
        player2.style.height = '50%';

        gameover=false;
    })
        
    })();
   

