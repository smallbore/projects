/**
 *imgSwitch ͼƬת��
 *autor  xiaoruoen
 *
*/
var self;
var $$ = function(id){
	return "string"==typeof id?document.getElementById(id):id; 
}
var Extend = function(target,source){
	for(var property in source){
		target[property]=source[property];	
	}	
	return target;
}

imgSwitch = function(container,options){
	self = this;
	this._container = $$(container);
	this.setOptions(options);
	this.Auto = this.options.Auto;
	this.Pause = this.options.Pause;
	this.Type = this.options.Type;
	this.Navigate = this.options.Navigate;
	this.Width = this.options.Width;
	this.Height = this.options.Height;
	this.Speed = this.options.Speed=="fast"?10:this.options.Speed=="slow"?20:this.options.Speed.match(/\D/g)?15:this.options.Speed;
	this.PicturePosition = this.options.PicturePosition;
	this.NavigatePlace = this.options.NavigatePlace;
	this.arrImgs = this._container.getElementsByTagName("img");
	this.index = 0;
	this.Case=[[32,1,1],[4,4,2],[16,1,1],[1,1,0],[1,1,1],[1,1,2],[1,1,3],[1,1,4],[1,1,5],[1,1,6],[1,8,2],[4,2,2],[4,2,0],[8,3,0],/**�����Ƿָ���*/[4,2,5],[4,1,5],[4,1,3],[1,4,4]];
	this.pos=0;
	this.nums=[];
	this.len=this.arrImgs.length;
	this.timer=null;
	this.nexttimer=null; 
	this.count=0;
	this.flag=false;
	this.createMask();
	this.createPagebar();
	this.start();
}
imgSwitch.prototype={
	setOptions:function(options){
		//����Ĭ��ֵ
		this.options={
			Auto:true,//�Ƿ��Զ�����
			Pause:3000,//��ͣ��ʱ��
			Type:1,//��������
			Navigate:"numberic",//�����������֣��ֱ�Ϊno(��),numberic(����),picture(ͼƬ)
			Width:874,//ͼƬ�Ŀ��
			Height:211,//ͼƬ�ĸ߶�
			Speed:"normal",//ת����ٶ�
			PicturePosition:"inner",
			NavigatePlace:"inner"
		}	
		Extend(this.options,options || {});
	},
	createMask:function(){
		var imgMask = document.createElement("DIV");
		imgMask.id="imgMask";
		this._mask = imgMask;
		var ranges=[],masks=[],range;
		for(var i = 0;i<32;i++){
			range = document.createElement("DIV");
		  range.className="range";
			masks.push(range.appendChild(document.createElement("DIV")));
			ranges.push(this._mask.appendChild(range));
		}
		this.masks=masks;
		this.ranges=ranges;
		this._container.appendChild(this._mask);
	},
	setMask:function(bigImg,col,row){
		var a,b,w=Math.floor(this.Width/col),h=Math.floor(this.Height/row),l=this.ranges.length;
		this.maskWidth=w;
		this.maskHeight=h;
		this.actCount = Math.min(l,row*col);
		for(var i = 0;i<l;i++){
			a = this.ranges[i].style;
			b = this.masks[i].style;
			a.width = b.width = this.maskWidth+"px";
			a.height = b.height = this.maskHeight+"px";
			b.background="url("+bigImg+")";
			b.backgroundPosition=(-i%col)*w+"px "+parseInt(-i/col)*h+"px";
			b.clip="rect(0 0 0 0)";
			if(i==col*row-1)break;	
		}
	},
	timeLine:function(play,end,len){
		var play = play || Date;
		var end = end || Date;
		var len = (len || 480)/10;
		fx=function(x){return x};
		var s = 0;t=0;//s,t����������ʱ�����������Ƴ�Inteval
		c = function(f,t){return +f+(t-f)*(s>1?s-Math.floor(s)==0?1:s-Math.floor(s):s)};//����t����ȷ����������������ֵ�ɴ��С������С���
		
		var exit;
		if(this.index<14){
			exit=1;
		}else{	
			exit = this.actCount;
		}
		return th = setInterval(function(){if(this.index<14){play(c,s=t++/len)};if(s==exit){end(clearInterval(th))}else{play(c,s=t++/len)}},this.Speed);	
	},
	fxs:[ 
		function(el,x){this.clipDiv(el,x(this.maskHeight,0),x(0,this.maskWidth),x(0,this.maskHeight),x(this.maskWidth,0))},//���ϲ��ݼ������²�����
		function(el,x){this.clipDiv(el,-1,x(0,this.maskWidth),-1,x(this.maskHeight,0))},
		function(el,x){this.clipDiv(el,x(this.maskHeight,0),-1,x(0,this.maskHeight),-1)},
		function (el,x){this.clipDiv(el,-1,-1,x(0,this.maskHeight),-1)},
    function (el,x){this.clipDiv(el,-1,x(0,this.maskWidth),-1,-1)},
    function (el,x){this.clipDiv(el,-1,x(0,this.maskWidth),x(0,this.maskHeight),-1)},
    function (el,x){this.clipDiv(el,x(this.maskHeight,0),-1,-1,x(this.maskWidth,0))}
	],
	clipDiv:function(el,y,w,h,x){
		this.flag=false;
		var params = [y,w,h,x];
		for(var i = params.length;i--;){params[i]=params[i]<0?'auto':params[i]+'px'};
		el.style.clip="rect("+params.join(" ")+")";
		
		if(y==0 || x==0 || w==this.maskWidth || h==this.maskHeight)this.flag=true;
	},
	start:function(){
			var timer,nextTimer,k=0;
			var cur = self.arrImgs[self.pos%self.len].src;self.index=self.Type;
			self.Type || (self.index=Math.round(Math.random()*(self.Case.length-1)));
			var opt = self.Case[self.index];
			self.setMask(cur,opt[0],opt[1]);
			self.timer = self.timeLine(
			function(x){
				if(self.index<14){
					for(var i = self.actCount;i--;){
						self.fxs[opt[2]].call(self,self.masks[i],x);
					}//end for
				}else{
						if(k<self.actCount){
							self.fxs[opt[2]].call(self,self.masks[k],x);
						}
						if(self.flag)k++;
				}
			},
			function (){
           self._container.style.background='url('+cur+')';
           if(self.Auto){self.pos++;self.nextTimer=setTimeout(self.start,self.Pause)};
      }	
			);
			self.prevNum && (self.prevNum.className='');
      self.prevNum=self.nums[self.pos%self.len];
      self.prevNum && (self.prevNum.className='current');	
	},
	createPagebar:function(){
		var num,pageBar;
		if(self.Navigate !="no"){
			pageBar = document.createElement("div");
			self.Navigate == "picture"?pageBar.className="pictureBar":pageBar.className="pageBar";
			if((self.PicturePosition =="bottom" || self.PicturePosition =="right") && self.Navigate =="picture" && self.NavigatePlace == "outer"){
				self._container.parentNode.appendChild(pageBar);
			}else if(self.PicturePosition =="left" && self.Navigate =="picture" && self.NavigatePlace == "outer"){
				self._container.parentNode.insertBefore(pageBar,self._container);	
			}
			else{
				self._container.appendChild(pageBar);
			}
		}
		if(self.Navigate=="numberic"){
				
				for(var i = 0;i<self.arrImgs.length;i++){
						num = document.createElement("A");
						num.href="javascript:void(0)";
						num.innerHTML=i+1;
						self.nums.push(pageBar.appendChild(num));
						num.numIndex = i;
						num.onclick=function(){
							self.pos = this.numIndex;
							clearTimeout(self.timer);
		          clearTimeout(self.nextTimer);
		          self.start();	
						}
				}//end for	
		 }//end if
		 if(self.Navigate=="picture"){
				
				for(var i = 0;i<self.len;i++){
						num = document.createElement("img");
						num.src=self.arrImgs[i%self.len].src;
						if(self.PicturePosition=="bottom" && self.NavigatePlace=="outer"){
							num.width=(self.Width-4*self.len)/self.len;
							num.height=self.Height/self.len;	
						}else if(self.PicturePosition=="bottom" && self.NavigatePlace=="inner"){
							num.width=(self.Width/1.6-5*self.len)/self.len;
							num.height=self.Height/(1.6*self.len);
							pageBar.style.cssText="position:absolute;right:10;bottom:10";
						}else if(self.PicturePosition=="right" && self.NavigatePlace=="inner"){
							num.width=(self.Width)/(2*self.len);
							num.height=(self.Height-2*self.len)/self.len;
							pageBar.style.cssText ="position:absolute;right:0;width:"+(num.width+5);
							self._container.style.cssText ="position:relative;left:0;";
						}else if(self.PicturePosition=="left" && self.NavigatePlace=="inner"){
							num.width=(self.Width)/(2*self.len);
							num.height=(self.Height-2*self.len)/self.len;
							pageBar.style.cssText ="position:absolute;left:0;width:"+(num.width+5);
							self._container.style.cssText ="position:relative;left:0;";
						}else{
							num.width=(self.Width)/(2*self.len);
							num.height=(self.Height-2*self.len)/self.len;
							pageBar.style.cssText ="float:left;width:"+(num.width+5);
							self._container.style.cssText ="float:left";	
						}
						
						pageBar.appendChild(num);
						self.nums.push(pageBar.appendChild(num));
						num.numIndex = i;
						num.onclick=function(){
							self.pos = this.numIndex;
							clearTimeout(self.timer);
		          clearTimeout(self.nextTimer);
		          self.start();	
						}
				}//end for	
		 }//end if	
		 try {document.execCommand("BackgroundImageCache", false, true);}catch(e){}; 		 	
	}	
}