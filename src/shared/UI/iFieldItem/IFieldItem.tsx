import React from "react";

import { FieldItemProps } from "./types";
import IFieldItemReadOnly from "./IFieldItemReadOnly";
import IFormFieldEditable from "./IFieldItemEditable";

const IFormField: React.FC<FieldItemProps> = (props) =>
    props.isReadOnly ? <IFieldItemReadOnly {...props} /> : <IFormFieldEditable {...props} />;

export default IFormField;
