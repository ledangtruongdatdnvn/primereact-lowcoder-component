import { createRoot } from 'react-dom/client';
import { CompIDE } from 'lowcoder-sdk';
import { name, version, lowcoder } from './package.json';
import compMap from './src/index';
// import 'primereact/resources/themes/lara-light-cyan/theme.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.scss';
// import './global.css';

function CompDevApp() {
  return <CompIDE compMap={compMap} packageName={name} packageVersion={version} compMeta={lowcoder.comps} />;
}
const container = document.querySelector('#root') as Element | DocumentFragment;
const root = createRoot(container);
root.render(<CompDevApp />);
