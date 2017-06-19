1.使用方法

  在body里面弄一个div,把图片放在div下面。如：
  <div id="imgContainer">
			<img src="images/banner_4_01.gif"/>
			<img src="images/banner_4_02.gif"/>
			<img src="images/banner_4_03.gif"/>
			<img src="images/banner_4_04.gif"/>
	</div>
	在style.css里面将imgContainer改成自定义的div的id名称
	引进imgSwitch.min.js
	在js里面添加
	window.onload=function(){
				new imgSwitch("imgContainer",{Type:15,Width:874,Height:211,Pause:3000,Speed:"fast",Auto:true,Navigate:"picture",PicturePosition:"right"})	
	}
	或者在div下添加
	new imgSwitch("imgContainer",{Type:15,Width:874,Height:211,Pause:3000,Speed:"fast",Auto:true,Navigate:"picture",PicturePosition:"right"})	
	
2.参数说明：

    Type:图片切换的方式，目前有0-17,
			0: 随机切换
			1: 4格纵向百叶窗
			2: 16格横向百叶窗
			3: 由里至外逐渐放大
			4: 中间向左右两边逐渐放大
			5: 中间向上下两边逐渐放大
			6: 由上至下落幕
			7: 由左至右
			8: 由左上至右下
			9: 由右下至左上
			10: 8格纵向百叶窗
			11: 8格纵向百叶窗2
			12:	8格万花筒
			13: 24格万花筒
			14: 4格滑行左上至右下
			15: 4格滑行左上至右下
			16: 4格滑行落幕
			17: 4格滑行延伸。
    Width:图片的宽度
    Height:图片的高度
    Pause:图片停留的时间
    Speed:图片切换的时间，有三种方式，fast,normal,slow,也可以自定义时间，如："200",单位是毫秒。默认为normal
    Auto:true或者false，是否自动播放
    Navigate:导航方式，目前有三种，"no"代表无导航，"numberic"代表数字导航，"picture"代表图片导航
    NavigatePlace:导航所在地方。"inner"代表在内部，"outer"代表在外部
    PicturePosition：在Navigate为picture的情况下,有三种方式："bottom"导航图片在底部 "left"导航图片在左部 "right"导航图片在右部
    