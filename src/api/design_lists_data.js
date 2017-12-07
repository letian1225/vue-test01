import Mock from 'mockjs';
export default Mock.mock('http://lists.com', {
    "label": "form",
    "allowedTypes": [
      "page"
    ],
    "people": [
      {
        "type": "TEXTBOX",
        "icon": "fa fa-edit",
        "labeltext": "label",
        "id": "",
        "name": "",
        "value": "",
        "maxLength": "",
        "readOnly": "",
        "align": "",
        "disabled": ""
      }
    ]
});