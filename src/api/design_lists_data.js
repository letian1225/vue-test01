import Mock from 'mockjs';
export default Mock.mock('http://lists.com', {
    "errorCode": "1",
    "errorName": "查询成功",
    "list": [
    	{
    	  "wfw_id": "2",
    	  "wfw_name": "listBox",
    	  "wfw_name_ch": "下拉列表",
    	  "wfw_abled": "1",
    	  "wfw_icon": "",
    	  "wfw_attr": [
    	    {
    	      "uid": "",
    	      "dataSource": "",
    	      "labelName": "",
    	      "display": "false",
    	      "type_selected": "1",
    	      "option": [
    	        {
    	          "value": "",
    	          "text": ""
    	        }
    	      ],
    	      "type": [
    	        {
    	          "wfwq_id": "1",
    	          "wfwq_name": "down",
    	          "wfwq_name_ch": "向下展开"
    	        },
    	        {
    	          "wfwq_id": "2",
    	          "wfwq_name": "page",
    	          "wfwq_name_ch": "跳页展开"
    	        },
    	        {
    	          "wfwq_id": "3",
    	          "wfwq_name": "selector",
    	          "wfwq_name_ch": "选择器"
    	        }
    	      ],
    	      "diy": [
    	        {
    	          "data_type": "",
    	          "data_name": "",
    	          "data": ""
    	        }
    	      ]
    	    }
    	  ]
    	}
    ],
    "wff_id": "",
    "wff_module": ""
});

