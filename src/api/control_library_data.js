import Mock from 'mockjs';
export default Mock.mock('http://api.com', {
  "label": "Control library",
  "allowedTypes": [
    "page"
  ],
  "norm": [
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
  },
  {
    "type": "SELECT",
    "icon": "fa fa-caret-square-o-down",
    "labeltext": "label",
    "id": "",
    "name": "",
    "align": "",
    "disabled": "",
    "option": [
    {
      "value": "",
      "text": ""
    }]
  },
  {
    "type": "RADIO",
    "icon": "fa fa-dot-circle-o",
    "labeltext": "label",
    "disabled": "",
    "group":[
    {
      "id": "",
      "name": "",
      "value": "",
      "text": ""
    }]
  },
  {
    "type": "CHECKBOX",
    "icon": "fa fa-check-square",
    "labeltext": "label",
    "id": "",
    "name": "",
    "align": "",
    "disabled": ""
  }]

});
