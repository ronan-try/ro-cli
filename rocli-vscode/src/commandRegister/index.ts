import { ExtensionContext } from 'vscode';

import HelloWorld from './helloWorld';
import Mr from './mr';

export default function factory (context: ExtensionContext) {
  context.subscriptions.push(HelloWorld);
  context.subscriptions.push(Mr);
};

