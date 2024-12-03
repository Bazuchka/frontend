import React from "react";

export type RenderSelectValueType = (
    value:
        | {
              code?: string;
              name?: string;
              renderValuePrimary?: string;
              renderValueSecondary?: string;
          }
        | string
) => React.ReactElement;
