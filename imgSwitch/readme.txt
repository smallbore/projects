1.ʹ�÷���

  ��body����Ūһ��div,��ͼƬ����div���档�磺
  <div id="imgContainer">
			<img src="images/banner_4_01.gif"/>
			<img src="images/banner_4_02.gif"/>
			<img src="images/banner_4_03.gif"/>
			<img src="images/banner_4_04.gif"/>
	</div>
	��style.css���潫imgContainer�ĳ��Զ����div��id����
	����imgSwitch.min.js
	��js�������
	window.onload=function(){
				new imgSwitch("imgContainer",{Type:15,Width:874,Height:211,Pause:3000,Speed:"fast",Auto:true,Navigate:"picture",PicturePosition:"right"})	
	}
	������div�����
	new imgSwitch("imgContainer",{Type:15,Width:874,Height:211,Pause:3000,Speed:"fast",Auto:true,Navigate:"picture",PicturePosition:"right"})	
	
2.����˵����

    Type:ͼƬ�л��ķ�ʽ��Ŀǰ��0-17,
			0: ����л�
			1: 4�������Ҷ��
			2: 16������Ҷ��
			3: ���������𽥷Ŵ�
			4: �м������������𽥷Ŵ�
			5: �м������������𽥷Ŵ�
			6: ����������Ļ
			7: ��������
			8: ������������
			9: ������������
			10: 8�������Ҷ��
			11: 8�������Ҷ��2
			12:	8����Ͳ
			13: 24����Ͳ
			14: 4��������������
			15: 4��������������
			16: 4������Ļ
			17: 4�������졣
    Width:ͼƬ�Ŀ��
    Height:ͼƬ�ĸ߶�
    Pause:ͼƬͣ����ʱ��
    Speed:ͼƬ�л���ʱ�䣬�����ַ�ʽ��fast,normal,slow,Ҳ�����Զ���ʱ�䣬�磺"200",��λ�Ǻ��롣Ĭ��Ϊnormal
    Auto:true����false���Ƿ��Զ�����
    Navigate:������ʽ��Ŀǰ�����֣�"no"�����޵�����"numberic"�������ֵ�����"picture"����ͼƬ����
    NavigatePlace:�������ڵط���"inner"�������ڲ���"outer"�������ⲿ
    PicturePosition����NavigateΪpicture�������,�����ַ�ʽ��"bottom"����ͼƬ�ڵײ� "left"����ͼƬ���� "right"����ͼƬ���Ҳ�
    