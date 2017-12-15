import Mock from 'mockjs';
export default Mock.mock('http://control.com', {
    "errorCode": "1",
    "errorName": "查询成功",
    "list": [
        {
            "wfw_id": "1",
            "wfw_name": "departmenttree",
            "wfw_name_ch": "部门树",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "4",
                    "wfwq_name": "radioDep",
                    "wfwq_name_ch": "单选部门",
                    "wfwq_wfw_id": "1",
                    "wfwq_desc": "单选部门",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "5",
                    "wfwq_name": "multiselectDep",
                    "wfwq_name_ch": "多选部门",
                    "wfwq_wfw_id": "1",
                    "wfwq_desc": "多选部门",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "6",
                    "wfwq_name": "radioStaff",
                    "wfwq_name_ch": "单选员工",
                    "wfwq_wfw_id": "1",
                    "wfwq_desc": "单选员工",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "7",
                    "wfwq_name": "multiselectStaff",
                    "wfwq_name_ch": "多选员工",
                    "wfwq_wfw_id": "1",
                    "wfwq_desc": "多选员工",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "2",
            "wfw_name": "dropdownlist",
            "wfw_name_ch": "下拉列表",
            "wfw_abled": "1",
            "wfw_icon": "",
            //示例：是否隐藏，如果隐藏我会改为true,
            "wfw_display":"false", 

            // 示例：这种我用于显示下拉框的默认值，你需要把初始字段加上，也就是现在展示的结构
            "wfw_option":[ 
              {
                value:"",
                text:""
              }
              ],

              // 示例：你这边有默认属性，我设置
              // 关联'wfwq_type'属性要有一个记录选中的'wfwq_type_selected'字段，页面设置完会把'wfwq_id'放进去，给个默认值1，也就是默认'wfwq_id'为1，
              // 我这边展现的时候，会显示默认'wfwq_id'为1的选中。
              // 这种属性我会用下拉菜单，或者单选按钮展示，'wfwq_type' 只是一个APP端展现方式
              "wfwq_type_selected":"1", 
              "wfwq_type": [
                  {
                      "wfwq_id": "1",
                      "wfwq_name": "down",
                      "wfwq_name_ch": "向下展开",
                      "wfwq_wfw_id": "2",
                      "wfwq_desc": "向下展开",
                      "wfwq_abled": "1",
                  },
                  {
                      "wfwq_id": "2",
                      "wfwq_name": "page",
                      "wfwq_name_ch": "跳页展开",
                      "wfwq_wfw_id": "2",
                      "wfwq_desc": "跳页展开",
                      "wfwq_abled": "1",
                  },
                  {
                      "wfwq_id": "3",
                      "wfwq_name": "selector",
                      "wfwq_name_ch": "选择器",
                      "wfwq_wfw_id": "2",
                      "wfwq_desc": "选择器",
                      "wfwq_abled": "1",
                  }
              ],

            
            "wfwq_type": [
                {
                    "wfwq_id": "1",
                    "wfwq_name": "down",
                    "wfwq_name_ch": "向下展开",
                    "wfwq_wfw_id": "2",
                    "wfwq_desc": "向下展开",
                    "wfwq_abled": "1",
                },
                {
                    "wfwq_id": "2",
                    "wfwq_name": "page",
                    "wfwq_name_ch": "跳页展开",
                    "wfwq_wfw_id": "2",
                    "wfwq_desc": "跳页展开",
                    "wfwq_abled": "1",
                },
                {
                    "wfwq_id": "3",
                    "wfwq_name": "selector",
                    "wfwq_name_ch": "选择器",
                    "wfwq_wfw_id": "2",
                    "wfwq_desc": "选择器",
                    "wfwq_abled": "1",
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "3",
            "wfw_name": "map",
            "wfw_name_ch": "地图",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "8",
                    "wfwq_name": "currentLocation",
                    "wfwq_name_ch": "定位自己当前位置",
                    "wfwq_wfw_id": "3",
                    "wfwq_desc": "定位自己当前位置",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "9",
                    "wfwq_name": "setLocation",
                    "wfwq_name_ch": "设置其他坐标",
                    "wfwq_wfw_id": "3",
                    "wfwq_desc": "设置其他坐标,数量不定",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "4",
            "wfw_name": "contact",
            "wfw_name_ch": "联系人",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "10",
                    "wfwq_name": "scanCard",
                    "wfwq_name_ch": "扫描名片",
                    "wfwq_wfw_id": "4",
                    "wfwq_desc": "扫描名片",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "5",
            "wfw_name": "formula",
            "wfw_name_ch": "公式",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "11",
                    "wfwq_name": "statistics",
                    "wfwq_name_ch": "统计",
                    "wfwq_wfw_id": "5",
                    "wfwq_desc": "统计",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "6",
            "wfw_name": "timePicker",
            "wfw_name_ch": "时间选择器",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "12",
                    "wfwq_name": "ymd",
                    "wfwq_name_ch": "年月日",
                    "wfwq_wfw_id": "6",
                    "wfwq_desc": "选择年月日",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "13",
                    "wfwq_name": "ymdhms",
                    "wfwq_name_ch": "年月日时分秒",
                    "wfwq_wfw_id": "6",
                    "wfwq_desc": "选择年月日时分秒",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "14",
                    "wfwq_name": "hms",
                    "wfwq_name_ch": "时分秒",
                    "wfwq_wfw_id": "6",
                    "wfwq_desc": "选择时分秒",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "7",
            "wfw_name": "areaPicker",
            "wfw_name_ch": "地区选择器",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "15",
                    "wfwq_name": "area",
                    "wfwq_name_ch": "地区",
                    "wfwq_wfw_id": "7",
                    "wfwq_desc": "选择地区",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "8",
            "wfw_name": "fileUpload",
            "wfw_name_ch": "添加附件",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "16",
                    "wfwq_name": "androidFileUp",
                    "wfwq_name_ch": "安卓文件上传",
                    "wfwq_wfw_id": "8",
                    "wfwq_desc": "安卓文件上传,需限制文件大小",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "17",
                    "wfwq_name": "iosFileUp",
                    "wfwq_name_ch": "Ios文件上传",
                    "wfwq_wfw_id": "8",
                    "wfwq_desc": "Ios文件上传,只能选择相册图片",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "9",
            "wfw_name": "inputFiled",
            "wfw_name_ch": "单行文本",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "18",
                    "wfwq_name": "mobileField",
                    "wfwq_name_ch": "电话号码",
                    "wfwq_wfw_id": "9",
                    "wfwq_desc": "电话号码需验证格式,可拨打,发短信",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "19",
                    "wfwq_name": "weixinFiled",
                    "wfwq_name_ch": "微信号",
                    "wfwq_wfw_id": "9",
                    "wfwq_desc": "微信号",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "20",
                    "wfwq_name": "mialFiled",
                    "wfwq_name_ch": "邮箱",
                    "wfwq_wfw_id": "9",
                    "wfwq_desc": "邮箱需验证格式",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "21",
                    "wfwq_name": "freeFiled",
                    "wfwq_name_ch": "自定义文本",
                    "wfwq_wfw_id": "9",
                    "wfwq_desc": "自定义文本",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "10",
            "wfw_name": "textArea",
            "wfw_name_ch": "多行文本",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "23",
                    "wfwq_name": "freeTextArea",
                    "wfwq_name_ch": "自定义多行文本",
                    "wfwq_wfw_id": "10",
                    "wfwq_desc": "自定义多行文本",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "11",
            "wfw_name": "numberFiled",
            "wfw_name_ch": "数值文本",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "24",
                    "wfwq_name": "unit",
                    "wfwq_name_ch": "数值单位",
                    "wfwq_wfw_id": "11",
                    "wfwq_desc": "数值单位",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "25",
                    "wfwq_name": "decimalPoint",
                    "wfwq_name_ch": "小数点位数",
                    "wfwq_wfw_id": "11",
                    "wfwq_desc": "控制键盘，输入时只弹数字键盘",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "12",
            "wfw_name": "radio",
            "wfw_name_ch": "单选",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "26",
                    "wfwq_name": "horizontalRadio",
                    "wfwq_name_ch": "横向单选",
                    "wfwq_wfw_id": "12",
                    "wfwq_desc": "横向单选",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "27",
                    "wfwq_name": "verticalRadio",
                    "wfwq_name_ch": "纵向单选",
                    "wfwq_wfw_id": "12",
                    "wfwq_desc": "纵向单选",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "13",
            "wfw_name": "checkbox",
            "wfw_name_ch": "多选",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "28",
                    "wfwq_name": "horizontalCheckbox",
                    "wfwq_name_ch": "横向多选",
                    "wfwq_wfw_id": "13",
                    "wfwq_desc": "横向多选",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "29",
                    "wfwq_name": "verticalCheckbox",
                    "wfwq_name_ch": "纵向多选",
                    "wfwq_wfw_id": "13",
                    "wfwq_desc": "纵向多选",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "14",
            "wfw_name": "image",
            "wfw_name_ch": "图片",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "30",
                    "wfwq_name": "takePictureOnly",
                    "wfwq_name_ch": "只能拍照",
                    "wfwq_wfw_id": "14",
                    "wfwq_desc": "只能拍照,不能从相册选",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "31",
                    "wfwq_name": "takeOrPick",
                    "wfwq_name_ch": "可拍照,可从相册挑选",
                    "wfwq_wfw_id": "14",
                    "wfwq_desc": "可拍照,可从相册挑选",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "32",
                    "wfwq_name": "timeWatermarking",
                    "wfwq_name_ch": "时间水印",
                    "wfwq_wfw_id": "14",
                    "wfwq_desc": "时间水印可选,考虑按权限分级",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "33",
                    "wfwq_name": "localeWatermarking",
                    "wfwq_name_ch": "地点水印",
                    "wfwq_wfw_id": "14",
                    "wfwq_desc": "地点水印可选,考虑按权限分级",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "34",
                    "wfwq_name": "nameWatermarking",
                    "wfwq_name_ch": "人名水印",
                    "wfwq_wfw_id": "14",
                    "wfwq_desc": "人名水印可选,考虑按权限分级",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "35",
                    "wfwq_name": "compress",
                    "wfwq_name_ch": "压缩比例",
                    "wfwq_wfw_id": "14",
                    "wfwq_desc": "压缩比例,可选原图",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        },
        {
            "wfw_id": "15",
            "wfw_name": "freeTree",
            "wfw_name_ch": "自定义树",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": null,
            "uid": ""
        },
        {
            "wfw_id": "16",
            "wfw_name": "switch",
            "wfw_name_ch": "开关",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": null,
            "uid": ""
        },
        {
            "wfw_id": "17",
            "wfw_name": "button",
            "wfw_name_ch": "按钮",
            "wfw_abled": "1",
            "wfw_icon": "",
            "attribute": [
                {
                    "wfwq_id": "36",
                    "wfwq_name": "confirmButton",
                    "wfwq_name_ch": "确定按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "确定按钮",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "37",
                    "wfwq_name": "cancelButton",
                    "wfwq_name_ch": "取消按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "取消按钮",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "38",
                    "wfwq_name": "submitButton",
                    "wfwq_name_ch": "提交按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "提交按钮",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "39",
                    "wfwq_name": "passButton",
                    "wfwq_name_ch": "审批通过按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "审批通过按钮",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "40",
                    "wfwq_name": "rejectButton",
                    "wfwq_name_ch": "驳回按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "驳回按钮",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "41",
                    "wfwq_name": "nextButton",
                    "wfwq_name_ch": "下一步按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "下一步按钮",
                    "wfwq_abled": "1"
                },
                {
                    "wfwq_id": "42",
                    "wfwq_name": "preButton",
                    "wfwq_name_ch": "上一步按钮",
                    "wfwq_wfw_id": "17",
                    "wfwq_desc": "上一步按钮",
                    "wfwq_abled": "1"
                }
            ],
            "uid": ""
        }
    ],
    "wff_id": "",
    "wff_module": ""
});

