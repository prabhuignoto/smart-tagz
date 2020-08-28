import { FunctionalComponent } from "vue";

interface Props {
  readOnly: boolean;
  defaultTags: string[];
  width: string;
  sources: string[];
  autosuggest: boolean;
  allowPaste: {
    delimiter: string;
  },
  editable: boolean;
  allowDuplicates: boolean; 
  maxTags: number; 
  inputPlaceholder: string;
  quickDelete: boolean;
  theme: {
    primary: string;
    secondary: string;
    tagTextColor: string;
  }
}

interface SmartTagzComponent extends FunctionalComponent<Props> {}

export const SmartTagz: SmartTagzComponent;