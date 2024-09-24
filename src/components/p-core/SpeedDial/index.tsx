import {
  arrayObjectExposingStateControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';

import { SpeedDial } from 'primereact/speeddial';

export const defStaticProps = {};

export const defModel = [
  {
    label: 'Add',
    icon: 'pi pi-pencil',
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
  },
  {
    label: 'React Website',
    icon: 'pi pi-external-link',
  },
];

let SpeedDialCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    model: arrayObjectExposingStateControl('model', defModel),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return <SpeedDial model={props.model.value} />;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact SpeedDial.</li>
              <li>
                <a href='https://primereact.org/speeddial/' target='_blank'>
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();
export const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('model'),
  NameConfigHidden,
];

export default withExposingConfigs(SpeedDialCompBase, exposingConfigs);
