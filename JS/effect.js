/**************
Author:Jason Yu
Date:2012-11-24
**************/
var oBox = document.getElementById("box");
var aBoxDiv = oBox.getElementsByTagName("div");
var oBoxSpan = oBox.getElementsByTagName("span")[0];
var oBoxImg = oBox.getElementsByTagName("img")[0];
var iBoxDivSize = 160;
var iStatic = true;
var arr = [];  //div坐标
var arr2 = [];   //背景坐标
var arrBox1=null;
var arrBox2=null;
var len = aBoxDiv.length;

function Box(){}
Box.prototype = {
    reset:function(){
        arr = [];  
        arr2 = [];  
        len = aBoxDiv.length;

        for(var i=0; i<3; i++){
            for(var j=0; j<3; j++){
                arr.push([iBoxDivSize*i,iBoxDivSize*j]);
                arr2.push([iBoxDivSize*i,iBoxDivSize*j]);
            }
        }

        for(var i=0, l=aBoxDiv.length; i<l; i++){
            var a = Math.floor(Math.random()*len);
            aBoxDiv[i].style.left = arr[a][0] + "px";
            aBoxDiv[i].style.top = arr[a][1] + "px";
            aBoxDiv[i].style.backgroundPosition= "-" + (arr2[i][0]+1) + "px" + " " + "-" + (arr2[i][1]+1) + "px"; 
            arr.splice(a,1);
            len--;
            var that = this;
            aBoxDiv[i].index = i;
            aBoxDiv[i].onclick = function(){
                that.move(this);
            }
        }
    },
    move:function(obj){
        for(var j=0, l=aBoxDiv.length; j<l; j++){
            aBoxDiv[j].className = "";
        }
        
        if(iStatic){
            obj.className = "on";
            arrBox1 = [parseInt(obj.style.left), parseInt(obj.style.top), obj.index];
            
        }else{
            arrBox2 = [parseInt(obj.style.left), parseInt(obj.style.top), obj.index];
            
            if(arrBox1[0]-arrBox2[0]==0 && Math.abs(arrBox1[1]-arrBox2[1])==iBoxDivSize){
                aBoxDiv[arrBox1[2]].style.top = arrBox2[1]+"px";
                aBoxDiv[arrBox2[2]].style.top = arrBox1[1]+"px";
            }else if(arrBox1[1]-arrBox2[1]==0 && Math.abs(arrBox1[0]-arrBox2[0])==iBoxDivSize){
                aBoxDiv[arrBox1[2]].style.left = arrBox2[0]+"px";
                aBoxDiv[arrBox2[2]].style.left = arrBox1[0]+"px";
            }
        }
        iStatic = !iStatic;
        this.judge();
    },
    judge:function(){
        var iCan = false;
        for(var i=0, l=aBoxDiv.length; i<l; i++){
            if(parseInt(aBoxDiv[i].style.left)==arr2[i][0] && parseInt(aBoxDiv[i].style.top)==arr2[i][1]){
                iCan = true;
            }else{
                iCan = false;
                break;
            }
        }
        
        if(iCan){
            if(confirm("恭喜您拼图成功！重来？")){
                this.reset();
            }
        }
    },
    viewimg:function(){
        oBoxImg.style.display = "block";
    },
    hideimg:function(){
        oBoxImg.style.display = "none";
    }
}
var iBox = new Box();
iBox.reset();
oBoxSpan.onmousedown = function(){iBox.viewimg();}
oBoxSpan.onmouseup = function(){iBox.hideimg();}// JavaScript Document