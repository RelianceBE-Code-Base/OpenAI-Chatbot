import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  type IPropertyPaneConfiguration,
  // PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ChatbotWebPartStrings';
import Chatbot from './components/Chatbot';
import { IChatbotProps } from './components/IChatbotProps';

export interface IChatbotWebPartProps {
}

export default class ChatbotWebPart extends BaseClientSideWebPart<IChatbotWebPartProps> {

  

  public render(): void {
    const element: React.ReactElement<IChatbotProps> = React.createElement(
      Chatbot, {httpClient: this.context.httpClient}
      
    );

    ReactDom.render(element, this.domElement);
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // })
              ]
            }
          ]
        }
      ]
    };
  }
}
