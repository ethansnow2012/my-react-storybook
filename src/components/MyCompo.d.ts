export interface inputSchemaItem$SelectedTag  {
    id: String,
    text: String
}
export interface inputSchemaItem  {
    id:String,
    type: 'text'|'multiselect',
    label: String,
    value: String,
    selected?: inputSchemaItem$SelectedTag []
    selectable?: inputSchemaItem$SelectedTag []
}
export interface initObjType  {
    textAdd: String,
    inputSchema: inputSchemaItem []
}
