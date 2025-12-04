import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import MyPublishedViewer from './components/MyPublishedViewer';
import { IMyPublishedViewerProps } from './components/IMyPublishedViewerProps';

// ❌ FIX: This interface was missing
export interface IMyPublishedViewerWebPartProps {
  listTitle: string;
  columns: string; // comma separated
  mode: 'myDocuments' | 'published';
}

export default class MyPublishedViewerWebPart
  extends BaseClientSideWebPart<IMyPublishedViewerWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IMyPublishedViewerProps> =
      React.createElement(MyPublishedViewer, {
        context: this.context,
        listTitle: this.properties.listTitle,
        columns: this.properties.columns,
        mode: this.properties.mode
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Configure My Documents / Published Viewer" },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField('listTitle', {
                  label: 'Library Name (e.g., KMArtifacts)'
                }),
                PropertyPaneTextField('columns', {
                  label: 'Columns (comma-separated, e.g., Title,Status,Modified)'
                }),
                PropertyPaneDropdown('mode', {
                  label: 'Select Mode',
                  options: [
                    { key: 'myDocuments', text: 'My Documents' },
                    { key: 'published', text: 'Published' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
